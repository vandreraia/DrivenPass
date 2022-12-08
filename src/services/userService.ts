import { insertUser } from "@/repositories/userRepository";
import bcrypt from "bcrypt";

export async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  await insertUser(email, hashedPassword);
}