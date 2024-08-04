import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatUsername = (username: string) => {
  const splitName = username.split(" ");
  const firstName = splitName[0];
  if (firstName.length > 8) {
    return `${firstName.slice(0, 8)}...`;
  }
  return firstName;
};
