import { CreatedNote } from '../createdNote';

export type SearchProps = React.ComponentPropsWithoutRef<'div'> & {
    search?: string;
    result?: CreatedNote[] | null;
};
