import express from "express";
import dotenv from "dotenv";
import { authRouter, usersRouter, rolesRouter } from "./routes/index.js";
import { BASE_ROUTES, getRouteWithVersion } from "./constants/index.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(getRouteWithVersion(BASE_ROUTES.AUTH), authRouter);

app.use(getRouteWithVersion(BASE_ROUTES.USERS), usersRouter);

app.use(getRouteWithVersion(BASE_ROUTES.ROLES), rolesRouter);