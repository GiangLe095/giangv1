import axiosInstance from "../axios";

interface IRequestBody {
    ipAddress: string;
    name?: string;
    isActive?: boolean;
}

interface IResponseBody {}

export async function updateWhitelistApi({
    whitelistId,
    data,
}: {
    whitelistId: string;
    data: IRequestBody;
}): Promise<IResponseBody> {
    if (data.isActive !== undefined){
        return await axiosInstance.put("white-list/isActive",{
            ipAddress: data.ipAddress,
            isActive: data.isActive,
        });
    }

    return await axiosInstance.put(`white-list/${whitelistId}`, {
        ipAddress: data.ipAddress,
        name: data.name,
    });
    
}