import axiosInstance from "@/apis/axios";


interface IRequestBody {
    newPassword: string;
}

interface IResponseBody {
    message: string;
    data: boolean;
}

export async function resetPasswordApi(data: {userId: string; data: IRequestBody}): Promise<IResponseBody> {
    const res = await axiosInstance.put<IResponseBody>(`admins/${data.userId}/password`, data);
    return res.data;
}