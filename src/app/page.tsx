"use client";

import Login from "@/components/login";
import { signIn, signOut, useSession } from "next-auth/react";

export type User = {
  email: string;
  name: string;
};

export default function Home() {
  const sesstion = useSession();
  console.log(sesstion.data?.user);
  if (sesstion.data?.user?.name) {
    return (
      <div>
        <h2>{sesstion.data.user.name}</h2>
        <button onClick={() => signOut()}>sign out</button>
      </div>
    );
  }
  return (
    <div className=" flex justify-center items-center align-middle h-14">
      <form>
        <Login />
      </form>
      <button onClick={() => signIn()}>sign in</button>
    </div>
  );
}
