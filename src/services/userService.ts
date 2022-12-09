import { findUser, insertUser } from "@/repositories/userRepository";
import bcrypt from "bcrypt";

export async function createUser(email: string, password: string) {
  const user = await findUser(email);
  if (user) throw "Unprocessable"
  const hashedPassword = await bcrypt.hash(password, 10);

  await insertUser(email, hashedPassword);
}