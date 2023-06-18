import { Button, Login } from '@components';
import { cn } from '@styles';
import type { LoginProps } from '@types';
import { NextPage } from 'next';
import Link from 'next/link';

export const LoginPage: NextPage<LoginProps> = ({ ...props }) => {
    return (
        <div className={cn('flex flex-col items-center')} {...props}>
            <h1>Login</h1>
            <p>Enter your username and password</p>
            <Login />
            <p>Not registered yet?</p>
            <Link href={'/register'} className={cn('m-8')}>
                <Button>Register</Button>
            </Link>
        </div>
    );
};

export default Login;
