import { Router } from "express";

import { createUserSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { postUser, signIn } from "@/controllers/userController";

const userRouter = Router();

userRouter.post("/", validateBody(createUserSchema), postUser)
  .get("/", signIn)

export { userRouter };