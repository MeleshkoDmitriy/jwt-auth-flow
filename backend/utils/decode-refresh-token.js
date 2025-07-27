import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export const decodeRefreshToken = (refreshToken) => {
  try {
    return jwt.verify(refreshToken, refreshTokenSecret);
  } catch (error) {
    throw new Error("Invalid refresh token!");
  }
}