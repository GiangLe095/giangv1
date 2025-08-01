import axiosInstance from "../axios";

interface IRequestBody {
    name?: string;
    default?: boolean;
    permissions?: string[];
}

interface IResponseBody{}

export function updateRoleApi({id, data}: {id: string; data: IRequestBody}): Promise<IResponseBody> {
    return axiosInstance.patch(`/roles/${id}`, data);
}