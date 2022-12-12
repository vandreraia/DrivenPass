import { prisma } from "@/config";

export async function insertWifi(title: string, network: string, password: string, userId: number) {
  return prisma.network.create({
    data: {
      title,
      network,
      password,
      userId
    }
  })
}

export async function findWifiByUserIdAndTitle(userId: number, title: string) {
  return prisma.network.findFirst({
    where: {
      userId,
      title
    }
  })
}

export async function findWifi() {
  return prisma.network
}