import * as jwt from "jsonwebtoken";
import { User } from "@prisma/client";

import { createUser } from "./factories";
import { prisma } from "@/config";

export async function cleanDb() {
  await prisma.network.deleteMany({});
  await prisma.credential.deleteMany({});
  await prisma.user.deleteMany({});
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  return token;
}
