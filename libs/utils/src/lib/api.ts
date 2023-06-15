import axios from 'axios';
import { apiUrl } from './url';

export const api = axios.create({
    baseURL: apiUrl,
});

api.interceptors.request.use((config) => {
    // TODO: implement functionality to send jwt bearer token
    // const token = getJWTBearerToken();
    // if (token) {
    //     config.headers['Authorization'] = `Bearer ${token}`;
    // }
    config.withCredentials = true;
    return config;
});
