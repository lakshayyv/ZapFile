import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios, { AxiosRequestConfig } from "axios";

export const fetcher = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await axios.get<T>(url, config);
  return response.data;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
