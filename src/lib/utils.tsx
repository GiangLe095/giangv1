import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ACCESS_TOKEN_NAME } from "./constants/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);
};

export const getAccessToken = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const cookieValue = document.cookie.split("; ").find((row) => row.startsWith(`${ACCESS_TOKEN_NAME}=`));
  return cookieValue ? cookieValue.split("=")[1] : null;
};

export const setAccessToken = (accessToken: string, maxAge: number) => {
  document.cookie = `${ACCESS_TOKEN_NAME}=${accessToken}; Path=/; SameSite=Strict; Max-Age=${maxAge}`;
};
