import { prisma } from "@/config";

export async function findUser(email:string) {
  return prisma.user.findFirst({
    where: {
      email
    }
  })
}
export async function insertUser(email: string, password:string) {
  return prisma.user.create({
    data: {
      email,
      password
    }
  });
}