"use client";

import Login from "@/components/login";
import { SignUp } from "@/components/signup-form";
import { signIn, signOut, useSession } from "next-auth/react";
import { signup } from "./lib/actions";

export type User = {
  email: string;
  name: string;
};

export default function Home() {
  const sesstion = useSession();
  console.log("user", sesstion.data?.user);
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
      <form
        action={async (formData) => {
          const rawFormData = {
            email: formData.get("email")! as string,
            name: formData.get("name")! as string,
            password: formData.get("password")! as string,
          };
          const res = await signup(rawFormData);
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
