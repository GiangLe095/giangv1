import axiosInstance from "../axios";

import { IWhitelistData } from "@/types/whitelist";

interface IRequestBody {
    ipAddress: string;
    name: string;
}

interface IResponseBody {
    data:{
        _id: string;
        ipAddress: string;
        name: string;
        isActive: boolean;
    }
    message: string;
    toWhitelistData(): IWhitelistData;
}

function toWhitelistData(data: IResponseBody):IWhitelistData{
    return{
        id: data.data._id,
        ipAddress: data.data.ipAddress,
        name: data.data.name,
        isActive: data.data.isActive,
    };
}

export async function addWhitelistApi(data: IRequestBody): Promise<IResponseBody> {
    const response = await axiosInstance.post("whitelist", data);

    return {
        ...response.data,
        toWhitelistData: toWhitelistData.bind(null, response.data),
    };

}
