import { cn } from '@styles';
import { IconLogout2, IconNote, IconUserCog, IconBook } from '@tabler/icons-react';
import { post, useSessionStore } from '@utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Search from '../search/search';
import { toast } from '../toast/useToast';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../tooltip/tooltip';

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

    const clearState = () => {
        useSessionStore.setState((state) => {
            return {
                ...state,
                session: null,
                jwt: null,
            };
        });
        localStorage.clear();
        toast({
            title: 'Successfully logged out',
            description: `Goodbye, ${session?.username}`,
        });
        router.push('/');
    };

    const onLogout = async () => {
        const { status, error } = await post('/auth/logout');
        if (status === 204) {
            return clearState();
        }
        if (!error) {
            return toast({
                title: 'Failed logging out',
                description: 'Check the developer tools for errors',
                variant: 'destructive',
            });
        }
        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data &&
            error.response.data.message &&
            error.response.data.message === 'Sessions expired'
        ) {
            return clearState();
        }
        clearState();
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
                <Link
                    href={session ? '/note' : '/'}
                    className={cn('text-gray-300 hover:text-white')}
                >
                    <div className={cn('text-2xl font-bold')}>Notes</div>
                </Link>

                <nav className={cn('flex items-center space-x-16')}>
                    {session && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Search />
                                </TooltipTrigger>
                                <TooltipContent side={'bottom'}>
                                    Search for notes. Press Ctrl + k to trigger
                                    automatically. Command + k on Mac.
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    {session && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link
                                        href={'/note'}
                                        className={cn(
                                            'text-gray-300 hover:text-white'
                                        )}
                                    >
                                        <IconNote />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent align={'end'} side={'bottom'}>
                                    Create a new note
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    {session && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link
                                        href={'/mynotes'}
                                        className={cn(
                                            'text-gray-300 hover:text-white'
                                        )}
                                    >
                                        <IconBook />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent align={'end'} side={'bottom'}>
                                    View my notes
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    {session && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <IconUserCog
                                        className={cn(
                                            'text-gray-300 hover:cursor-pointer hover:text-white'
                                        )}
                                    />
                                </TooltipTrigger>
                                <TooltipContent align={'end'} side={'bottom'}>
                                    Logged in as {session.username}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    {session && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <IconLogout2
                                        className={cn(
                                            'text-gray-300 hover:cursor-pointer hover:text-white'
                                        )}
                                        onClick={onLogout}
                                    />
                                </TooltipTrigger>
                                <TooltipContent side={'right'} sideOffset={-50}>
                                    <button onClick={onLogout}>Logout</button>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
