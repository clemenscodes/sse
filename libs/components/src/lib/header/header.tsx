import { cn } from '@styles';
import { post, useSessionStore } from '@utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '../button/button';
import { toast } from '../toast/useToast';

export type HeaderProps = React.ComponentPropsWithoutRef<'header'>;

export const Header: React.FC<HeaderProps> = ({ ...props }) => {
    const session = useSessionStore((state) => state.session);
    const router = useRouter();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

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
            toast({
                title: 'Successfully logged out',
                description: `Goodbye, ${session?.username}`,
            });
            router.push('/');
            return;
        }
        toast({
            title: 'Failed logging out',
            description: 'Check the developer tools for errors',
            variant: 'destructive',
        });
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
                        href={session ? '/note' : '/'}
                        className={cn('text-gray-300 hover:text-white')}
                    >
                        Home
                    </Link>
                    <span>{session?.username || 'Guest'}</span>
                    {session && <Button onClick={onSignout}>Logout</Button>}
                </nav>
            </div>
        </header>
    );
};

export default Header;
