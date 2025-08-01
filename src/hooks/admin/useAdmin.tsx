import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginatedList } from "@/types/pagination";
import { IAdminData } from "@/types/admin";
import { getAllAdminsApi } from "@/apis/admin/getAllAdmins.api";
import { useMutation } from "@tanstack/react-query";
import { createAdminApi } from "@/apis/admin/createAdmin.api";

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
            })
        },
    })




}

