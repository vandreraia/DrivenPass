import { Router } from "express";

import { createUserSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { postUser } from "@/controllers/userController";

const userRouter = Router();

userRouter.post("/", validateBody(createUserSchema), postUser);

export { userRouter };