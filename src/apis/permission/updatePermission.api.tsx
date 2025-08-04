import axiosInstance from "../axios";


interface IRequestBody {
    name?: string;
    description?: string;
}

interface IResponseBody {}

export function updatePermissionApi({id,data}: {id: string, data: IRequestBody}): Promise<IResponseBody> {
    return axiosInstance.patch(`permissions/${id}`, data);
}