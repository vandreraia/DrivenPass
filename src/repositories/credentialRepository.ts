import { prisma } from "@/config";

export async function insertCredential(title: string, username: string, password: string, url: string, userId: number) {
  return prisma.credential.create({
    data: {
      title,
      username,
      password,
      url,
      userId
    }
  })
}

export async function findCredentialByUserIdAndTitle(userId: number, title: string) {
  return prisma.credential.findFirst({
    where: {
      userId,
      title
    }
  })
}

export async function findCredentialById(id: number) {
  return prisma.credential.findFirst({
    where: {
      id
    }
  })
}

export async function findCredential(userId: number) {
  return prisma.credential.findMany({
    where: {
      userId
    }
  })
}

export async function removeCredential(id: number) {
  return prisma.credential.delete({
    where: {
      id
    }
  })
}