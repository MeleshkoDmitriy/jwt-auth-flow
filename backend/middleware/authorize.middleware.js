import { HTTP_STATUS } from "../constants/index.js";
import Datastore from "nedb-promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USERS = Datastore.create(path.join(__dirname, "../database/USERS.db"));

export const authorize = (roles = []) => {
  return async (req, res, next) => {
    try {
      const user = await USERS.findOne({ _id: req.user.id });

      if (!user || !roles.includes(user.role)) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "Access denied!" });
      }

      next();
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  };
};
