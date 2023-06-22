import { NoteForm, Preview, Redirect } from '@components';
import { cn } from '@styles';
import { usePreviewStore, useSessionStore } from '@utils';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

export type CreateNoteProps = React.ComponentPropsWithoutRef<'div'>;

export const CreateNote: NextPage<CreateNoteProps> = ({ ...props }) => {
    const session = useSessionStore((state) => state.session);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        usePreviewStore.setState((state) => {
            return {
                ...state,
                preview: null,
                attachment: null,
            };
        });
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
            <h1 className={cn('text-2xl font-semibold')}>
                Write notes using HTML or even Markdown
            </h1>
            <div className="flex w-full">
                <NoteForm className={'w-1/2'} />
                <Preview className={'w-1/2'} />
            </div>
        </div>
    );
};

export default CreateNote;
