import { prisma } from "@/config";

export async function insertUser(email: string, password:string) {
  return prisma.user.create({
    data: {
      email,
      password
    }
  });
}