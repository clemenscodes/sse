import axios from 'axios';
import { apiUrl } from './url';

export const api = axios.create({
    baseURL: apiUrl,
});

api.interceptors.request.use((config) => {
    config.withCredentials = true;
    return config;
});

api.interceptors.response.use(
    (response) => {
        const jwtRefreshHeader = 'x-refresh-jwt';
        const cookie = response.headers[jwtRefreshHeader];
        const { headers } = response;
        if (jwtRefreshHeader in headers) {
            setJWTBearerToken(cookie);
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const setJWTBearerToken = (token: string) => {
    api.interceptors.request.use((config) => {
        const header = `Bearer ${token}`;
        config.headers['Authorization'] = header;
        return config;
    });
};
