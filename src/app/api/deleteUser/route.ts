import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, response: Response) {
  try {
    prisma?.$connect();
    const targetUser = await request.json();
    const newUsers = await prisma?.user.delete({
      where: {
        ...targetUser,
      },
    });
    return NextResponse.json(
      { data: newUsers, message: "Delete User" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    prisma?.$disconnect();
  }
}
