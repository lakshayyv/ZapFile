import { signIn } from "next-auth/react";
import { toast } from "sonner";

export const GoogleSignin = async () => {
  try {
    await signIn("google", { callbackUrl: "/dashboard", redirect: true });
  } catch (error) {
    toast.error("Something went wrong");
  }
};
