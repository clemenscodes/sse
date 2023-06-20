import { cn } from '@styles';

/* eslint-disable-next-line */
export interface NoteFormProps {}

export const NoteForm: React.FC<NoteFormProps> = ({ ...props }) => {
    return (
        <div className={cn()} {...props}>
            <h1>Welcome to NoteForm!</h1>
        </div>
    );
};

export default NoteForm;
