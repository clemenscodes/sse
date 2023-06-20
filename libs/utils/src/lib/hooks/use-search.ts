import { CreatedNote } from '@types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { SearchSchema } from '../models/searchSchema';

export type SearchStore = {
    search: SearchSchema['search'] | null;
    result: CreatedNote[] | null;
    setSearch: (search: SearchSchema['search']) => void;
    setResult: (result: CreatedNote[]) => void;
};

export const useSearchStore = create<SearchStore>()(
    devtools(
        persist(
            (set) => ({
                search: null,
                result: null,
                setSearch: (search) => set((state) => ({ ...state, search })),
                setResult: (result) => set((state) => ({ ...state, result })),
            }),
            {
                name: 'search-store',
            }
        )
    )
);
