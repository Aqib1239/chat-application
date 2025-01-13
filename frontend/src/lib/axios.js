import axios from 'axios';

export const axiosInstance = axios.create({ baseURL: "https://chat-application-lyart-three.vercel.app", withCredentials: true });
