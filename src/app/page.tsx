"use server";
import { auth, signOut, signIn, providerMap } from "@/auth";
import { redirect } from "next/navigation";

export type User = {
  email: string;
  name: string;
};

export default async function Home() {
  const session = await auth();
  if (session === null)
    return (
      <div>
        <form
          action={async () => {
            "use server";
            redirect(
              "http://localhost:3000/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"
            );
          }}
        >
          <button>Sign In</button>
        </form>
      </div>
    );
  return (
    <div>
      <h1>{`Hello ${session.user?.name}`}</h1>
      <div>
        <p>your session data</p>
        <div>{session.user?.email}</div>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>Sign out</button>
      </form>
    </div>
  );
}
