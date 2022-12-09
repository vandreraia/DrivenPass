import httpStatus from "http-status";
import { Request, Response } from "express";
import { createUser } from "@/services/userService";

export async function postUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    await createUser(email, password);

    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    console.log(error.message)
    if (error === "Unprocessable") return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}