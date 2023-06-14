import { Alert, AlertDescription, AlertTitle, LoginDialog } from '@components';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { Error } from '../error/error';
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

/* eslint-disable-next-line */
export interface LoginProps { }

export const Signin: NextPage<LoginProps> = ({ ...props }) => {
    const { data } = useSession();

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
    }

    useEffect(() => {
        if (isLoginSuccessful) {
            setIsLoginSuccessful(false);
        }
    }, [isLoginSuccessful]);

    if (!data) {
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
                                The login attempt was unsuccessful. Please try again.
                            </AlertDescription>
                        </div>
                    </Alert>
                )}
            </>
        );
    }

    return <Error error={'shouldnt be possible to visit'} />;
};

export default Signin;
