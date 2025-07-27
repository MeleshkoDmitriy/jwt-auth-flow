import express from "express";
import { register, login, refreshToken, logout } from "../controllers/index.js";
import { ensureAuthenticated } from "../middleware/index.js";
import { API_ROUTES } from "../constants/index.js";

const router = express.Router();

router.post(API_ROUTES.AUTH.REGISTER, register);

router.post(API_ROUTES.AUTH.LOGIN, login);

router.post(API_ROUTES.AUTH.REFRESH_TOKEN, refreshToken);

router.get(API_ROUTES.AUTH.LOGOUT, ensureAuthenticated, logout);

export { router as authRouter };
