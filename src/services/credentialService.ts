import { findCredentialByUserIdAndTitle, insertCredential } from "@/repositories/credentialRepository";
import getUserIdByToken from "@/utils/verifyToken";
import Cryptr from "cryptr";

export async function postCredential(title: string, username: string, password: string, url: string, authorization: string) {
  const userId = Number(getUserIdByToken(authorization));

  const credential = await findCredentialByUserIdAndTitle(userId, title);

  if (credential) throw "CONFLICT";

  const cryptr = new Cryptr(process.env.JWT_SECRET);
  const encryptedString = cryptr.encrypt(password);
  await insertCredential(url, username, encryptedString, title, userId);
}