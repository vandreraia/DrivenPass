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

export async function findWifiByUserId(userId: number) {
  return prisma.network.findMany({
    where: {
      userId
    }
  })
}

export async function findWifiById(id: number) {
  return prisma.network.findFirst({
    where: {
      id
    }
  })
}

export async function deleteWifi(id: number) {
  return prisma.network.delete({
    where:{
      id
    }
  })
}