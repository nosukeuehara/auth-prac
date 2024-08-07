import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Github,
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        // データベースからデータを取得して比較するロジックが必要
        prisma.$connect()
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })
        prisma.$disconnect()
        if (user === null) {
          throw new Error(" user not found ");
        }
        return {
          name: user.name,
          email: user.email
        };
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // 認証後にリダイレクトしたいURLを指定します
      return baseUrl + '/';
    },
  },
});
