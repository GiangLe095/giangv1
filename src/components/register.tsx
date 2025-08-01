"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    // Kiểm tra email đã tồn tại chưa
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const emailExists = existingUsers.some((user: any) => user.email === form.email);
    
    if (emailExists) {
      setError("Email này đã được đăng ký. Vui lòng sử dụng email khác.");
      return;
    }

    try {
      // Tạo object user mới
      const newUser = {
        name: form.name,
        email: form.email,
        password: form.password,
        id: Date.now(), // Tạo ID đơn giản
        createdAt: new Date().toISOString()
      };

      // Lưu user mới vào localStorage
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      
      // Lưu thông tin user hiện tại
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("isLoggedIn", "true");

      setError("");
      console.log("Đăng ký thành công:", newUser);
      
      // Chuyển về trang dashboard
      router.push("/login");
    } catch (error) {
      setError("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.");
      console.error("Lỗi đăng ký:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>

        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Họ tên</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Nguyễn Văn A"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Mật khẩu</label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Xác nhận mật khẩu</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}
