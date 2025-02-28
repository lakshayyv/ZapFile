import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios, { AxiosRequestConfig } from "axios";
import bcrypt from "bcryptjs";

export const fetcher = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axios.get<T>(url, config);
  return response.data;
};

export const comparePasskey = (passkey: string, hash: string) => {
  const match = bcrypt.compareSync(passkey, hash);
  return match;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
