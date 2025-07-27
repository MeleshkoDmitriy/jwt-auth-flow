import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { BCRYPT_CONFIG, JWT_CONFIG } from "./config/index.js";
import jwt from "jsonwebtoken";
import { authorize, ensureAuthenticated } from "./middleware/index.js";
import { ROLE, HTTP_STATUS } from "./constants/index.js";
import { USERS, REFRESH_TOKENS, INVALID_TOKENS } from "./database/index.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

app.get("/", (req, res) => {
  res.send("Hello World!!!").status(HTTP_STATUS.OK);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/api/v1/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
        .send({ message: "All fields is required" });
    }

    if (!Object.values(ROLE).includes(role)) {
      return res
        .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
        .json({ message: "Invalid role!" });
    }

    if (await USERS.findOne({ email })) {
      return res
        .status(HTTP_STATUS.CONFLICT)
        .json({ message: "Users with this email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_CONFIG.SALT);

    const newUser = await USERS.insert({
      name,
      email,
      password: hashedPassword,
      role: role ?? ROLE.member,
    });

    return res
      .status(HTTP_STATUS.CREATED)
      .json({ message: "New user created successfully!", id: newUser._id });
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

app.post("/api/v1/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
        .json({ message: "All fields are required!" });
    }

    const user = await USERS.findOne({ email });

    if (!user) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Email or password is invalid!" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Email or password is invalid!" });
    }

    const accessToken = jwt.sign({ userId: user._id }, accessTokenSecret, {
      subject: JWT_CONFIG.subject.access_token,
      expiresIn: JWT_CONFIG.expiresIn.access_token,
    });

    const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, {
      subject: JWT_CONFIG.subject.refresh_token,
      expiresIn: JWT_CONFIG.expiresIn.refresh_token,
    })

    await REFRESH_TOKENS.insert({
      userId: user._id,
      refreshToken,
    })

    return res.status(HTTP_STATUS.OK).json({
      id: user._id,
      name: user.name,
      email: user.email,
      accessToken,
      refreshToken,
    });

  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

app.post("/api/v1/auth/refresh-token", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Refresh token is not provided!" });
    }

    const decodedRefreshToken = jwt.verify(refreshToken, refreshTokenSecret);

    const userRefreshToken = await REFRESH_TOKENS.findOne({ refreshToken, userId: decodedRefreshToken.userId });

    if (!userRefreshToken) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Refresh token is invalid or expired!" });
    }

    await REFRESH_TOKENS.remove({ _id: userRefreshToken._id });
    await REFRESH_TOKENS.compactDatafile();

    const accessToken = jwt.sign({ userId: decodedRefreshToken.userId }, accessTokenSecret, {
      subject: JWT_CONFIG.subject.access_token,
      expiresIn: JWT_CONFIG.expiresIn.access_token,
    })

    const newRefreshToken = jwt.sign({ userId: decodedRefreshToken.userId }, refreshTokenSecret, {
      subject: JWT_CONFIG.subject.refresh_token,
      expiresIn: JWT_CONFIG.expiresIn.refresh_token,
    })

    await REFRESH_TOKENS.insert({
      userId: decodedRefreshToken.userId,
      refreshToken: newRefreshToken,
    })

    return res.status(HTTP_STATUS.OK).json({
      accessToken,
      refreshToken: newRefreshToken,
    })

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Refresh token is invalid or expired!" });
    }

    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
})

app.get("/api/v1/auth/logout", ensureAuthenticated, async (req, res) => {
  try {
    await REFRESH_TOKENS.removeMany({ userId: req.user.id });
    await REFRESH_TOKENS.compactDatafile();

    await INVALID_TOKENS.insert({
      accessToken: req.accessToken.value,
      expiresIn: req.accessToken.expiresIn,
      userId: req.user.id,
    })

    return res.status(HTTP_STATUS.NO_CONTENT).send();
  } catch(error) {
    res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ message: error.message });
  }
})

app.get("/api/v1/users/current", ensureAuthenticated, async (req, res) => {
  try {
    const user = await USERS.findOne({ _id: req.user.id })

    return res.status(HTTP_STATUS.OK).json({
      id: user._id,
      name: user.name,
      email: user.email
    })
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

app.get("/api/v1/admin", ensureAuthenticated, authorize([ROLE.admin]), async(req, res) => {
  return res.status(HTTP_STATUS.OK).json({ message: "Only admins can access this route!" });
})

app.get("/api/v1/moderator", ensureAuthenticated, authorize([ROLE.moderator, ROLE.admin]), async(req, res) => {
  return res.status(HTTP_STATUS.OK).json({ message: "Only moderators and admins can access this route!" });
})