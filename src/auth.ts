import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";


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
        if (credentials.email !== "test") {
          throw new Error(" user not found ");
        }
        return {
          name: "test",
          email: "test"
        };
      },
    }),
  ]
});
