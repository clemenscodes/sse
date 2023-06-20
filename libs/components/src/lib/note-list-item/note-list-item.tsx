import { cn } from '@styles';
import { CreatedNote } from '@types';
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
            <ScrollArea className={cn('h-96 p-4')}>
                <div
                    className={cn('prose')}
                    dangerouslySetInnerHTML={{ __html: note.content }}
                />
            </ScrollArea>
        </li>
    );
};

export default NoteListItem;
