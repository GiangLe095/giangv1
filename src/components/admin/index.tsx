"use client";

import { usePermissions } from "@/components/providers/PermissionProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import { useState } from "react";
import { PAGE_SIZE_OPTION } from "@/lib/constants/config";
import { useAdmin } from "@/lib/hooks/use-admin";



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
    updateAdminRole
  } = useAdmin({page: currentPage, perPage: itemsPerPage}, {enabled: true})

    




};

export default AdminPage;