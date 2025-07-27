import { REFRESH_TOKENS } from "../database/index.js";

export const findRefreshToken = async (refreshToken, userId) => {
  return await REFRESH_TOKENS.findOne({ refreshToken, userId });
}