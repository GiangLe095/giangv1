"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-600 hover:text-red-700 transition-colors duration-200"
    >
      Đăng xuất
    </button>
  );
}
