import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;  

export const decodeAccessToken = (accessToken) => {
  return jwt.verify(accessToken, accessTokenSecret);
}