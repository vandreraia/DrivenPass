import * as credentialRepository from "@/repositories/credentialRepository";
import getUserIdByToken from "@/utils/verifyToken";
import { Credential } from "@prisma/client";
import Cryptr from "cryptr";

export async function postCredential(title: string, username: string, password: string, url: string, authorization: string) {
  const userId = Number(getUserIdByToken(authorization));

  const credential = await credentialRepository.findCredentialByUserIdAndTitle(userId, title);

  if (credential) throw "CONFLICT";

  const cryptr = new Cryptr(process.env.SECRET);
  const encryptedString = cryptr.encrypt(password);
  await credentialRepository.insertCredential(url, username, encryptedString, title, userId);
}

export async function findCredentialById(id: number, authorization: string) {
  const userId = Number(getUserIdByToken(authorization));
  const credential = await credentialRepository.findCredentialById(id);
  if (!credential) throw "NOT_FOUND";
  if (userId !== credential.userId) throw "CONFLICT";

  decrypt(credential);

  return credential;
}

export async function findCredential(authorization: string) {
  const userId = Number(getUserIdByToken(authorization));
  const credentials = await credentialRepository.findCredential(userId);
  if (!credentials) throw "NOT_FOUND";

  const decryptedCredential = credentials.map(credential => decrypt(credential));

  return decryptedCredential;
}

function decrypt(credential: Credential) {
  const cryptr = new Cryptr(process.env.SECRET)
  const decryptedPassword = cryptr.decrypt(credential.password);
  credential.password = decryptedPassword;

  return credential;
}

export async function removeCredential(id: number, authorization: string) {
  const userId = Number(getUserIdByToken(authorization));
  const credential = await credentialRepository.findCredentialById(id);
  if (!credential) throw "NOT_FOUND";
  if (userId !== credential.userId) throw "CONFLICT";

  await credentialRepository.removeCredential(id);
}