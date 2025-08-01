"use client"; // nếu dùng Next.js App Router
import { useState } from "react";
import Login from "../../../components/login";
import Register from "../../../components/register";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4">
      <Login />
    </div>
  );
}
    