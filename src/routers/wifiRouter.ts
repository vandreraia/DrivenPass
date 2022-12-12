import { getWifi, postWifi } from "@/controllers/wifiControler";
import { Router } from "express";

const wifiRouter = Router();

wifiRouter.get("/", getWifi)
  .post("/", postWifi)

export { wifiRouter }