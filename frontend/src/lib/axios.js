import axios from 'axios';

export const axiosInstance = axios.create({ baseURL: "https://chat-application-api-steel.vercel.app", withCredentials: true });
