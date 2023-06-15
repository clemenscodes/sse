import axios from 'axios';
import { apiUrl } from './url';

export const api = axios.create({
    baseURL: apiUrl,
});

api.interceptors.request.use((config) => {
    config.withCredentials = true;
    return config;
});

// TODO: Attach CSRF token to every request
api.interceptors.request.use((config) => {
    // TODO: Implement this function to extract the CSRF token from the cookie
    // const csrfToken = getCsrfTokenFromCookie();
    // config.headers['csrf-token'] = csrfToken;
    return config;
});

export const setJWTBearerToken = (token: string) => {
    api.interceptors.request.use((config) => {
        const header = `Bearer ${token}`;
        config.headers['Authorization'] = header;
        return config;
    });
};
