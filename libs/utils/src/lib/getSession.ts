import { UserSession } from '@types';
import { get } from './api';

export const getSession = async (): Promise<UserSession | null> => {
    const { data, status, error } = await get<UserSession>('/auth/session');
    if (error || status !== 200 || !data) {
        return null;
    }
    if (!data) {
        return null;
    }
    return data;
};
