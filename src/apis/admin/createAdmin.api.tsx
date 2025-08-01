import { IAdminData } from "@/types/admin";
import axiosInstance from "@/apis/axios";

interface IRequestBody {
    username: string;
    fullname: string;
    password: string;
    phone?: string;
    avatarUrl?: string;
    roleId: string;
}

interface IResponseBody {
   data: {
        _id: string;
        deletedAt: string|null;
        username: string;
        fullname: string;
        phone: string;
        role: {
            _id: string;
            deletedAt: string|null;
            name: string;
            permissions: {
                _id: string;
                deletedAt: string|null;
                name: string;
                deleted: boolean;
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
        avatarUrl: string;
        createdAt: string;
        updatedAt: string;
    };
    message: string;
    toAdminData(): IAdminData;
}

function toAdminData(data: IResponseBody): IAdminData{
    return{
        id: data.data._id,
        username: data.data.username,
        fullname: data.data.fullname,
        phone: data.data.phone,
        avatarUrl: data.data.avatarUrl,
        role: {
            id: data.data.role._id,
            name: data.data.role.name,
            permissions: data.data.role.permissions.map((permission) => {
                return {
                    id: permission._id,
                    name: permission.name,                    
                }
            }),
        },
    }
}

export async function createAdminApi(data: IRequestBody): Promise<IResponseBody> {
    const res = await axiosInstance.post<IResponseBody>("admins", data)
    return {
        ...res.data,
        toAdminData: toAdminData.bind(null, res.data),
    }
}
