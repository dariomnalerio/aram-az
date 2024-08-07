import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatUsername = (username: string) => {
  if (username.length > 9) {
    return `${username.slice(0, 9)}...`;
  }
  return username;
};
