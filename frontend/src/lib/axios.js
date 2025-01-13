import axios from 'axios';

export const axiosInstance = axios.create({ baseURL: import.meta.env.MODE === "development" ? "https://chat-application-api-nine.vercel.app/api : "/api", withCredentials: true, headers: { "Content-Type": "application/json" } });
