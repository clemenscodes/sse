import { cn } from '@styles';
import { useSessionStore } from '@utils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export type NoteProps = React.ComponentPropsWithoutRef<'div'>;

export const Note: NextPage<NoteProps> = ({ ...props }) => {
    const router = useRouter();
    const session = useSessionStore((state) => state.session);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (hasMounted && !session) {
            router.push('/login');
        }
    }, [hasMounted, router, session]);

    if (!hasMounted || !session) {
        return null;
    }

    return (
        <div className={cn('flex flex-col items-center')} {...props}>
            <h1>Start creating notes :)</h1>
        </div>
    );
};

export default Note;
