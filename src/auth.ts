import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { Provider } from "next-auth/providers";
import "next-auth/jwt";
import { getUserFormDb } from "./lib/password";

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
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
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
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
