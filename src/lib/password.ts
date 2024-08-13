"use server"
import { User } from "@/app/lib/actions";
import { prisma } from "@/prisma";
import bcrypt from "bcrypt";

export async function getUserFormDb(email: string, password: string): Promise<User | null> {
  prisma.$connect();
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  prisma.$disconnect();

  if (user === null) {
    return null
  }

  const auth = await bcrypt.compare(password, user.password)

  if (!auth) {
    return null
  }

  return {
    name: user.name,
    email: user.email,
  };
}