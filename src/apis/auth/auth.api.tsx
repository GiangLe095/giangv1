import { IAuthData } from "@/types/auth";
import axiosInstance from "../axios";


interface IResponseBody {
    data:{
        _id: string;
        deletedAt: string | null;
        username: string;
        fullname: string;
        phone: string;
        address: string;
        avatarUrl: string;
        role: {
            _id: string;
            deletedAt: string | null;
            name: string;
            permissions: {
                _id: string;
                name: string;
            }[];
            deleted: boolean;
            default: boolean;
            createdAt: string;
            updatedAt: string;
            __v: number;
        }
        status: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
        tokenVersion: string;
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
        },
    }
}
export async function authApi(): Promise<IResponseBody>{
    const res = await axiosInstance.get<IResponseBody>("admin/auth");
    return {
        ...res.data,
        toAuthData: toAuthData.bind(null, res.data),
    }
}