import { cn } from '@styles';
import { IconPaperclip } from '@tabler/icons-react';
import { CreatedNote } from '@types';
import Link from 'next/link';
import Note from '../note/note';
import { ScrollArea } from '../scroll-area/scroll-area';

export type NoteListItemProps = React.ComponentPropsWithoutRef<'li'> & {
    note: CreatedNote;
};

export const NoteListItem: React.FC<NoteListItemProps> = ({
    note,
    ...props
}) => {
    return (
        <li
            className={cn(
                'relative m-4 w-full rounded-md border bg-gray-100 p-4 shadow transition-colors duration-200 ease-in-out hover:bg-gray-200 md:w-2/5'
            )}
            {...props}
        >
            <Link
                href={`/note/${note.id}`}
                className={cn('hover:cursor-pointer')}
            >
                {note.attachment?.videoId && (
                    <IconPaperclip className={cn('absolute -right-8')} />
                )}
                <ScrollArea className={cn('h-96 p-4')}>
                    <Note
                        content={note.content}
                        className={cn('text-lg font-medium text-gray-800')}
                    />
                </ScrollArea>
            </Link>
        </li>
    );
};

export default NoteListItem;
