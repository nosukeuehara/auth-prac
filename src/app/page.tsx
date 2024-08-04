"use client"

import Login from "@/components/login";
import { signIn } from "next-auth/react";

export type User = {
  email: string,
  name: string
}

export default function Home() {
  return (
    <div className=" flex justify-center items-center align-middle h-14">
      <form>
        <Login />
      </form>
      <button onClick={() => signIn()}>
        sign in
      </button>
    </div>
  );
}
