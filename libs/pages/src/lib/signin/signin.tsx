import { Alert, AlertDescription, AlertTitle, LoginDialog } from '@components';
import { CheckCircle, XCircle } from 'lucide-react';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface LoginProps {}

export const Signin: NextPage<LoginProps> = ({ ...props }) => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showFailureAlert, setShowFailureAlert] = useState(false);
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

    const handleLoginSuccess = (success: boolean) => {
        console.log({ success });
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
        setIsLoginSuccessful(isLoginSuccessful);
    }, [isLoginSuccessful]);

    return (
        <>
            <LoginDialog onLoginSuccess={handleLoginSuccess} />
            {showSuccessAlert && (
                <Alert style={{ backgroundColor: 'lightgreen' }}>
                    <div>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertTitle>Login Successful!</AlertTitle>
                        <AlertDescription>
                            You have successfully logged in.
                        </AlertDescription>
                    </div>
                </Alert>
            )}
            {showFailureAlert && (
                <Alert style={{ backgroundColor: 'lightcoral' }}>
                    <div>
                        <XCircle className="h-4 w-4 text-red-500" />
                        <AlertTitle>Login Failed!</AlertTitle>
                        <AlertDescription>
                            The login attempt was unsuccessful. Please try
                            again.
                        </AlertDescription>
                    </div>
                </Alert>
            )}
        </>
    );
};

export default Signin;
