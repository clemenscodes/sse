import { useSessionStore } from '@utils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const withAuth = <T extends object>(WrappedComponent: NextPage<T>) => {
    const WithAuth: NextPage<T> = ({ ...props }) => {
        const router = useRouter();
        const session = useSessionStore((state) => state.session);

        useEffect(() => {
            if (!session) {
                router.push('/login');
            }
        }, [router, session]);

        if (!session) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    WithAuth.displayName = `withAuth(${
        WrappedComponent.displayName || WrappedComponent.name
    })`;

    return WithAuth;
};
