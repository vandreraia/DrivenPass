import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";

export async function createWifi(userId: number) {
  const cryptr = new Cryptr(process.env.SECRET);
  return prisma.network.create({
    data: {
      title: faker.internet.domainWord(),
      network: faker.internet.domainName(),
      password: cryptr.encrypt(faker.internet.password()),
      userId
    }
  })
}