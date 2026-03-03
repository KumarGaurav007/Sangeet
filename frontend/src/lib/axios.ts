import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
    const token = await (window as any).Clerk?.session?.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});