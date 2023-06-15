import axios from 'axios';
import { apiUrl } from './url';

export const api = axios.create({
    baseURL: apiUrl,
});

let jwtBearerToken: string | null = null;

api.interceptors.request.use((config) => {
    config.withCredentials = true;

    if (jwtBearerToken) {
        const header = `Bearer ${jwtBearerToken}`;
        config.headers['Authorization'] = header;
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        const jwtRefreshHeader = 'x-refresh-jwt';
        if (jwtRefreshHeader in response.headers) {
            const jwt = response.headers[jwtRefreshHeader];
            setJWTBearerToken(jwt);
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const setJWTBearerToken = (token: string) => {
    jwtBearerToken = token;
};

export const get = async <T = unknown>(endpoint: string) => {
    try {
        const { data, status } = await api.get<T>(endpoint);
        return { data, status };
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error(e);
        }
        console.error(e);
        throw e;
    }
};

export const post = async <T = unknown, K = unknown>(
    endpoint: string,
    payload: K
) => {
    try {
        const { data, status } = await api.post<T>(endpoint, payload);
        return { data, status };
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error(e);
        }
        console.error(e);
        throw e;
    }
};
