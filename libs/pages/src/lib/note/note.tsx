import { cn } from '@styles';
import { NextPage } from 'next';

export type NoteProps = React.ComponentPropsWithoutRef<'div'>;

export const Note: NextPage<NoteProps> = ({ ...props }) => {
    return (
        <div className={cn('flex flex-col items-center')} {...props}>
            <h1>Start creating notes :)</h1>
        </div>
    );
};

export default Note;
