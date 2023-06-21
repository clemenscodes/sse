import { useEffect } from 'react';
import { get, useNotesStore } from '@utils';
import { cn } from '@styles';
import { NextPage } from 'next';
import { CreatedNote } from '@types';
import { toast } from 'libs/components/src/lib/toast/useToast';
import { NoteList } from '@components';


export type MynotesProps = React.ComponentPropsWithoutRef<'div'>;

export const Mynotes: NextPage<MynotesProps> = ({ ...props }) => {
    const setNotes = useNotesStore((state) => state.setNotes);
    const notes = useNotesStore((state) => state.notes);

    useEffect(() => {
        const fetchNotes = async () => {
            const url = `note/user`
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
        }
        fetchNotes();
    }, [setNotes]);

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
