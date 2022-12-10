import { postCredential } from "@/services/credentialService";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createCredential(req: Request, res: Response) {
  const { authorization } = req.headers;
  const { url, username, password, title } = req.body;

  try {
    await postCredential(url, username, password, title, authorization);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    if (error === "CONFLICT") return res.sendStatus(httpStatus.CONFLICT);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}