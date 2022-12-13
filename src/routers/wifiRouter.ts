import { getWifi, postWifi, removeWifi } from "@/controllers/wifiControler";
import { Router } from "express";

const wifiRouter = Router();

wifiRouter.get("/", getWifi)
  .post("/", postWifi)
  .delete("/", removeWifi)

export { wifiRouter }