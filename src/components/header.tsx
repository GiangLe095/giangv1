"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import LogoutButton from "./logout";   

export default function HeaderBar() {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      {/* Phần bên trái - grow-3 */}
      <div className="w-1/5 h-full grow-3 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
          G
        </div>
        <span className="text-gray-700 font-medium">Xin chào, {user.name}</span>
      </div>

      {/* Phần ở giữa - grow-7 */}
      <div className="w-1/2 h-full">
        <div className="group cursor-pointer">
          <img 
            src="/anh1.png" 
            alt="Header Logo" 
            className="w-full h-12 object-contain "
          />
        </div>
      </div>

      {/* Phần bên phải - grow-3 */}
      <div className="flex justify-end w-1/5 h-full grow-3 relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <img
            src="/avatar.jpg"
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md z-50">
            <button className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors duration-200 border-b border-gray-100">
              Chỉnh sửa thông tin
            </button>
            <div className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors duration-200">
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
