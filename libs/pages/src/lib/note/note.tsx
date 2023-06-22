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
        <div className="flex flex-col items-center w-full justify-around lg:flex-row h-full lg:space-x-16 mb-12">
            <div
                className={cn(
                    'flex-1 flex-col w-full h-[36rem] my-12 border rounded'
                )}
                {...props}
            >
                <ScrollArea className={cn('h-[36rem]')}>
                    <Note
                        className={cn('m-4 break-words rounded p-4')}
                        content={note.content}
                    />
                </ScrollArea>
            </div>
            {note.attachment?.videoId && (
                <div className="flex-1 w-3/4 h-[28rem] items-center justify-center">
                    <div className="relative w-full aspect-video">
                        <Video
                            videoId={note.attachment.videoId}
                            className={cn(
                                'absolute top-0 left-0 w-full h-full'
                            )}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotePage;
