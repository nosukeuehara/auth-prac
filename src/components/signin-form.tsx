import { signin } from "@/app/lib/actions";
import { Button } from "./ui/button";
import Link from "next/link";
import { providerMap, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";

export function SignIn() {
  const csrfToken = cookies().get("authjs.csrf-token")?.value ?? "";
  return (
    <div>
      {Object.values(providerMap).map((provider) => {
        if (provider.name === "Credentials") {
          return (
            <div key={provider.name}>
              <form
                action={async (formData) => {
                  "use server";
                  const rawFormData = {
                    email: formData.get("email")! as string,
                    name: formData.get("name")! as string,
                    password: formData.get("password")! as string,
                    csrfToken: formData.get("csrfToken")! as string,
                  };

                  try {
                    await signin(rawFormData);
                  } catch (error) {
                    if (error instanceof AuthError) {
                      return redirect(`/error?error=${error.type}`);
                    }
                    throw error;
                  }
                }}
              >
                <input type="hidden" name="csrfToken" value={csrfToken} />
                <label>
                  Email
                  <input name="email" type="email" />
                </label>
                <label>
                  Password
                  <input name="password" type="password" />
                </label>
                <Button>Sign In</Button>
              </form>
              <div>
                <Link href="/signup">Have you signed up yet?</Link>
              </div>
            </div>
          );
        } else {
          return (
            <form
              key={provider.id}
              action={async () => {
                "use server";
                try {
                  await signIn(provider.id);
                } catch (error) {
                  if (error instanceof AuthError) {
                    return redirect(`/error?error=${error.type}`);
                  }
                  throw error;
                }
              }}
            >
              <button type="submit">
                <span>Sign in with {provider.name}</span>
              </button>
            </form>
          );
        }
      })}
    </div>
  );
}
