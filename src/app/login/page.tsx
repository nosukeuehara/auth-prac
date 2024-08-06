import { signIn } from "@/auth";

export default function Page() {
  return (
    <form
      action={async (formDate) => {
        "use server";
        await signIn("credentials", formDate);
      }}
    >
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <LoginButton />
    </form>
  );
}

function LoginButton() {
  return <button type="submit">Login</button>;
}
