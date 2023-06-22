import { Note, Redirect, ScrollArea, Video } from '@components';
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
        <div className="flex flex-col items-center justify-between lg:flex-row space-x-16">
            <div
                className={cn(
                    'flex flex-col lg:h-[36rem] w-full my-12 border rounded',
                    note.attachment?.videoId && 'lg:w-1/2'
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
            {note.attachment?.videoId && (
                <div className="flex lg:h-96 aspect-video">
                    <Video
                        videoId={note.attachment.videoId}
                        className={cn('w-full h-full')}
                    />
                </div>
            )}
        </div>
    );
};

export default NotePage;
