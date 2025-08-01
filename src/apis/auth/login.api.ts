import { IAuthData } from "@/types/auth";
import axiosInstance from "../axios";

interface IRequestBody {
    username: string;
    password: string;
}

interface IResponseBody{
    data: {
        user: {
            _id: string;
            deletedAt: string | null;
            username: string;
            fullname: string;
            phone: string;
            address: string;
            avatarUrl: string;
            role: {
                _id: string
                deletedAt: string | null;
                name: string;
                permissions: 
                |{
                    _id: string;
                    name: string;
                }[]
                | string[];
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
        accessToken: string;
    }
    message: string;

    toAuthData(): IAuthData;
}
function toAuthData(data: IResponseBody): IAuthData {
    return {
        id: data.data.user._id,
        username: data.data.user.username,
        fullname: data.data.user.fullname,
        phone: data.data.user.phone,
        avatarUrl: data.data.user.avatarUrl,
        role: {
            id: data.data.user.role._id,
            name: data.data.user.role.name,
            permissions: data.data.user.role.permissions.map((permission) => {
                if (typeof permission === "string") {
                    return {
                        id: permission,
                        name: permission,
                    }
                }
                return {
                    id: permission._id,
                    name: permission.name,
                }
            }),

        },
        accessToken: data.data.accessToken,
    }
}


export async function loginApi(data: IRequestBody): Promise<IResponseBody> {
    const res = await axiosInstance.post<IResponseBody>("admin/auth/login", data);
    return {
        ...res.data,
        toAuthData: toAuthData.bind(null, res.data)
    }
}