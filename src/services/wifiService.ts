import getUserIdByToken from "@/utils/verifyToken";
import * as wifiRepository from "@/repositories/wifiRepository";
import Cryptr from "cryptr";

export async function findWifi() {
  
}

export async function insertWifi(title: string, name: string, password: string, authorization: string) {
  const userId = Number(getUserIdByToken(authorization));

  const wifi = await wifiRepository.findWifiByUserIdAndTitle(userId, title);
  if (wifi) throw "CONFLICT";

  const cryptr = new Cryptr(process.env.SECRET);
  const encryptedString = cryptr.encrypt(password);

  await wifiRepository.insertWifi(title, name, encryptedString, userId);
}