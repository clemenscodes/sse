import { useState } from 'react';
import { Button } from '../button/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../dialog/dialog';
import Register from '../registration/registration';

/* eslint-disable-next-line */
export interface RegisterDialogProps {
    onRegisterSuccess?: (success: boolean) => void;
}

export const RegisterDialog: React.FC<RegisterDialogProps> = ({
    onRegisterSuccess,
    ...props
}) => {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <div>
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogTrigger asChild>
                    <Button
                        variant='outline'
                        onClick={() => setShowDialog(true)}
                    >
                        Register
                    </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>Register</DialogTitle>
                        <DialogDescription>
                            Enter all the relevant Information.
                        </DialogDescription>
                    </DialogHeader>
                    <Register
                        onRegisterSuccess={(success) => {
                            setShowDialog(false);
                            if (onRegisterSuccess) {
                                onRegisterSuccess(success);
                            }
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default RegisterDialog;
