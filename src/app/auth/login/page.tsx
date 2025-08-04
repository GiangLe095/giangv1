import { SITE_TITLE } from "@/lib/constants/config";
import { Pizza } from "lucide-react";
import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: `Đăng nhập - ${SITE_TITLE}`
}

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col md:flex-row w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl mx-4">
        {/* Left side */}        
        <div className="flex flex-col items-center justify-center p-8 md:p-14 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden md:flex-1 py-12">
          <div className="flex flex-col items-center justify-center z-10">
            <div className="p-3 md:p-4 bg-white/10 rounded-full backdrop-blur-sm mb-4 md:mb-6">
              <Pizza className="w-10 h-10 md:w-16 md:h-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {SITE_TITLE.toUpperCase()}
            </h1>
            <p className="text-white text-center mb-8">
              Chào mừng bạn đến với web của Giang {SITE_TITLE.toUpperCase()}. <br />
              Đăng nhập để tiếp tục.
            </p>
          </div>
          {/* Background decoration */}
          <div className="absolute -botton-32 -right-32 w-64 md:w-96 h-64 md:h-96 bg-blue-500/30 rounded-full backfrop-blur-sm"></div>
          <div className="absolute top-20 -left-20 w-40 md:w-60 h-40 md:h-60 bg-indigo-500/20 rounded-full backfrop-blur-sm"></div>
          <div className="absolute top-1/2 left-1/4 w-12 md:w-20 h-12 md:h-20 bg-blue-500/10 rounded-full backfrop-blur-sm"></div>
        </div>
        {/* Right side */}
        <div className="flex flex-col justify-center p-6 md:p-12 space-y-6 bg-white dark:bg-gray-900 w-full md:w-2/5">
          <div className="tẽt-center mb-2 md:mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"> Đăng nhập</h2>
            <p className="text-gray-600 dark-text-gray-400 mt-1 md:mt-2 text-sm md:text-base">
              Đăng nhập để tiếp tục truy cập hệ thống
            </p>
            <div>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;