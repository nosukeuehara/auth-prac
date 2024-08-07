"use client";

import Login from "@/components/login";
import { signOut, useSession } from "next-auth/react";
import { authenticate, signup } from "./lib/actions";
import { useRouter } from "next/navigation";

export type User = {
  email: string;
  name: string;
};

export default function Home() {
  const { data: session, update, status } = useSession();
  const router = useRouter();
  if (!!session) {
    console.log(session);
    return (
      <div>
        <h2>{session?.user?.name}</h2>
        <button onClick={() => signOut()}>sign out</button>
      </div>
    );
  }
  return (
    <div className=" flex justify-center items-center align-middle h-14">
      <form
        action={async (formData) => {
          const rawFormData = {
            email: formData.get("email")! as string,
            name: formData.get("name")! as string,
            password: formData.get("password")! as string,
          };
          await authenticate(rawFormData);
        }}
      >
        <Login />
      </form>
      <form
        action={async (formData) => {
          const rawFormData = {
            email: formData.get("email")! as string,
            name: formData.get("name")! as string,
            password: formData.get("password")! as string,
          };
          await signup(rawFormData);
          router.refresh();
        }}
      >
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          name
          <input name="name" type="text" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
