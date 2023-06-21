import { CreatedNote } from '@types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type NotesStore = {
    notes: CreatedNote[] | null;
    setNotes: (notes: CreatedNote[]) => void;
};

export const useNotesStore = create<NotesStore>()(
    devtools(
        persist(
            (set) => ({
                notes: null,
                setNotes: (notes) => set((state) => ({ ...state, notes })),
            }),
            {
                name: 'notes-store',
            }
        )
    )
);
