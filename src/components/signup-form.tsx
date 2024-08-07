import { signup } from "@/app/lib/actions";

export function SignUp() {
  return (
    <form
      action={async (formData) => {
        "use server";
        const rawFormData = {
          email: formData.get("email")! as string,
          name: formData.get("name")! as string,
          password: formData.get("password")! as string,
        };
        await signup(rawFormData);
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
      <button>Sign Up</button>
    </form>
  );
}
