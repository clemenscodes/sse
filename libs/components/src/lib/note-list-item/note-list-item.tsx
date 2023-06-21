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
            className={cn('m-4 p-4 w-full md:w-2/5 bg-gray-100 hover:bg-gray-200 rounded-md border shadow transition-colors duration-200 ease-in-out')}
            {...props}
        >
            <Link
                href={`/note/${note.id}`}
                className={cn('hover:cursor-pointer')}
            >
                <ScrollArea className={cn('h-96 p-4')}>
                    <Note content={note.content} className={cn('text-lg font-medium text-gray-800')} />
                </ScrollArea>
            </Link>
        </li>
    );
};

export default NoteListItem;
