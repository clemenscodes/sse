import { UserSession } from '@types';
import { getSession, jwtBearerToken } from '@utils';
import { useEffect, useState } from 'react';

export const useSession = () => {
    const [session, setSession] = useState<UserSession | null>(null);

    useEffect(() => {
        (async () => {
            if (!jwtBearerToken) {
                return setSession(null);
            }
            const data = await getSession();
            if (!session) {
                return setSession(null);
            }
            setSession(data);
        })();
    }, [session]);

    return session;
};
