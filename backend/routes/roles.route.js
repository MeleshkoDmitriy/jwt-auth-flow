import express from "express";
import { ensureAuthenticated, authorize } from "../middleware/index.js";
import { ROLE, HTTP_STATUS } from "../constants/index.js";
import { sendSuccessResponse } from "../helpers/index.js";
import { API_ROUTES } from "../constants/index.js";

const router = express.Router();

router.get(
  API_ROUTES.ROLES.ADMIN,
  ensureAuthenticated,
  authorize([ROLE.admin]),
  async (req, res) => {
    sendSuccessResponse(
      res,
      HTTP_STATUS.OK,
      "Success! Only admins can access this route!"
    );
  }
);

router.get(
  API_ROUTES.ROLES.MODERATOR,
  ensureAuthenticated,
  authorize([ROLE.moderator, ROLE.admin]),
  async (req, res) => {
    sendSuccessResponse(
      res,
      HTTP_STATUS.OK,
      "Success! Only moderators and admins can access this route!"
    );
  }
);

export { router as rolesRouter };
