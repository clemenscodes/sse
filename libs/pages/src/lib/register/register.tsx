import { Button, Register } from '@components';
import { cn } from '@styles';
import { NextPage } from 'next';
import Link from 'next/link';

export type RegisterProps = React.ComponentPropsWithoutRef<'div'>;

export const RegisterPage: NextPage<RegisterProps> = ({ ...props }) => {
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
