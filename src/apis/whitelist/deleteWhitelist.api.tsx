import axiosInstance from "../axios";

export async function deleteWhitelistApi(data: {ipAddress: string}){
    return await axiosInstance.delete("whitelist", {data});
}