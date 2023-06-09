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
export interface RegisterDialogProps {}

export const RegisterDialog: React.FC<RegisterDialogProps> = ({ ...props }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline'>Register</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Register</DialogTitle>
                    <DialogDescription>
                        Enter all the relevant Information.
                    </DialogDescription>
                </DialogHeader>
                <Register></Register>
            </DialogContent>
        </Dialog>
    );
};

export default RegisterDialog;
