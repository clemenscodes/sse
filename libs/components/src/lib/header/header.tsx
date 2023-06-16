import { cn } from '@styles';

/* eslint-disable-next-line */
export interface HeaderProps extends React.ComponentPropsWithoutRef<'header'> {}

export const Header: React.FC<HeaderProps> = ({ ...props }) => {
    return (
        <header className={cn('bg-gray-800 text-white')} {...props}>
            <div
                className={cn(
                    'container mx-auto flex items-center justify-between p-4'
                )}
            >
                <div className={cn('text-2xl font-bold')}>Notes</div>
                <nav className={cn('space-x-4')}>
                    <a
                        href='#'
                        className={cn('text-gray-300 hover:text-white')}
                    >
                        Home
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
