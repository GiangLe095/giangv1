import { baseApiURL } from "@/lib/constants/config";
import { getAccessToken } from "@/lib/utils";
import { AuthError, PermissionError } from "@/types/error";
import { AxiosInstance } from "axios";
import Axios from "axios";

const axiosInstance: AxiosInstance = Axios.create ({
        baseURL: baseApiURL,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    })

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    async (response) => response,
    async (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                Promise.reject(new AuthError(error.response?.data?.message))
            }
            if (status === 403) {
                if (error.response?.data?.errorCode === "IPNotAllowed") {
                    Promise.reject(new AuthError(error.respone?.data?.message))
                } else {
                    Promise.reject(new PermissionError(error.response?.data?.message))
                }
            }
            return Promise.reject(error);
        }
    }
)

export default axiosInstance;