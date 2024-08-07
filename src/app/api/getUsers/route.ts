import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  prisma?.$connect();
  const allUser = await prisma?.user.findMany();
  prisma?.$disconnect();
  return NextResponse.json({ allUser });
}
