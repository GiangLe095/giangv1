"use client";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { usePermissions } from "../providers/PermissionProvider";
import { MenuItems } from "@/lib/constants/menuItem";
import AllMenuItems from "@/lib/constants/menuItem";
import { ChevronDown, ChevronRight, ChevronUp, Pizza } from "lucide-react";
import Link from "next/link";
import { SITE_TITLE } from "@/lib/constants/config";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import LogoutModal from "../modal/LogoutModal";

interface SideBar {
    isOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
    setSidebarVisible: (isVisible: boolean) => void;
}

const SideBar = ({isOpen, setSidebarOpen, setSidebarVisible}: SideBar) => {
    const pathname = usePathname();
    const [menuItems,setMenuItems] = useState<MenuItems[]>(AllMenuItems);
    const {canAccess} = usePermissions();   

    useEffect(() => {
        function filterMenuItems(items: MenuItems[]): MenuItems[] {
            return items
                .filter((item) => canAccess({resource: item.permission}))
                .map((item) => {
                    if (item.children) {
                        const filteredChildren = filterMenuItems(item.children);
                        return {
                            ...item,
                            children: filteredChildren,
                        };
                    }
                    return item;
                })
                .filter((item) => !item.children || item.children.length > 0);
        }
        
        setMenuItems(filterMenuItems(AllMenuItems));
    }, [canAccess]);

    const initialOpenMenus = menuItems.reduce(
        (acc, item) => {
            if (item.children && item.children.length >0) {
                acc[item.path] = true;
            }
            return acc;
        },
        {} as Record<string, boolean>
    );

    const [openMenus, setOpenMenus] = useState<Record<string, boolean>> (initialOpenMenus);

    const isActive = useCallback(
        (path: string) => {
            if (!path) return false;
            return pathname === path || pathname.startsWith(`${path}/`);
        },
        [pathname]
    );

    const hasActiveChild = useCallback(
        (item: MenuItems) => {
            if (!item.children) return false;
            return item.children.some((child) => isActive(child.path));
        },
        [isActive]
    );

    const handleWithSidebar = () => {
        setSidebarOpen(true);
        if (window.innerWidth < 768) {
            setSidebarVisible(false);
        }
    };

    useEffect(() => {
        setOpenMenus((prev) => {
            const newOpenMenus = { ...prev };
            menuItems.forEach((item) => {
                if (item.children && hasActiveChild(item)) {
                    newOpenMenus[item.path] = true;
                }
            });
            return newOpenMenus;
        });
    }, [pathname, menuItems, hasActiveChild]);
    
    const toggleMenu = (path: string) => {
        setOpenMenus((prev) => ({
            ...prev,
            [path]: !prev[path],
        }));
    };

    return (
        <aside  
            className={`h-full w-full bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ease-in-out
            ${isOpen ? "w-64 min-w-64" : "w-24 min-w-24"}
        `}
        >
            <div className="flex flex-col h-full">
                <Link 
                    href="/" 
                    className={`h-20 flex items-center justify-center p-6 ${isOpen && "pl-0"} border-b border-gray-200`}
                    >
                    <Pizza className={`h-8 max-w-8 ${isOpen ? "mr-2" : ""} text-orange-600 dark:text-blue-400 flex-1`}/>
                    {isOpen && <span className="text-xl font-bold text-gray-800 dark:text-white">{SITE_TITLE.toUpperCase()}</span>}    
                </Link>
                
                {/* Navigation */}
                <nav className="flex-1 px-2 py-6 space-y-1 overflow-y-auto">
                    {menuItems.map(item => {
                        const isMenuActive = isActive(item.path) || hasActiveChild(item);
                        const Icon = item.icon;

                        if (item.children && item.children.length>0) {
                            if (isOpen) {
                                return (
                                    <Collapsible
                                        key={item.path}
                                        open={openMenus[item.path] || false}
                                        onOpenChange={() => toggleMenu(item.path)}
                                        className="w-full"
                                    >
                                        <CollapsibleTrigger asChild>
                                            <button
                                                className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-100
                                                ${isMenuActive || openMenus[item.path] ? "bg-orange-500 text-orange-600" : "text-gray-700"}`}
                                            >
                                                <Icon className="h-5 w-5" />    
                                                <span className="ml-3">{item.title}</span>
                                                <span className="ml-auto">
                                                    {openMenus[item.path] ? (
                                                        <ChevronDown className="size-4" /> 
                                                    ) : (
                                                        <ChevronRight className="size-4" />
                                                    )}
                                                </span>
                                            </button>
                                        </CollapsibleTrigger>

                                        <CollapsibleContent className="pl-6">
                                            {item.children.map((child) => (
                                                <Link 
                                                    key={child.path}
                                                    href={child.path}
                                                    onClick={handleWithSidebar}
                                                    className={`flex items-center px-4 py-2 mt-1 rounded-lg hover:bg-gray-100
                                                        ${isActive(child.path) ? "bg-orange-50 text-orange-600" : "text-gray-700"}`}
                                                >
                                                    <child.icon className="h-4 w-4 mr-3" />
                                                    <span>{child.title}</span>
                                                </Link>
                                            ))}
                                        </CollapsibleContent>
                                    </Collapsible>
                                )
                            } else {
                                return (
                                    <div key={item.path} className="relative group overflow-visible">
                                        <button
                                            className={`flex items-center ${isOpen && "justify-center"} w-full p-3 rounded-lg hover:bg-gray-100
                                            ${hasActiveChild(item) ? "bg-orange-50 text-orange-600" : "text-gray-700"}`}
                                        >
                                            <Icon className="size-5" />
                                        </button>
                                    </div>
                                )
                            }
                        } else {
                            return (
                                <Link 
                                    key={item.path}
                                    href={item.path}
                                    onClick={handleWithSidebar}
                                    className={`flex items-center ${isOpen && "justify-center"} p-3 rounded-lg hover:bg-gray-100
                                    ${isActive(item.path) ? "bg-orange-50 text-orange-600" : "text-gray-700"}`}
                                >
                                    <Icon className="size-5" />
                                    {isOpen && <span className="ml-3">{item.title}</span>}
                                </Link>
                            )
                        }
                    })}     
                </nav> 

                {/* Logo button */}
                <div className="p-4 border-t border-gray-200">
                    <LogoutModal isOpen={isOpen} />
                </div>
            </div>
        </aside>
    );
};

export default SideBar;