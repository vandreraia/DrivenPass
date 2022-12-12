import { findWifi, findWifiById, insertWifi } from "@/services/wifiService";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getWifi(req: Request, res: Response) {
  const { authorization } = req.headers;
  const { id } = req.query;

  try {
    const wifi = id ? await findWifiById(Number(id), authorization) : await findWifi(authorization);

    return res.status(httpStatus.OK).send(wifi)
  } catch (error) {
    if (error === "FORBIDDEN") return res.sendStatus(httpStatus.FORBIDDEN);
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