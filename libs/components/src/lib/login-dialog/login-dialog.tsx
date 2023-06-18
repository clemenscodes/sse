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
import Login from '../login/login';

export interface LoginDialogProps {
    onLoginSuccess?: (success: boolean) => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({
    onLoginSuccess,
    ...props
}) => {
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
                <Login
                    onLoginSuccess={(success) => {
                        setShowDialog(false);
                        if (onLoginSuccess) {
                            onLoginSuccess(success);
                        }
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
