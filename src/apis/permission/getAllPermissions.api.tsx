import axiosInstance from "../axios";
import { IPaginatedList } from "@/types/pagination";
import { IPermissionData } from "@/types/permission";

interface IRequestParams {}

interface IResponseBody{
    _id: string;
    deleteAt: string|null;
    name: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


function toPaginatedList(data: IResponseBody[]): IPaginatedList<IPermissionData>{
    return {
        items: data.map((permission) => ({
            id: permission._id,
            name: permission.name,
        })),
        pagination: {
            page: 1,
            perPage: data.length,
            totalPage: 1,
            count: data.length,
            total: data.length,
        },
    };
}

export async function getAllPermissionsApi(params?: IRequestParams) {

    const res = await axiosInstance.get<IResponseBody[]>("permissions", {params});

    return {
        ...res.data,
        toPaginatedList: toPaginatedList.bind(null, res.data),
    };
}