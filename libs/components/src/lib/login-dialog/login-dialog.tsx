import { cn } from '@styles';
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
import LoginForm from '../login-form/login-form';

export type LoginDialogProps = React.ComponentPropsWithoutRef<'div'>;

export const LoginDialog: React.FC<LoginDialogProps> = ({ ...props }) => {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog} {...props}>
            <DialogTrigger asChild>
                <Button variant='outline' onClick={() => setShowDialog(true)}>
                    Login
                </Button>
            </DialogTrigger>
            <DialogContent className={cn('sm:max-w-sm')}>
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription>
                        Enter your username and password
                    </DialogDescription>
                </DialogHeader>
                <LoginForm />
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
