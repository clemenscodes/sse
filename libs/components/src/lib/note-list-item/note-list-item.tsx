import { cn } from '@styles';
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
            className={cn('m-4 w-full rounded-md border shadow md:w-2/5')}
            {...props}
        >
            <Link
                href={`/note/${note.id}`}
                className={cn('hover:cursor-pointer')}
            >
                <ScrollArea className={cn('h-96 p-4')}>
                    <Note content={note.content} />
                </ScrollArea>
            </Link>
        </li>
    );
};

export default NoteListItem;
