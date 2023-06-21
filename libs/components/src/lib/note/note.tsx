import { cn } from '@styles';

export type NoteProps = React.ComponentPropsWithoutRef<'div'> & {
    content: string;
};

export const Note: React.FC<NoteProps> = ({ content, className, ...props }) => {
    return (
        <div
            className={cn(className, 'prose max-w-none break-all')}
            dangerouslySetInnerHTML={{ __html: content }}
            {...props}
        />
    );
};

export default Note;
