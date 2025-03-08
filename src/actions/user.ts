import { signIn, signOut } from "next-auth/react";

export const GoogleSignin = async () => {
  try {
    await signIn("google", { callbackUrl: "/dashboard", redirect: true });
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const logout = async () => {
  try {
    await signOut({ redirect: true, callbackUrl: "/auth/signin" });
    return { data: "Logged out successfully" };
  } catch (error) {
    return { error: "Error signing you out" };
  }
};
