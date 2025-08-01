import { IPaginatedList } from "@/types/pagination";
import { IRoleData } from "@/types/role";
import axiosInstance from "../axios";


interface IRequestParams {}

interface IResponseBody {
    _id: string;
    deletedAt: string | null;
    name: string;
    default: boolean;
    permissions: {
        name: string;        
    }[];
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    __v: number;

    toPaginatedList(): IRoleData;
}

function toPaginatedList(data: IResponseBody[]): IPaginatedList<IRoleData> {
    return {
        items: data.map((role) => ({
            id: role._id,
            name: role.name,
            permissions: role.permissions.map((permission) => ({
                id: permission.name,
                name: permission.name,
            })),
            default: role.default,
        })),
        pagination: {
            count: data.length,
            page: 1,
            perPage: data.length,
            total: data.length,
            totalPage: 1,
        },
    };
}


export async function getAllRolesApi(params?: IRequestParams) {
    const res = await axiosInstance.get<IResponseBody[]>("/roles", {params});
    return {
        ...res.data,
        toPaginatedList: toPaginatedList.bind(null, res.data),
    };
}