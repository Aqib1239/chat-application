import axios from 'axios';

export const axiosInstance = axios.create({ baseURL: "https://chat-application-api-nine.vercel.app/api", withCredentials: true });
