import { cn } from '@styles';

/* eslint-disable-next-line */
export interface HeaderProps extends React.ComponentPropsWithoutRef<'header'> {}

export const Header: React.FC<HeaderProps> = ({ ...props }) => {
    return (
        <header className={cn()} {...props}>
            <h1>Welcome to Header!</h1>
        </header>
    );
};

export default Header;
