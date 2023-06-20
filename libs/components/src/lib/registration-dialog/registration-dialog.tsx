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

export type RegisterDialogProps = React.ComponentPropsWithoutRef<'div'>;

export const RegisterDialog: React.FC<RegisterDialogProps> = ({ ...props }) => {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog} {...props}>
            <DialogTrigger asChild>
                <Button variant='outline' onClick={() => setShowDialog(true)}>
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
                <Register />
            </DialogContent>
        </Dialog>
    );
};

export default RegisterDialog;
