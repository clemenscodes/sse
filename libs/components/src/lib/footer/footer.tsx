import { cn } from '@styles';

/* eslint-disable-next-line */
export interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({ ...props }) => {
    return (
        <div className={cn()} {...props}>
            <h1>Welcome to Footer!</h1>
        </div>
    );
};

export default Footer;
