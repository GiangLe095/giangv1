import axiosInstance from "../axios";

interface IRequestBody {
    oldPassword: string;
    newPassword: string;
}

interface IResponseBody {
    data: boolean;
    message: string;
}

export async function updatePasswordApi(data: IRequestBody): Promise <IResponseBody> {
    const res = await axiosInstance.put<IResponseBody>("admin/password", data);
    return res.data;
}