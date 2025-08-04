import axiosInstance from "../axios";
import { IPaginatedList } from "@/types/pagination";
import { IWhitelistData } from "@/types/whitelist";

interface IRequestParams {
    page?: number;
    perPage?: number;
    sort?: string[];
}

interface IResponseBody {
    message: string;
    data: {
        items:{
            _id: string;
            ipAddress: string;
            name?: string;
            isActive: boolean;
        }[];
        pagination: {
            page: number;
            perPage: number;
            total: number;
            totalPage: number;
            count: number;
        };
    };
    toPaginatedList(): IPaginatedList<IWhitelistData>;
}

function toPaginatedList(data: IResponseBody): IPaginatedList<IWhitelistData> {
    return {
        items: data.data.items.map((item) => ({
        id: item._id,
        ipAddress: item.ipAddress,
        name: item.name || "unknown IP",
        isActive: item.isActive,
    })),
    pagination: data.data.pagination,
    };
}

export async function getWhitelistApi(params?: IRequestParams): Promise<IResponseBody> {
    const response = await axiosInstance.get("whitelist", {params});

    return {
        ...response.data,
        toPaginatedList: toPaginatedList.bind(null, response.data),
    };
}