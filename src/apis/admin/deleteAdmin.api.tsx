import axiosInstance from "@/apis/axios";



export async function deleteAdminApi(data: {id: string}) {
    await axiosInstance.delete(`admins/${data.id}`);
}