import { cn } from '@styles';

/* eslint-disable-next-line */
export interface LoginDialogProps {}

export const LoginDialog: React.FC<LoginDialogProps> = ({ ...props }) => {
    return (
        <div className={cn()} {...props}>
            <h1>Welcome to LoginDialog!</h1>
        </div>
    );
};

export default LoginDialog;
