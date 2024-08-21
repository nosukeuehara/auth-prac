// import { prisma } from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { User } from "lucide-react";

export async function POST(request: Request, response: Response) {
  const { email, name, password } = await request.json();
  console.log("actions", email, name, password);
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  const prisma = new PrismaClient();
  const emailVerifiedDate = new Date();
  const isoDate = emailVerifiedDate.toISOString();
  try {
    prisma.$connect();
    const user = await prisma.user.create({
      data: {
        name,
        email,
        emailVerified: isoDate,
        password: hash,
      },
    });
    return NextResponse.json({ user });
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("Email already exists");
    } else {
      console.log(error);
      throw new Error("An unexpected error occurred");
    }
  } finally {
    prisma?.$disconnect();
  }
}
