import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";
import { userRouter } from "./routers/userRouter";
import { handleApplicationErrors } from "@/middlewares";
import { loadEnv, connectDb, disconnectDB } from "@/config";
import { credentialRouter } from "./routers/credetialRouter";
import { wifiRouter } from "./routers/wifiRouter";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/user", userRouter)
  .use("/credential", credentialRouter)
  .use("/wifi", wifiRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
