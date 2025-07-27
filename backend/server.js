import express from "express";
import dotenv from "dotenv";
import { authorize, ensureAuthenticated } from "./middleware/index.js";
import { ROLE, HTTP_STATUS } from "./constants/index.js";
import { USERS } from "./database/index.js";
import { authRouter } from "./routes/auth.route.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Hello World!").status(HTTP_STATUS.OK);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/v1/auth", authRouter);

app.get("/api/v1/users/current", ensureAuthenticated, async (req, res) => {
  try {
    const user = await USERS.findOne({ _id: req.user.id })

    return res.status(HTTP_STATUS.OK).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
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