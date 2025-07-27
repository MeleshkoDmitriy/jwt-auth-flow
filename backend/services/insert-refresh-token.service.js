import { REFRESH_TOKENS } from "../database/index.js";

export const insertRefreshToken = async (userId, refreshToken) => {
  return await REFRESH_TOKENS.insert({
    userId,
    refreshToken,
  });
};
