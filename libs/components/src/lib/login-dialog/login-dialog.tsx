import { cn } from '@styles';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Label } from '../label/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../dialog/dialog';
import Login from '../login/login';

/* eslint-disable-next-line */
export interface LoginDialogProps { }

export const LoginDialog: React.FC<LoginDialogProps> = ({ ...props }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription>
                        Enter your Username and Password
                    </DialogDescription>
                </DialogHeader>
                <Login></Login>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
