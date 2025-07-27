import { USERS } from "../database/index.js";

export const findUserByEmail = async (email) => {
  return await USERS.findOne({ email });
};