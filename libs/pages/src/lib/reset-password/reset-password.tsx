import { ResetPassword } from '@components';
import { cn } from '@styles';
import { ResetPasswordPageProps } from '@types';
import { NextPage } from 'next';

export const ResetPasswordPage: NextPage<ResetPasswordPageProps> = ({
    token,
    ...props
}) => {
    return (
        <div className={cn('flex flex-col items-center')} {...props}>
            <h1>Reset Password</h1>
            <p>Please enter a new Password</p>
            <ResetPassword token={token} />
        </div>
    );
};

export default ResetPasswordPage;
