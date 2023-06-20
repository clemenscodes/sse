import { CreatedNote } from '../createdNote';

export type NotePageProps = React.ComponentPropsWithoutRef<'div'> & {
    note: CreatedNote | null;
};
