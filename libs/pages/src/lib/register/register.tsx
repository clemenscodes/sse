import { Button, Register } from '@components';
import { cn } from '@styles';
import { useSessionStore } from '@utils';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export type RegisterProps = React.ComponentPropsWithoutRef<'div'>;

export const RegisterPage: NextPage<RegisterProps> = ({ ...props }) => {
    const router = useRouter();
    const session = useSessionStore((state) => state.session);
    const [hasMounted, setHasMounted] = useState(false);

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
        <div className={cn('flex flex-col items-center')} {...props}>
            <h1>Register</h1>
            <p>Enter all the relevant information.</p>
            <Register />
            <p>Already registered?</p>
            <Link href={'/login'} className={cn('m-8')}>
                <Button>Login</Button>
            </Link>
        </div>
    );
};

export default RegisterPage;
