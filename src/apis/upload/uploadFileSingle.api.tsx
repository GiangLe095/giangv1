import axiosInstance from "../axios";
import { baseApiUploadURL } from "@/lib/constants/config";

interface IRequestBody {
    file: File;
}

interface IResponseBody {
    message: string;
    fileName: string;
    url: string;
}

export async function uploadSingleApi({file}: IRequestBody): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post<IResponseBody>(baseApiUploadURL + "uploads/image", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "*/*",
        },
    });

    return response.data.url;
}