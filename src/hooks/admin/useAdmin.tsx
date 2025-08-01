import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginatedList } from "@/types/pagination";
import { IAdminData } from "@/types/admin";
import { getAllAdminsApi } from "@/apis/admin/getAllAdmins.api";
import { useMutation } from "@tanstack/react-query";
import { createAdminApi } from "@/apis/admin/createAdmin.api";
import { deleteAdminApi } from "@/apis/admin/deleteAdmin.api";
import { resetPasswordApi } from "@/apis/admin/resetPassword.api";
import { updateAdminRoleApi } from "@/apis/admin/updateAdminRole.api";

interface UseAdminProps {
    page?: number;
    perPage?: number;
    sort?: string[];
}
export default function useAdmin(params?: UseAdminProps, options?: {enabled?: boolean}) {
    const queryClient = useQueryClient(); 

    const {data, error, isLoading, isError, isFetching, refetch} = useQuery<IPaginatedList<IAdminData>>({
        queryKey: ["admin", params],
        queryFn: async () => {
            const response = await getAllAdminsApi({
                page: params?.page,
                perPage: params?.perPage,
                sort: params?.sort,
            })
            return response.toPaginatedList();
        },
        enabled: options?.enabled || false,
    })

    const createAdmin = useMutation({
        mutationFn: async (data: {
            username: string;
            fullname: string;
            password: string;
            phone?: string;
            avatarUrl?: string;
            roleId: string;
        }) => {
            await createAdminApi({
                username: data.username,
                fullname: data.fullname,
                password: data.password,
                phone: data.phone,
                avatarUrl: data.avatarUrl,
                roleId: data.roleId,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin"]});
        }
    });

    const updateAdmin = useMutation ({
        mutationFn: async (data: {id: string; roleId: string}) => {
            await updateAdminRoleApi({
                userId: data.id,
                data: {
                    roleId: data.roleId,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admin"]});
        },
    });

    const deleteAdmin = useMutation({
        mutationFn: async (data: {id: string}) => {
            await deleteAdminApi(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["admins"]});
        },
    });

    const resetPassword = useMutation({
        mutationFn: async (data: {userId: string; newPassword: string}) => {
            await resetPasswordApi({
                userId: data.userId,
                data: {
                    password: data.newPassword,
                },
            });
        },       
    });

    return {
        admins: data,
        error,
        isLoading,
        isError,
        isFetching,
        refetch,
    
        createAdmin: createAdmin.mutateAsync,
        isCreatingAdmin: createAdmin.isPending,

        updateAdmin: updateAdmin.mutateAsync,
        isUpdatingAdmin: updateAdmin.isPending,

        deleteAdmin: deleteAdmin.mutateAsync,
        isDeletingAdmin: deleteAdmin.isPending,

        resetPassword: resetPassword.mutateAsync,
        isResettingPassword: resetPassword.isPending,
    }
}

