import { prisma } from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request: Request, response: Response) {
  const { email, name, password } = await request.json();
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  try {
    prisma?.$connect();
    const allUser = await prisma?.user.create({
      data: {
        email,
        name,
        password: hash
      },
    });
    return NextResponse.json(
      { message: "success", data: allUser },
      { status: 202 }
    );
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error('Email already exists')
    } else {
      throw new Error('An unexpected error occurred')
    }
  } finally {
    prisma?.$disconnect();
  }
}
