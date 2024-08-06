
import { signIn } from '@/auth'
export interface FormData {
  email: string;
  password: string;
};

export async function authenticate(formData: FormData): Promise<FormData> {
  try {
    const isOk = await signIn("credentials", formData)
    if (isOk) {
      return formData
    } else {
      return { email: "", password: "" }
    }
  } catch (error) {
    throw error
  }
}