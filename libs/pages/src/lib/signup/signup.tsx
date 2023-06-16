import {
    Alert,
    AlertDescription,
    AlertTitle,
    RegisterDialog,
} from '@components';
import { CheckCircle, XCircle } from 'lucide-react';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface SignupProps {}

export const Signup: NextPage<SignupProps> = ({ ...props }) => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showFailureAlert, setShowFailureAlert] = useState(false);
    const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
        useState(false);

    const handleRegisterSuccess = (success: boolean) => {
        setIsRegistrationSuccessful(success);
        if (success) {
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 4000);
        } else {
            setShowFailureAlert(true);
            setTimeout(() => setShowFailureAlert(false), 4000);
        }
    };

    useEffect(() => {
        if (isRegistrationSuccessful) {
            setIsRegistrationSuccessful(false);
        }
    }, [isRegistrationSuccessful]);

    return (
        <>
            <RegisterDialog onRegisterSuccess={handleRegisterSuccess} />
            {showSuccessAlert && (
                <Alert style={{ backgroundColor: 'lightgreen' }}>
                    <div>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertTitle>Registration Successful!</AlertTitle>
                        <AlertDescription>
                            You have successfully registered. You can now log
                            in.
                        </AlertDescription>
                    </div>
                </Alert>
            )}
            {showFailureAlert && (
                <Alert style={{ backgroundColor: 'lightcoral' }}>
                    <div>
                        <XCircle className="h-4 w-4 text-red-500" />
                        <AlertTitle>Registration Failed!</AlertTitle>
                        <AlertDescription>
                            The registration attempt was unsuccessful. Please
                            try again.
                        </AlertDescription>
                    </div>
                </Alert>
            )}
        </>
    );
};

export default Signup;
