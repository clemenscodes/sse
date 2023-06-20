import { Button } from '@components';
import { cn } from '@styles';
import { type HomeProps } from '@types';
import { useSessionStore } from '@utils';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const Home: NextPage<HomeProps> = ({ ...props }) => {
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
            className="flex flex-col justify-center items-center w-full h-full"
            {...props}
        >
            <h1 className={cn('text-4xl font-bold mb-4')}>
                Welcome to Secure Notes!
            </h1>
            <p className="text-lg text-gray-500 mb-8">
                Start organizing your notes today!
            </p>
            <div className="space-x-16">
                <Link href="/login">
                    <Button>Login</Button>
                </Link>
                <Link href="/register">
                    <Button>Register</Button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
