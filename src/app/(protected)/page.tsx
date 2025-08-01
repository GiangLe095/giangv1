"use client";

import { SITE_TITLE } from "@/lib/constants/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra authentication
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = localStorage.getItem("user");
    
    if (!isLoggedIn || !user) {
      router.push("/auth/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  // Hiển thị loading khi đang kiểm tra
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Đang kiểm tra...</p>
        </div>
      </div>
    );
  }

  // Hiển thị nội dung khi đã đăng nhập
  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-gray-800 px-4">
      <div className="text-center p-10 bg-gradient-to-br from-orange-100 via-white to-orange-50 rounded-3xl shadow-2xl border border-orange-200 max-w-2xl w-full transition-all duration-500">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-orange-500 mb-6 leading-tight drop-shadow">
          Chào mừng đến với hệ thống {SITE_TITLE}!
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 font-medium">
          Hệ thống đang được bảo trì và nâng cấp để phục vụ bạn tốt hơn. Vui lòng quay lại sau hoặc liên hệ với chúng
          tôi nếu cần hỗ trợ.
        </p>
      </div>
    </div>
  );
} 