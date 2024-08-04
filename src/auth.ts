import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { pages } from "next/dist/build/templates/app-page";

type User = {
  id: number;
  email: string;
  name: string | null;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        name: { label: "name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // userをデータベースから取得するためのロジック書く
      },
    }),
  ],
});
