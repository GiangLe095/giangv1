import axiosInstance from "../axios";


interface IRequestBody {
    roleId: string;
}

interface IResponseBody {
    message: string;
    data: {
        _id: string;
        role: string;
    }
}



export async function updateAdminRoleApi({
    data,
    userId,
}: {
    data: IRequestBody;
    userId: string;
}): Promise<IResponseBody> {
    const res = await axiosInstance.put<IResponseBody>(`admins/${userId}/role`, data);
    return res.data;
}
