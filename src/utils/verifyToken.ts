import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

type tokenData = {
  userId: number
}

export default function getUserIdByToken(authorization: string) {
  if (!authorization) {
    throw "UNPROCESSABLE_ENTITY";
  }

  const token = authorization?.replace("Bearer ", "");

  jwt.verify(token, process.env.SECRET, (error) => {
    if (error) throw "UNPROCESSABLE_ENTITY";
  })
  const decoded = jwt.decode(token) as tokenData;
  return decoded.userId;
};