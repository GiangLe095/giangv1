import axiosInstance from "../axios";


export async function deleteRoleApi({roleId}: {roleId: string}) {
    return axiosInstance.delete(`/roles/${roleId}`);
}