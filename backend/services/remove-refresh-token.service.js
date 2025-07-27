import { REFRESH_TOKENS } from "../database/index.js";

export const removeRefreshToken = async (_id) => {
  await REFRESH_TOKENS.remove({ _id });
  await REFRESH_TOKENS.compactDatafile();
}