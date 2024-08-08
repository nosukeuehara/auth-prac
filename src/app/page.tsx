"use server";
import { auth, signOut, signIn } from "@/auth";

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
            await signIn();
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
