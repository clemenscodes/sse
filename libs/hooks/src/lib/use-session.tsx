import { UserSession } from '@types';
import { get } from '@utils';
import { useEffect, useState } from 'react';

export const useSession = () => {
    const [user, setUser] = useState<UserSession | null>(null);

    useEffect(() => {
        const getSession = async () => {
            const { data, status, error } = await get<UserSession>(
                '/auth/session'
            );
            if (error || status !== 200) {
                setUser(null);
            }
            if (data) {
                setUser(data);
            }
        };
        getSession();
    }, [user]);

    return user;
};
