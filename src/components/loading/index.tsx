"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling on the body when loading is shown
    document.body.style.overflow = "hidden";

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 20);

    return () => {
      clearInterval(timer);
      // Restore scrolling when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center" style={{ zIndex: 50 }}>
      <div className="relative w-40 h-40 mb-8">
        <div className="absolute inset-0 rounded-full border-8 border-rose-200 opacity-25"></div>
        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-rose-500 animate-spin"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-rose-500 font-bold text-xl">{progress}%</div>
        </div>

        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-rose-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-rose-600 mb-2">Đang tải...</h2>
        <p className="text-rose-500 text-sm max-w-xs">Chúng tôi đang chuẩn bị trải nghiệm tuyệt vời cho bạn</p>
      </div>

      <div className="mt-8 w-64 h-2 bg-rose-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
