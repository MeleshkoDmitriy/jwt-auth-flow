import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config/index.js";
import dotenv from "dotenv";

dotenv.config();
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export const signRefreshToken = (userId) => {
  return jwt.sign({ userId }, refreshTokenSecret, {
    subject: JWT_CONFIG.subject.refresh_token,
    expiresIn: JWT_CONFIG.expiresIn.refresh_token,
  });
};
