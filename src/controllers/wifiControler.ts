import { insertWifi } from "@/services/wifiService";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getWifi(req: Request, res: Response) {
  const { authorization } = req.headers;

  try {

    return res.sendStatus(httpStatus.OK)
  } catch (error) {
    if (error === "CONFLICT") return res.sendStatus(httpStatus.CONFLICT);
    if (error === "NOT_FOUND") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }
}

export async function postWifi(req: Request, res: Response) {
  const { name, password, title } = req.body;
  const { authorization } = req.headers;

  try {
    await insertWifi(title,name,password, authorization);
    
    return res.sendStatus(httpStatus.CREATED)
  } catch (error) {
    console.log(error.message)
    if (error === "CONFLICT") return res.sendStatus(httpStatus.CONFLICT);
    return res.sendStatus(httpStatus.BAD_REQUEST)
  }
}