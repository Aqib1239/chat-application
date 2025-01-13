import axios from 'axios';

export const axiosInstance = axios.create({ baseURL: "https://chat-application-lyart-three.vercel.app/api", withCredentials: true });
