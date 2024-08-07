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
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "failed" }, { status: 400 });
  } finally {
    prisma?.$disconnect();
  }
}
