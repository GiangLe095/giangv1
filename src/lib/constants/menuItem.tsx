import { PermissionName } from "@/types/permission";
import { CircleUser, LucideIcon, Network, Settings, ShieldCheck } from "lucide-react";

export interface MenuItems {
    title: string;
    path: string;
    icon: LucideIcon;
    permission: PermissionName | PermissionName[];
    children?: MenuItems[];
}
const AllMenuItems: MenuItems[] = [
    // Add more menu item here, above "Quan tri he thong"
    {
        title: "Quản trị hệ thống",
        path: "/admins",
        icon: Settings, 
        permission: [],
        children: [
            {
                title: "Nhân sự",
                path: "/admins",
                icon: CircleUser,
                permission: ["admins:read", "roles:read"],
            },
            {
                title: "Vai trò",
                path: "/admins/roles",
                icon: ShieldCheck,
                permission: ["roles:read"],
            },
            {
                title: "Quản lý whitelist",
                path: "/whitelist",
                icon: Network,
                permission: ["white-lists:read"],
                
            }
        ],
    }
];

export default AllMenuItems;