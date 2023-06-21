import { NoteList, Redirect, toast } from '@components';
import { cn } from '@styles';
import { CreatedNote } from '@types';
import { get, useNotesStore, useSessionStore } from '@utils';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

export type MynotesProps = React.ComponentPropsWithoutRef<'div'>;

export const Mynotes: NextPage<MynotesProps> = ({ ...props }) => {
    const setNotes = useNotesStore((state) => state.setNotes);
    const notes = useNotesStore((state) => state.notes);
    const session = useSessionStore((state) => state.session);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (session && hasMounted) {
            const fetchNotes = async () => {
                const url = `/note/user`;
                const { data, status } = await get<CreatedNote[]>(url);
                if (status !== 200) {
                    toast({
                        title: 'Failed loading your Notes',
                        variant: 'destructive',
                    });
                    return;
                }
                if (data != null) {
                    setNotes(data);
                }
            };
            fetchNotes();
        }
    }, [session, hasMounted, setNotes]);

    if (!hasMounted) {
        return null;
    }

    if (!session) {
        return <Redirect href={'/login'} />;
    }

    return (
        <div
            className={cn('flex flex-col mb-12 items-center justify-center')}
            {...props}
        >
            <h1 className={cn('text-xl')}>My Notes:</h1>
            {notes?.length ? (
                <NoteList notes={notes} />
            ) : (
                <p className={cn()}>No notes found</p>
            )}
        </div>
    );
};

export default Mynotes;
