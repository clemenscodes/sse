import { Attachment, Note as PrismaNote } from '@prisma/api';
import { cn } from '@styles';
import {
    checkYouTubeVideoId,
    sanitizeInput,
    usePreviewStore,
    youtubeSchema,
} from '@utils';
import { useEffect, useState } from 'react';
import Note from '../note/note';
import { ScrollArea } from '../scroll-area/scroll-area';
import Video from '../video/video';

export type PreviewProps = React.ComponentPropsWithoutRef<'div'>;

export const Preview: React.FC<PreviewProps> = ({ className, ...props }) => {
    const preview = usePreviewStore((state) => state.preview);
    const attachment = usePreviewStore((state) => state.attachment);
    const [content, setContent] = useState<PrismaNote['content']>('');
    const [videoId, setVideoId] = useState<Attachment['videoId']>('');

    useEffect(() => {
        (async () => {
            if (preview) {
                const clean = await sanitizeInput(preview);
                setContent(clean);
            }
            if (attachment) {
                try {
                    const videoId = youtubeSchema.parse(attachment);
                    const isValidVideoId = await checkYouTubeVideoId(videoId);
                    if (isValidVideoId) {
                        return setVideoId(videoId);
                    }
                    setVideoId('');
                } catch (e) {
                    setVideoId('');
                }
            }
        })();
    }, [attachment, preview]);

    return (
        <div
            className={cn(
                'flex w-full flex-col items-center justify-start',
                className || ''
            )}
            {...props}
        >
            <h1 className={cn('text-xl font-bold')}>Preview</h1>
            <div className={cn('flex h-[28rem] w-full rounded-md border')}>
                <ScrollArea className={cn('h-full w-full')}>
                    <Note content={content} className={cn('p-4')} />
                </ScrollArea>
            </div>
            {videoId && (
                <div className={cn('m-12 aspect-video')}>
                    <Video videoId={videoId} />
                </div>
            )}
        </div>
    );
};

export default Preview;
