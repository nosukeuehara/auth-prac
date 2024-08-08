// import { signin } from "@/app/lib/actions";
// import { Button } from "./ui/button";
// import Link from "next/link";
// export function SignIn() {
//   return (
//     <div>
//       <form
//         action={async (formData) => {
//           "use server";
//           const rawFormData = {
//             email: formData.get("email")! as string,
//             name: formData.get("name")! as string,
//             password: formData.get("password")! as string,
//           };
//           await signin(rawFormData);
//         }}
//       >
//         <label>
//           Email
//           <input name="email" type="email" />
//         </label>
//         <label>
//           Password
//           <input name="password" type="password" />
//         </label>
//         <Button>Sign In</Button>
//       </form>
//       <div>
//         <Link href="/signup">Have you signed up yet?</Link>
//       </div>
//     </div>
//   );
// }

import { redirect } from "next/navigation";

import { AuthError } from "next-auth";
import { providerMap, signIn } from "@/auth";

export default async function SignInPage() {
  return (
    <div className="flex flex-col gap-2">
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            try {
              await signIn(provider.id);
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect(`/`);
              }

              // Otherwise if a redirects happens NextJS can handle it
              // so you can just re-thrown the error and let NextJS handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error;
            }
          }}
        >
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))}
    </div>
  );
}
