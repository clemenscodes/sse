import { cn } from '@styles';
import { post, useSessionStore } from '@utils';
import Link from 'next/link';
import { Button } from '../button/button';

/* eslint-disable-next-line */
export interface HeaderProps extends React.ComponentPropsWithoutRef<'header'> {}

export const Header: React.FC<HeaderProps> = ({ ...props }) => {
    const session = useSessionStore((state) => state.session);

    const onSignout = async () => {
        const { status } = await post('/auth/logout');

        if (status === 204) {
            useSessionStore.setState((state) => {
                return {
                    ...state,
                    session: null,
                    jwt: null,
                };
            });
        }
    };

    return (
        <header className={cn('bg-gray-800 text-white')} {...props}>
            <div
                className={cn(
                    'container mx-auto flex items-center justify-between p-4'
                )}
            >
                <div className={cn('text-2xl font-bold')}>Notes</div>
                <nav className={cn('space-x-4')}>
                    <Link
                        href='/'
                        className={cn('text-gray-300 hover:text-white')}
                    >
                        Home
                    </Link>
                    {session && (
                        <>
                            <span>{session.username}</span>
                            <Button onClick={onSignout}>Logout</Button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
