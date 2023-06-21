import { cn } from '@styles';
import {ForgotPassword} from "@components";

export function ForgotPasswordPage() {
    return (
        <div className={cn('flex flex-col items-center')}>
            <h1>Forgot Password</h1>
            <p>Enter your e-mail address</p>
            <ForgotPassword />
        </div>
    );
}

export default ForgotPasswordPage;
