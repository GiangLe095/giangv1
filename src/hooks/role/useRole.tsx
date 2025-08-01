import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { IPaginatedList } from "@/types/pagination";
import { IRoleData } from "@/types/role";
import { getAllRolesApi } from "@/apis/role/getAllRoles.api";
import { createRoleApi } from "@/apis/role/createRole.api";
import { updateRoleApi } from "@/apis/role/updateRole.api";
import { deleteRoleApi } from "@/apis/role/deleteRole.api";


export function useRole(option?: {enable?: boolean} ) {
    const queryClient = useQueryClient();
    const {toast} = useToast();
    
    const {data, error, isLoading, isError, isFetching, refetch} = useQuery<IPaginatedList<IRoleData>>({
        queryKey: ["roles"],
        queryFn: async () => {
            const response = await getAllRolesApi();
            return response.toPaginatedList();
        },
        enabled: option?.enable ?? false,
    });
    const createRoleMutation = useMutation({
        mutationFn: async (data: {name: string; default: boolean; permissions: string[]}) => {
            const response = await createRoleApi({
                name: data.name,
                default: data.default || false,
                permissions: data.permissions,
            });
            return response.toRoleData();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["roles"]});
            toast({
                title: "Thành công",
                description: "Tạo vai trò thành công",
            });
        },
    });

    const updateRoleMutation = useMutation({
        mutationFn: async (data: {id: string; name?: string; default?: boolean; permissions: string[]}) => {
            const response = await updateRoleApi({
                id: data.id,
                data: {
                    name: data.name,
                    default: data.default,
                    permissions: data.permissions,
                },
            });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["roles"]});
            toast({
                title: "Thành công",
                description: "Cập nhật vai trò thành công",
            });
        },
    });

    const deleteRoleMutation = useMutation({
        mutationFn: async ({roleId}: {roleId: string}) => {
            await deleteRoleApi({roleId});
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["roles"]});
            toast({
                title: "Thành công",
                description: "Xóa vai trò thành công",
            });
        },
    });

    return {
        roles: data,
        error,
        isLoading,
        isError,
        isFetching,
        refetch,

        createRole: createRoleMutation.mutateAsync,
        isCreatingRole: createRoleMutation.isPending,
        updateRole: updateRoleMutation.mutateAsync,
        isUpdatingRole: updateRoleMutation.isPending,
        deleteRole: deleteRoleMutation.mutateAsync,
        isDeletingRole: deleteRoleMutation.isPending,
    }
}