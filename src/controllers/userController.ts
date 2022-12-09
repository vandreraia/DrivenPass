import httpStatus from "http-status";
import { Request, Response } from "express";
import { checkUser, createUser, generateToken } from "@/services/userService";

export async function postUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    await createUser(email, password);

    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    if (error === "Unprocessable") return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await checkUser(email, password);
    const token = await generateToken((user.id).toString());
    const data = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    return res.status(httpStatus.OK).send(data);
  } catch (error) {
    if (error === "Unprocessable") return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
    if (error === "Unauthorized") return res.sendStatus(httpStatus.UNAUTHORIZED)
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}