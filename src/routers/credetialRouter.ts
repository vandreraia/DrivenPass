import { createCredential, getCredential } from "@/controllers/credentialControler";
import { Router } from "express";

const credentialRouter = Router();

credentialRouter.post("/", createCredential)
  .get("/", getCredential)

export { credentialRouter };