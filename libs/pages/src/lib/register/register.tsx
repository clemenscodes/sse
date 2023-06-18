import {
    Alert,
    AlertDescription,
    AlertTitle,
    RegisterDialog,
} from '@components';
import { cn } from '@styles';
import { CheckCircle, XCircle } from 'lucide-react';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

export type RegisterProps = React.ComponentPropsWithoutRef<'div'>;

export const Register: NextPage<RegisterProps> = ({ ...props }) => {
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
        <div className={cn('flex flex-col items-center')} {...props}>
            <RegisterDialog onRegisterSuccess={handleRegisterSuccess} />
            {showSuccessAlert && (
                <Alert style={{ backgroundColor: 'lightgreen' }}>
                    <CheckCircle className={cn('h-4 w-4 text-green-500')} />
                    <AlertTitle>Registration Successful!</AlertTitle>
                    <AlertDescription>
                        You have successfully registered. You can now log in.
                    </AlertDescription>
                </Alert>
            )}
            {showFailureAlert && (
                <Alert style={{ backgroundColor: 'lightcoral' }}>
                    <XCircle className="h-4 w-4 text-red-500" />
                    <AlertTitle>Registration Failed!</AlertTitle>
                    <AlertDescription>
                        The registration attempt was unsuccessful. Please try
                        again.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
};

export default Register;
