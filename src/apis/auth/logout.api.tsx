import axiosInstance from "../axios";

export async function logoutApi(){
    await axiosInstance.get("admin/auth/log-out");
}