import { HTTP_STATUS } from "../constants/index.js";
import { sendErrorResponse } from "../helpers/index.js";
import { findUserById } from "../services/index.js";

export const authorize = (roles = []) => {
  return async (req, res, next) => {
    try {
      const user = await findUserById(req.user.id);

      if (!user || !roles.includes(user.role)) {
        sendErrorResponse(res, HTTP_STATUS.FORBIDDEN, "Access denied!", {
          hasAccess: false,
        });
        return;
      }

      next();
    } catch (error) {
      sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message, {
        hasAccess: false,
      });
      return;
    }
  };
};
