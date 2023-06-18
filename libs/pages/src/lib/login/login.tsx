import { Alert, AlertDescription, AlertTitle, LoginDialog } from '@components';
import { useSessionStore } from '@redux';
import { cn } from '@styles';
import { type UserSession } from '@types';
import { getSession } from '@utils';
import { CheckCircle, XCircle } from 'lucide-react';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

export type LoginProps = React.ComponentPropsWithoutRef<'div'> & {
    session?: UserSession;
};

export const Login: NextPage<LoginProps> = ({ ...props }) => {
    const session = useSessionStore((state) => state.session);
    console.log({ session });
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showFailureAlert, setShowFailureAlert] = useState(false);
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

    const handleLoginSuccess = (success: boolean) => {
        setIsLoginSuccessful(success);
        if (success) {
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 4000);
        } else {
            setShowFailureAlert(true);
            setTimeout(() => setShowFailureAlert(false), 4000);
        }
    };

    useEffect(() => {
        getSession();
        setIsLoginSuccessful(isLoginSuccessful);
    }, [isLoginSuccessful]);

    return (
        <div className={cn('flex flex-col items-center')} {...props}>
            <LoginDialog onLoginSuccess={handleLoginSuccess} />
            {showSuccessAlert && (
                <Alert style={{ backgroundColor: 'lightgreen' }}>
                    <CheckCircle className={cn('h-4 w-4 text-green-500')} />
                    <AlertTitle>Login Successful!</AlertTitle>
                    <AlertDescription>
                        You have successfully logged in.
                    </AlertDescription>
                </Alert>
            )}
            {showFailureAlert && (
                <Alert style={{ backgroundColor: 'lightcoral' }}>
                    <XCircle className={cn('h-4 w-4 text-red-500')} />
                    <AlertTitle>Login Failed!</AlertTitle>
                    <AlertDescription>
                        The login attempt was unsuccessful. Please try again.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
};

export default Login;
