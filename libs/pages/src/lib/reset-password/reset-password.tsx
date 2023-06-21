import { cn } from '@styles';
import {ResetPassword} from "@components";

export function ResetPasswordPage() {
    return (
        <div className={cn('flex flex-col items-center')}>
            <h1>Reset Password</h1>
            <p>Please enter a new Password</p>
            <ResetPassword />
        </div>
    );
}

export default ResetPasswordPage;
