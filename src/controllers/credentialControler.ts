import { findCredential, findCredentialById, postCredential, removeCredential } from "@/services/credentialService";
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

export async function getCredential(req: Request, res: Response) {
  const { authorization } = req.headers;
  const { id } = req.query;

  try {
    const credential = id ? await findCredentialById(Number(id), authorization) : await findCredential(authorization);

    return res.status(httpStatus.OK).send(credential)
  } catch (error) {
    if (error === "FORBIDDEN") return res.sendStatus(httpStatus.FORBIDDEN);
    if (error === "NOT_FOUND") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function deleteCredential(req: Request, res: Response) {
  const { authorization } = req.headers;

  const { id } = req.query;

  try {
    await removeCredential(Number(id), authorization);
    return res.sendStatus(httpStatus.OK)
  } catch (error) {
    if (error === "CONFLICT") return res.sendStatus(httpStatus.CONFLICT);
    if (error === "NOT_FOUND") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}