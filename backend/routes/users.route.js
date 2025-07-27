import express from "express";
import { ensureAuthenticated } from "../middleware/index.js";
import { getCurrentUser } from "../controllers/index.js";
import { API_ROUTES } from "../constants/index.js";

const router = express.Router();

router.get(API_ROUTES.USERS.CURRENT, ensureAuthenticated, getCurrentUser);

export { router as usersRouter };
