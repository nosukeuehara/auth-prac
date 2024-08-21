"use server";

import { signIn } from "@/auth";

export interface User {
  email: string;
  name: string;
}

export interface FormData {
  email: string;
  name: string;
  password: string;
  csrfToken?: string;
}

export async function signin(formData: FormData): Promise<User> {
  try {
    const isOk = await signIn("credentials", formData);
    const userData: User = { email: formData.email, name: formData.name };
    if (isOk) {
      return userData;
    } else {
      return { email: "", name: "" };
    }
  } catch (error) {
    throw error;
  }
}

export async function signup(formData: FormData): Promise<any> {
  try {
    const { email, name, password } = formData;
    await fetch(`http://localhost:3000/api/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, name: name, password: password }),
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
