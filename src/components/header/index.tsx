import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Menu, ChevronRight, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";   
import LogoutModal from "@/components/modal/LogoutModal";
import Link from "next/link";
interface HeaderProps{
    onToggleSidebar: () => void;
    isSidebarOpen: boolean;
    isSidebarVisible: boolean;
}

const Header = ({onToggleSidebar, isSidebarOpen, isSidebarVisible}: HeaderProps) => {
    const {user} = useAuth();
    const [open, setOpen] = useState(false);
    
    return (
        <header className="flex items-center justify-between h-20 px-4 md:px-6 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200">
            <div>
                <Button
                    className="p-2 rounded-full bg-white/90 shadow-sm hover:shadow-md transition-all"
                    variant="ghost"
                    onClick={onToggleSidebar}
                >
                    {isSidebarOpen && isSidebarVisible ? (
                        <Menu color="orange" size={24} />
                    ):(
                        <ChevronRight color="Orange" size={24} />
                    )}
                </Button>
            </div>
            <div className="flex items-center gap-3">
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 gap-2 pl-2 pr-4 rounded-full flex items-center">
                            <Avatar className="h-8 w-8 border-2 border-gray-200 dark:border-gray-700">
                                <AvatarImage src={user?.avatarUrl} alt={user?.fullname} />
                                <AvatarFallback> {user?.username.charAt(0)} </AvatarFallback>
                            </Avatar>
                            <span className="hidden md:inline font-medium text-sm"> {user?.fullname}</span>
                            </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 z-50" align="end" forceMount>
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none"> {user?.fullname} </p>
                                <p className="text-xs leading-none text-gray-500 dark:text-gray-400"> {user?.role?.name} </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                            <User className="w-4 h-4 mr-2" />
                            <Link className="w-full" href="/profile" onClick={() => setOpen(false)}>
                                Hồ sơ cá nhân
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                            <LogoutModal />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>    
            </div>
        </header>
    );
};

export default Header;