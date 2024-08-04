import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

type User = {
  id: number;
  email: string;
  name: string | null;
};

export const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        name: { label: "name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // userをデータベースから取得するためのロジック書く
        if (credentials.name !== "nosuke") {
          throw new Error(" user not found ");
        }
        return {
          name: "nosuke",
        };
      },
    }),
  ],
});
