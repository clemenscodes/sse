import { Button, LoginForm } from '@components';
import { cn } from '@styles';
import type { LoginProps } from '@types';
import { useSessionStore } from '@utils';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const Login: NextPage<LoginProps> = ({ ...props }) => {
    const [hasMounted, setHasMounted] = useState(false);
    const session = useSessionStore((state) => state.session);
    const router = useRouter();

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    if (session) {
        router.push('/note');
    }

    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center h-full w-full'
            )}
            {...props}
        >
            <h1>Login</h1>
            <p>Enter your username and password</p>
            <LoginForm />
            <p>Not registered yet?</p>
            <Link href={'/register'} className={cn('m-8')}>
                <Button>Register</Button>
            </Link>
        </div>
    );
};

export default Login;
