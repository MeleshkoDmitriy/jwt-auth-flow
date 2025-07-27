import bcrypt from "bcrypt";
import { BCRYPT_CONFIG } from "../config/index.js";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, BCRYPT_CONFIG.SALT);
};
