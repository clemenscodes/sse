import axios, { AxiosRequestConfig } from 'axios';
import { useSessionStore } from './hooks/use-session';
import { apiUrl } from './url';

export const api = axios.create({
    baseURL: apiUrl,
});

api.interceptors.request.use((config) => {
    if (process.title !== 'browser') {
        return config;
    }

    config.withCredentials = true;
    const { jwt } = useSessionStore.getState();

    if (jwt) {
        const header = `Bearer ${jwt}`;
        config.headers['Authorization'] = header;
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        const jwtRefreshHeader = 'x-refresh-jwt';
        if (jwtRefreshHeader in response.headers) {
            const jwt = response.headers[jwtRefreshHeader];
            useSessionStore.setState((state) => {
                return {
                    ...state,
                    jwt,
                };
            });
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const get = async <Return = unknown, Config = unknown>(
    endpoint: string,
    config?: AxiosRequestConfig<Config>
) => {
    try {
        const { data, status } = await api.get<Return>(endpoint, config);
        return { data, status, error: null };
    } catch (e) {
        if (axios.isAxiosError(e)) {
            return { data: null, status: e.status, error: e };
        }
        console.error(e);
        throw e;
    }
};

export const post = async <
    Payload = unknown,
    Return = unknown,
    Config = unknown
>(
    endpoint: string,
    payload?: Payload,
    config?: AxiosRequestConfig<Config>
) => {
    try {
        const { data, status } = await api.post<Return>(
            endpoint,
            payload,
            config
        );
        return { data, status, error: null };
    } catch (e) {
        if (axios.isAxiosError(e)) {
            return { data: null, status: e.status, error: e };
        }
        console.error(e);
        throw e;
    }
};
