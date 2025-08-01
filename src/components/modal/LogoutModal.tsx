"use client";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";






interface LogoutModalProps {
    isOpen: boolean;    
}

const LogoutModal = ({isOpen}: LogoutModalProps) => {
    const [open, setOpen] = useState(false);
    const { logout, isLoading } = useAuth();

    const handleLogout = async () => {
        setOpen(false);
        try {
            await logout();
            toast({
                title: "Đăng xuất thành công",
                description: "Bạn đã đăng xuất khỏi hệ thống",
                duration: 3000,
            });
        } catch (error: any) {
            toast({
                title: "Đăng xuất thất bại",
                description: error?.message || "Có lỗi xảy ra khi đăng xuất",
                variant: "destructive",
                duration: 3000,
            });
        }
    }
    
    
    
    
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center text-orange-600 border-orange-600 hover:bg-orange-50 hover:text-orange-700"
                    >
                        {isOpen? (
                            <>
                                <LogOut className="size-5 mr-2" />
                                <span>Đăng xuất</span>                                
                            </>
                        ) : (
                            <LogOut className="size-5" />
                        )}
                </Button>                   
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Xác nhận đăng xuất</DialogTitle>
                    <DialogDescription>Bạn có chắc chắn muốn đăng xuất khỏi hệ thống</DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end mt-4">
                    <Button
                    type="button"
                    variant="outline" 
                    onClick={() => setOpen(false)}
                    className="border border-red-300 text-red-700 hover:bg-transparent hover:text-red-700"
                    >
                    Hủy
                    </Button>
                    <Button type="button" variant="destructive" onClick={handleLogout} disabled={isLoading}>
                        {isLoading ? "Đang xử lý..." : "Đăng xuất"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}                       

export default LogoutModal;