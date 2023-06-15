import axios from 'axios';
import { apiUrl } from './url';

export const api = axios.create({
    baseURL: apiUrl,
});

api.interceptors.request.use((config) => {
    config.withCredentials = true;
    return config;
});

// TODO: call this function in login or register as soon as JWT is implemented
export const setJWTBearerToken = (token: string) => {
    api.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${token}`;
        config.withCredentials = true;
        return config;
    });
};
