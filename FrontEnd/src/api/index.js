import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/bms/",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("tokenForBMS");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
