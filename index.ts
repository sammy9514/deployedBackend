import dotEnv from "dotenv";
import cors from "cors";
import express, { Application } from "express";
import { mainConnection } from "./utils/dbConfig";
import { mainApp } from "./mainApp";
import validator from "./utils/validator";
import { isSchema } from "joi";
dotEnv.config();
const port = parseInt(process.env.PORT!);
const app: Application = express();

app.use(cors());
app.use(express.json());
mainApp(app);

const server = app.listen(port, () => {
  mainConnection();
  console.clear();
  console.log("server is connected to port", port);
});

process.on("uncaughtException", (error: Error) => {
  console.log("uncaughtException", error);
  process.exit(1);
});
process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection", reason);
  server.close(() => {
    process.exit(1);
  });
});
