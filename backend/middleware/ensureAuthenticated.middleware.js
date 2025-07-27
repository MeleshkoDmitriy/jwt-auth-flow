import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CODE, HTTP_STATUS } from "../constants/index.js";
import { INVALID_TOKENS } from "../database/index.js";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const ensureAuthenticated = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: "Access token not found!" });
  }

  if (await INVALID_TOKENS.findOne({ accessToken })) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: "Access token is invalid!",
      code: CODE.ACCESS_TOKEN_INVALID,
    });
  }

  try {
    const decodedAccessToken = jwt.verify(accessToken, accessTokenSecret);

    req.accessToken = { value: accessToken, expiresIn: decodedAccessToken.exp };
    req.user = {
      id: decodedAccessToken.userId,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: "Access token is expired!",
        code: CODE.ACCESS_TOKEN_EXPIRED,
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: "Access token is invalid!",
        code: CODE.ACCESS_TOKEN_INVALID,
      });
    } else {
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
};
