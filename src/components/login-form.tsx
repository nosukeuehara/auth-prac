
import { authenticate } from "@/app/lib/actions"
export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server"
        const rawFormData = {
          email: formData.get("email")! as string,
          name: formData.get("name")! as string,
          password: formData.get("password")! as string,
        };
        await authenticate(rawFormData)
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
      <button>Sign In</button>
    </form>
  )
}