import { createCredential } from "@/controllers/credentialControler";
import { Router } from "express";

const credentialRouter = Router();

credentialRouter.post("/", createCredential)
  .get("/", )

export { credentialRouter };