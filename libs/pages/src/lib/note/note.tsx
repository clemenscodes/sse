import { Note, Redirect, ScrollArea } from '@components';
import { cn } from '@styles';
import type { NotePageProps } from '@types';
import { useSessionStore } from '@utils';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Error from '../error/error';

export const NotePage: NextPage<NotePageProps> = ({ note, ...props }) => {
    const session = useSessionStore((state) => state.session);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    if (!session) {
        return <Redirect href={'/login'} />;
    }

    if (!note) {
        return <Error error={'Note not found'} />;
    }

    return (
        <div
            className={cn(
                'flex flex-col w-full h-[36rem] my-12 border rounded'
            )}
            {...props}
        >
            <ScrollArea className={cn('h-full')}>
                <Note
                    className={cn('m-4 break-words rounded p-4')}
                    content={note.content}
                />
            </ScrollArea>
        </div>
    );
};

export default NotePage;
