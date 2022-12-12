import getUserIdByToken from "@/utils/verifyToken";
import * as wifiRepository from "@/repositories/wifiRepository";
import Cryptr from "cryptr";
import { Network } from "@prisma/client";

export async function findWifiById(id: number, authorization: string) {
  const userId = Number(getUserIdByToken(authorization));

  const wifi = await wifiRepository.findWifiById(id);
  if (!wifi) throw "NOT_FOUND";
  if (wifi.userId !== userId) throw "FORBIDDEN";

  decrypt(wifi);

  return wifi;
}

export async function findWifi(authorization: string) {
  const userId = Number(getUserIdByToken(authorization));

  const wifi = await wifiRepository.findWifiByUserId(userId);
  if (!wifi) throw "NOT_FOUND";

  const decryptedWifi = wifi.map(wifi => decrypt(wifi));

  return decryptedWifi;
}

export async function insertWifi(title: string, name: string, password: string, authorization: string) {
  const userId = Number(getUserIdByToken(authorization));

  const wifi = await wifiRepository.findWifiByUserIdAndTitle(userId, title);
  if (wifi) throw "CONFLICT";

  const cryptr = new Cryptr(process.env.SECRET);
  const encryptedString = cryptr.encrypt(password);

  await wifiRepository.insertWifi(title, name, encryptedString, userId);
}

function decrypt(wifi: Network) {
  const cryptr = new Cryptr(process.env.SECRET)
  const decryptedPassword = cryptr.decrypt(wifi.password);
  wifi.password = decryptedPassword;

  return wifi;
}