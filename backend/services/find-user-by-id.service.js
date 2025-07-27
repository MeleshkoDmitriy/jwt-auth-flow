import { USERS } from "../database/index.js";

export const findUserById = async (_id) => {
  return await USERS.findOne({ _id });
}