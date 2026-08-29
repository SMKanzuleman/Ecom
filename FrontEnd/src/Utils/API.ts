import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:2026",
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
                const res = await axios.post("http://localhost:2026/auth/refresh", {}, { withCredentials: true });
                const newToken = res.data.token;
                API.defaults.headers.common["Authorization"]=`Bearer ${newToken}`

                window.dispatchEvent(new CustomEvent("Token_Refreshed", {detail:newToken}))



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