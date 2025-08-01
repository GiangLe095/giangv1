import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const loginSession = JSON.parse(localStorage.getItem("user") || "{}"); // đang login
    const users = JSON.parse(localStorage.getItem("users") || "[]"); // danh sách đã đăng ký

    // Nếu thiếu thông tin hoặc không khớp
    if (
      !loginSession ||
      !users ||
      !users.find(
        (u: any) =>
          u.email === loginSession.email &&
          u.password === loginSession.password
      )
    ) {
      router.push("/auth/login");
    }
  }, []);
}
