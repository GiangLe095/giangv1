import axiosInstance from "../axios";
import { IAuthData } from "@/types/auth";



interface IRequestBody {
    fullname?: string;
    phone?: string;
    status?: string;
    avatarUrl?: string;
}

interface IResponseBody {
    data: {
        _id:string;
        username: string;
        fullname: string;
        phone: string;
        role: {
            _id: string;
            deletedAt: string | null;
            name: string;
            permissions: {
                _id: string;
                deletedAt: string | null;
                name: string;
                deleted: boolean;
                createdAt: string;
                updatedAt: string;
                __v: number;
            }[];
        }
        status: string;
        tokenVersion: string;
        address: string;
        avatarUrl: string;
    }
    message: string;

    toAuthData(): IAuthData;
}

function toAuthData(data: IResponseBody): IAuthData {
    return {
        id: data.data._id,
        username: data.data.username,
        fullname: data.data.fullname,
        phone: data.data.phone,
        avatarUrl: data.data.avatarUrl,
        role: {
            id: data.data.role._id,
            name: data.data.role.name,
            permissions: data.data.role.permissions.map((permission) => ({
                id: permission._id,
                name: permission.name,
            })),
        }
    }
}

export async function updateAdminApi({id,data}: {id: string, data: IRequestBody}): Promise<IResponseBody> {
    const res = await axiosInstance.patch<IResponseBody>(`admin/${id}`, data);
    return {
        ...res.data,
        toAuthData: toAuthData.bind(null, res.data),
    }
}