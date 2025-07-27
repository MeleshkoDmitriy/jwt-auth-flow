import express from "express";
import { register, login, refreshToken, logout } from "../controllers/index.js";
import { ensureAuthenticated } from "../middleware/index.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refresh-token", refreshToken);

router.get("/logout", ensureAuthenticated, logout)

export { router as authRouter };
