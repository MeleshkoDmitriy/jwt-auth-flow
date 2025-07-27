import { USERS } from "../database/index.js";
import { ROLE } from "../constants/index.js";
import { hashPassword } from "../utils/index.js";

export const createUser = async (name, email, password, role) => {
  const hashedPassword = await hashPassword(password);

  return await USERS.insert({
    name,
    email,
    password: hashedPassword,
    role: role ?? ROLE.member,
  });
};
