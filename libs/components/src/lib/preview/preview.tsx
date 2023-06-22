import { Attachment, Note as PrismaNote } from '@prisma/api';
import { cn } from '@styles';
import { get, sanitizeInput, usePreviewStore, youtubeSchema } from '@utils';
import { useEffect, useState } from 'react';
import Note from '../note/note';
import { ScrollArea } from '../scroll-area/scroll-area';
import { toast } from '../toast/useToast';
import Video from '../video/video';

export type PreviewProps = React.ComponentPropsWithoutRef<'div'>;

export const Preview: React.FC<PreviewProps> = ({ className, ...props }) => {
    const preview = usePreviewStore((state) => state.preview);
    const attachment = usePreviewStore((state) => state.attachment);
    const videoId = usePreviewStore((state) => state.videoId);
    const setVideoId = usePreviewStore((state) => state.setVideoId);
    const [content, setContent] = useState<PrismaNote['content']>('');
    const [oldPreview, setOldPreview] = useState<PrismaNote['content'] | null>(
        attachment
    );
    const [oldAttachment, setOldAttachment] = useState<
        Attachment['videoId'] | null
    >(attachment);

    useEffect(() => {
        (async () => {
            if (preview && preview && oldPreview) {
                setOldPreview(preview);
                const clean = await sanitizeInput(preview);
                setContent(clean);
            }
            if (attachment && attachment !== oldAttachment) {
                setOldAttachment(attachment);
                try {
                    const videoId = youtubeSchema.parse(attachment);
                    const url = `/note/validate/${videoId}`;
                    const { status, error } = await get(url);
                    if (status === 200) {
                        toast({ title: 'Successfully attached YouTube video' });
                        return setVideoId(videoId);
                    }
                    if (
                        error &&
                        error.response &&
                        error.response.status === 429
                    ) {
                        toast({
                            title: 'Too many requests!',
                            description:
                                'Connection throttled. Slow down. Try again in a minute.',
                            variant: 'destructive',
                        });
                        return;
                    }
                    toast({
                        title: 'Failed to attach YouTube video',
                        description: 'The entered video id is not valid.',
                        variant: 'destructive',
                    });
                    setVideoId('');
                } catch (e) {
                    setVideoId('');
                    toast({
                        title: 'Failed to attach YouTube video',
                        description: 'The entered video id is not valid.',
                        variant: 'destructive',
                    });
                }
            }
        })();
    }, [attachment, oldAttachment, oldPreview, preview, setVideoId]);

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
                <div className={cn('m-6 aspect-video')}>
                    <Video videoId={videoId} />
                </div>
            )}
        </div>
    );
};

export default Preview;
