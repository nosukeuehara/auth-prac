import { signin } from "@/app/lib/actions";
import { Button } from "./ui/button";
import Link from "next/link";
export function SignIn() {
  return (
    <div>
      <form
        action={async (formData) => {
          "use server";
          const rawFormData = {
            email: formData.get("email")! as string,
            name: formData.get("name")! as string,
            password: formData.get("password")! as string,
          };
          await signin(rawFormData);
        }}
      >
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
}
