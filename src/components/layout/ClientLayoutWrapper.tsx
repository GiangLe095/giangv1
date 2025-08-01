"use client";

import Header from "../header";
import Sidebar from "../sidebar";
import { useSidebar } from "@/hooks/use-sidebar";


export default function ClientLayoutWrapper ({children}: {children: React.ReactNode}) {
    const {isOpen, isVisible, setIsOpen, setIsVisible, toggleSidebar} = useSidebar();
    return (
        <div className= 'flex min-h-screen bg-gray-50 overflow-hidden'>
            <div 
                className={`
                    fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
                    ${isVisible? "translate-x-0" : "-translate-x-full"}
                    md: relative md:translate-x-0 md:block
                    ${isOpen ? "w-64" : "w-24"}
                    `}
            >
                <Sidebar isOpen={isOpen} setSidebarOpen={setIsOpen} setSidebarVisible={setIsVisible} />
            </div>
                {isVisible && (
                    <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={() => setIsVisible(false)}>
                    </div>
                )}

                <div className="flex flex-col flex-1 overfllow-auto">
                    <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isOpen} isSidebarVisible={isVisible} />
                    <div className='flex-1'> {children}</div>
                </div>
            </div>
        </div>
    )
}