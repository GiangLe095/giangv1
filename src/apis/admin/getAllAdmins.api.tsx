import { IAdminData } from "@/types/admin";
import { IPaginatedList } from "@/types/pagination";
import axiosInstance from "@/apis/axios";



interface IRequestParams {
    page?: number;
    perPage?: number;
    sort?: string[];
}

interface IResponseBody{
    message: string;
    data: {
        items: {
            _id: string;
            username: string;
            fullname: string;
            phone: string;
            address: string;
            avatarUrl: string;
            role: {
                _id: string;
                deletedAt: string;
                name: string;
                permissions: {
                    _id: string;
                    deletedAt: string|null;
                    name: string;
                    delete: boolean;
                    createdAt: string;
                    updatedAt: string;
                    __v: number;
                }[];
                deleted: boolean;
                default: boolean;
                createdAt: string;
                updatedAt: string;
                __v: number;
            };
            status: string;
            createdAt: string;
            updatedAt: string;            
        }[];
        pagination: {
            page: number;
            perPage: number;
            count: number;
            total: number;
            totalPage: number;
        };
    };
    toPaginatedList(): IPaginatedList<IAdminData>;
}

function toPaginatedList(data: IResponseBody): IPaginatedList<IAdminData> {
    return {
        items: data.data.items.map((user) => ({
            id: user._id,
            username: user.username,
            fullname: user.fullname,
            phone: user.phone,
            address: user.address,
            avatarUrl: user.avatarUrl,
            role: {
                id: user.role._id,
                name: user.role.name,
                permissions: user.role.permissions.map((p) => ({
                    id: p._id,
                    name: p.name,
                    delete: p.delete,
                })),
            }
        })),
        pagination: data.data.pagination,
    }
}

export async function getAllAdminsApi(params: IRequestParams): Promise<IResponseBody> {
    const res = await axiosInstance.get<IResponseBody>("/admin/all", {params})
    return {
        ...res.data,
        toPaginatedList: toPaginatedList.bind(null, res.data),
    }
}
