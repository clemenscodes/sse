import { ForgotPassword } from '@components';
import { cn } from '@styles';
import type { ForgotPasswordPageProps } from '@types';
import type { NextPage } from 'next';

export const ForgotPasswordPage: NextPage<ForgotPasswordPageProps> = ({
    ...props
}) => {
    return (
        <div className={cn('flex flex-col items-center')} {...props}>
            <h1>Forgot Password</h1>
            <p>Enter your e-mail address</p>
            <ForgotPassword />
        </div>
    );
};

export default ForgotPasswordPage;
