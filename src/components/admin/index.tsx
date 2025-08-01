"use client";

import { usePermissions } from "@/components/providers/PermissionProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import { useEffect, useState } from "react";
import { PAGE_SIZE_OPTION } from "@/lib/constants/config";
import useAdmin from "@/hooks/admin/useAdmin";
import { useRole } from "@/hooks/role/useRole";
import { IAdminData } from "@/types/admin";
import { IRoleData } from "@/types/role";



const AdminPage = () => {
  const {canAccess, PERMISSIONS} = usePermissions(); 
  const {user: currentUser} = useAuth();    
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(Number(PAGE_SIZE_OPTION[0]));
  const {
    admins = {
        items: [],
        pagination: { count: 0, page: currentPage, perPage: itemsPerPage, total: 0, totalPage: 0},
    },
    isLoading,
    updateAdminRole,
   } = useAdmin({page: currentPage, perPage: itemsPerPage}, {enabled: true});

   const {
        roles = {
            items: [],
            pagination: { count: 0, page: 1, perPage:100, total: 0, totalPage: 0},
        },
        isLoading: isLoadingRoles,        
   } = useRole({enabled: true});
    
   const [permission, setPermission] = useState({
        createAdmin: false,
        updateAdmin: false,
        deleteAdmin: false,       
   });

   useEffect(() => {
        setPermission({
            createAdmin: canAccess({resource: PERMISSIONS.ADMINS.CREATE}),
            updateAdmin: canAccess({resource: PERMISSIONS.ADMINS.UPDATE}),
            deleteAdmin: canAccess({resource: PERMISSIONS.ADMINS.DELETE}),
        });
   }, [canAccess, PERMISSIONS]);

   const modalRef = useRef<AdminModalRef>(null);

   const handleAddUser = () => {
    if (modalRef.current) {
        modalRef.current.handleAddUser();
    }
   };
   const handleUpdateUser = (user: IAdminData) => {
    if (modalRef.current) {
        modalRef.current.handleUpdateAdmin(user);
    }
   };
   const handleDeleteUser = (user: IAdminData) => {
    if (modalRef.current) {
        modalRef.current.handleDeleteAdmin(user);
    }
   };
   const handlePasswordUpdate = (user: IAdminData) => {
    if (modalRef.current) {
        modalRef.current.handlePasswordUpdate(user);
    }
   };
   const handleRoleChange = (userId: string, roleId: string) => {
    try {
        updateAdminRole({id: userId, roleId});
    } catch (error) {
        console.error("Cập nhật vai trò thất bại", error);
    }
   };
   const handleItemsPerPagesChange = (value: string) => {
        setItemsPerPage(Number(value));
        setCurrentPage(1);
   };
   
};

export default AdminPage;