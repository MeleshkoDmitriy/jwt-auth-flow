import express from "express";
import dotenv from "dotenv";
import { authRouter, usersRouter, rolesRouter } from "./routes/index.js";
import { BASE_ROUTES, getRouteWithVersion } from "./constants/index.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5555;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Network: http://10.231.32.162:${PORT}`);
});

server.on('error', (error) => {
  console.error('❌ Server error:', error);
});

process.on('SIGINT', () => {
  console.log('🔄 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

const authRoute = getRouteWithVersion(BASE_ROUTES.AUTH);
const usersRoute = getRouteWithVersion(BASE_ROUTES.USERS);
const rolesRoute = getRouteWithVersion(BASE_ROUTES.ROLES);

app.use(authRoute, authRouter);
app.use(usersRoute, usersRouter);
app.use(rolesRoute, rolesRouter);

console.log('✅ Routes configured');