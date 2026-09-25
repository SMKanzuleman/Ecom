import axios from "axios";
import { showErrorToast } from "./toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});

API.interceptors.response.use(
    //Success
    (response) => response,

    //Error
    async (error) => {
        const originalRequest = error.config;


        if (error.response?.status === 403 && !originalRequest._retry) {

            if (originalRequest.url.includes("/auth/refresh")) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            try {
                // 1️⃣ Automatic Background Refresh!
                const res = await axios.post(`${BACKEND_URL}/auth/refresh`, {}, { withCredentials: true });
                const newToken = res.data.token;
                API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`

                window.dispatchEvent(new CustomEvent("Token_Refreshed", { detail: newToken }))


                // 2️⃣ Failed request ko naye token ke sath dobara chalao!
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return API(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default API;


export const APIERROR = (error: any, FALLBACK: string)=>{
    if (axios.isAxiosError(error)) {
        showErrorToast(error.response?.data?.message || FALLBACK);
    } else {
        showErrorToast(FALLBACK);
    }
}
