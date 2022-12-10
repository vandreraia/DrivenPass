import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function getUserIdByToken(authorization: string) {
  if (!authorization) {
    throw "UNPROCESSABLE_ENTITY"
  }

  const token = authorization?.replace("Bearer ", "");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded;
};