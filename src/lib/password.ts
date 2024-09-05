"use server"
import { User } from "@/app/lib/actions";
import { prisma } from "@/prisma";
// import bcrypt from "bcrypt";
const bcrypt = require("bcrypt");
export async function getUserFormDb(email: string, password: string): Promise<User | null> {
  prisma.$connect();
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  console.log('emailこれ', user)
  prisma.$disconnect();

  if (user === null) {
    return null
  }
  const hash = user.password
  // ハッシュとパスワードの検証が効かない：修正！する
  const auth = bcrypt.compareSync(password, hash)
  console.log('検証結果', auth)
  if (!auth) {
    return null
  }

  return {
    name: user.name,
    email: user.email,


  };
}