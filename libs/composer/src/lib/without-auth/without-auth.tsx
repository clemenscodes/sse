import { useSessionStore } from '@utils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const withoutAuth = <T extends object>(
    WrappedComponent: NextPage<T>
): NextPage<T> => {
    const WithoutAuth: NextPage<T> = ({ ...props }) => {
        const router = useRouter();
        const session = useSessionStore((state) => state.session);

        useEffect(() => {
            if (session) {
                router.push('/note');
            }
        }, [router, session]);

        if (!session) {
            return <WrappedComponent {...props} />;
        }

        return null;
    };

    WithoutAuth.displayName = `withAuth(${
        WrappedComponent.displayName || WrappedComponent.name
    })`;

    return WithoutAuth;
};
