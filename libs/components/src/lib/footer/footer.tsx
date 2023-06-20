import { cn } from '@styles';

/* eslint-disable-next-line */
export interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({ ...props }) => {
    return (
        <footer
            className={cn(
                'mx-auto flex w-full flex-col items-start justify-between bg-gray-800 p-4 text-white'
            )}
            {...props}
        >
            <div>© 2023 Notes. SSE.</div>
        </footer>
    );
};

export default Footer;
