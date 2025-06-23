import express from "express";
import dotenv from "dotenv";
import { HTTP_STATUS } from "./config/status.ts";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!!!").status(HTTP_STATUS.OK);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})