import axiosInstance from "../axios";
import { baseApiUploadURL } from "@/lib/constants/config";

interface IRequestBody {
    files: File[];
}

interface IResponseBody {
    message: string;
    files: {
        fileUrl: string;
        fileName: string;
    }[];
}

export async function uploadMultipleApi({files}: IRequestBody): Promise<string[]> {
    const formData = new FormData();
    files.forEach((file: File) => {
        formData.append("image", file);
    });

    const response = await axiosInstance.post<IResponseBody>(baseApiUploadURL + "uploads/multiple", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "*/*",
        },
    });

    return response.data.files.map((file) => file.fileUrl);
 }
