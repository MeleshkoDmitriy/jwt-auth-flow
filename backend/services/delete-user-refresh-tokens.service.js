import { REFRESH_TOKENS, INVALID_TOKENS } from "../database/index.js";

export const deleteUserRefreshTokens = async (userId, accessToken, expiresIn) => {
  await REFRESH_TOKENS.removeMany({ userId });
  await REFRESH_TOKENS.compactDatafile();

  await INVALID_TOKENS.insert({
    accessToken,
    expiresIn,
    userId,
  })
}