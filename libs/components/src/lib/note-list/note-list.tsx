import { cn } from '@styles';
import { CreatedNote } from '@types';
import NoteListItem from '../note-list-item/note-list-item';

export type NoteListProps = React.ComponentPropsWithoutRef<'ul'> & {
    notes: CreatedNote[];
};

export const NoteList: React.FC<NoteListProps> = ({ notes, ...props }) => {
    return (
        <ul className={cn('flex w-full flex-wrap justify-evenly')} {...props}>
            {notes.map((note, index) => (
                <NoteListItem note={note} key={index} />
            ))}
        </ul>
    );
};

export default NoteList;
