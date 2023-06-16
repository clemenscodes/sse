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
        <div {...props}>
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogTrigger asChild>
                    <Button
                        variant='outline'
                        onClick={() => setShowDialog(true)}
                    >
                        Login
                    </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
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
        </div>
    );
};

export default LoginDialog;
