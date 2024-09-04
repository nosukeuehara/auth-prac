import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { Provider } from "next-auth/providers";
import "next-auth/jwt";
import { getUserFormDb } from "./lib/password";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { ExtendedUser } from "./next-auth";
import { UserRole } from "@prisma/client";

const providers: Provider[] = [
  Google,
  Github,
  Credentials({
    credentials: {
      email: { label: "email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      const email = credentials.email as string;
      const password = credentials.password as string;
      if (!credentials?.email || !credentials.password) {
        return null;
      }
      const user = await getUserFormDb(email, password);
      console.log(user)
      if (user === null) {
        throw new Error(" user not found ");
      }
      return user;
    },
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // 認証後にリダイレクトしたいURLを指定
      return baseUrl + "/";
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const id = token.sub;
      console.log("ここここｋれｋろえｋろえｋろえこｒ", token);
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
    error: "/error",
  },
});

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
