import { Note as PrismaNote } from '@prisma/api';
import { cn } from '@styles';
import { sanitizeInput, usePreviewStore } from '@utils';
import { useEffect, useState } from 'react';
import Note from '../note/note';
import { ScrollArea } from '../scroll-area/scroll-area';

export type PreviewProps = React.ComponentPropsWithoutRef<'div'>;

export const Preview: React.FC<PreviewProps> = ({ className, ...props }) => {
    const preview = usePreviewStore((state) => state.preview);
    const [content, setContent] = useState<PrismaNote['content']>('');

    useEffect(() => {
        (async () => {
            if (preview) {
                const clean = await sanitizeInput(preview);
                setContent(clean);
            }
        })();
    }, [preview]);

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
        </div>
    );
};

export default Preview;
