"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginApi } from "@/apis/auth/login.api";
import { setAccessToken } from "@/lib/utils";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ username và password.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Gọi API đăng nhập
      const response = await loginApi({ username, password });
      
      // Lấy thông tin user từ response
      const userData = response.toAuthData();
      
      // Lưu thông tin user vào localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isLoggedIn", "true");
      
      // Lưu access token
      if (userData.accessToken) {
        setAccessToken(userData.accessToken, 30 * 24 * 60 * 60); // 30 days
      }

      // Chuyển về trang chủ
      router.push("/admin");
      
    } catch (err: any) {
      console.error("Login error:", err);
      
      // Xử lý lỗi từ API
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Username</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập username"
            disabled={isLoading}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className={`w-full text-white py-2 rounded transition mb-3 ${
            isLoading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
        
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
          disabled={isLoading}
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}
