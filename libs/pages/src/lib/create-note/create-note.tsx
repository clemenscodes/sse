import { NoteForm, Redirect } from '@components';
import { cn } from '@styles';
import { useSessionStore } from '@utils';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

export type CreateNoteProps = React.ComponentPropsWithoutRef<'div'>;

export const CreateNote: NextPage<CreateNoteProps> = ({ ...props }) => {
    const session = useSessionStore((state) => state.session);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    if (!session) {
        return <Redirect href={'/login'} />;
    }

    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center w-full h-full'
            )}
            {...props}
        >
            <h1 className={cn('text-lg')}>
                Write notes using HTML or even Markdown
            </h1>
            <NoteForm />
        </div>
    );
};

export default CreateNote;
