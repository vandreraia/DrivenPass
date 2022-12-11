import { findUser, insertUser } from "@/repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(email: string, password: string) {
  const user = await findUser(email);
  if (user) throw "UNPROCESSABLE_ENTITY";
  const hashedPassword = await bcrypt.hash(password, 10);

  await insertUser(email, hashedPassword);
}

export async function checkUser(email: string, password: string) {
  const user = await findUser(email);
  if (!user) throw "UNPROCESSABLE_ENTITY";

  const comparePassword = await bcrypt.compare(password, user.password)
  if (!comparePassword) throw "UNAUTHORIZED";

  return user;
}

export async function generateToken(userId: string) {
  console.log(userId)
  const token = jwt.sign(userId, process.env.SECRET)

  return token;
}