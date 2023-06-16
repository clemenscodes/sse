import { cn } from '@styles';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

export type ErrorProps = React.ComponentPropsWithoutRef<'div'> & {
    error: string;
};

export const Error: NextPage<ErrorProps> = ({ children, error, ...props }) => {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push('/')}
            className={cn(
                'm-0 flex h-screen w-screen cursor-pointer flex-col items-center justify-center p-0'
            )}
            {...props}
        >
            <h1 className={cn('text-9xl')}>{error}</h1>
            {children}
        </div>
    );
};

export default Error;
