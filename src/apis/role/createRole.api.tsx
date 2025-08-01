import axiosInstance from "../axios";
import { IRoleData } from "@/types/role";

interface IRequestBody {
    name: string;
    default: boolean;
    permissions: string[];
}

interface IResponseBody {
    _id: string;
    deletedAt: string | null;
    deleted: boolean;
    default: boolean;
    createdAt: string;
    updatedAt: string;
    name: string;
    permissions: string[];
    __v: number;

    toRoleData(): IRoleData;
}

function toRoleData(data: IResponseBody): IRoleData {
    return {
        id: data._id,
        name: data.name,
        permissions: data.permissions.map((permission) => ({
            id: permission,
            name: permission,
        })),
        default: data.default,
    };
}

export async function createRoleApi(data: IRequestBody): Promise<IResponseBody>{
    const response = await axiosInstance.post<IResponseBody>("/roles", data);
    return {
        ...response.data,
        toRoleData: toRoleData.bind(null, response.data),
    };
}
