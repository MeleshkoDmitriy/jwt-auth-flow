import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config/index.js";
import dotenv from "dotenv";

dotenv.config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

export const signAccessToken = (userId) => {
  return jwt.sign({ userId }, accessTokenSecret, {
    subject: JWT_CONFIG.subject.access_token,
    expiresIn: JWT_CONFIG.expiresIn.access_token,
  });
};
