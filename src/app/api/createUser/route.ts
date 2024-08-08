import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  try {
    prisma?.$connect();
    const { email, name, password } = await request.json();
    const allUser = await prisma?.user.create({
      data: {
        email,
        name,
        password
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
