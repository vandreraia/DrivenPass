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

export async function findCredentialByUserIdAndTitle(userId:number, title: string) {
  return prisma.credential.findFirst({
    where: {
      userId,
      title
    }
  })
}