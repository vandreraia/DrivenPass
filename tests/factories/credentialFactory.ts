import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";

export async function createCredential(userId: number) {
  const cryptr = new Cryptr(process.env.SECRET);
  return prisma.credential.create({
    data: {
      userId: userId,
      title: faker.internet.domainWord(),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: cryptr.encrypt(faker.internet.password()),
    }
  })
}