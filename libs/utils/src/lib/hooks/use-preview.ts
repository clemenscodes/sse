import { Note } from '@prisma/api';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type PreviewStore = {
    preview: Note['content'] | null;
    setPreview: (preview: Note['content']) => void;
};

export const usePreviewStore = create<PreviewStore>()(
    devtools(
        persist(
            (set) => ({
                preview: null,
                setPreview: (preview) =>
                    set((state) => ({ ...state, preview })),
            }),
            {
                name: 'preview-store',
            }
        ),
        { enabled: process.env['NODE_ENV'] === 'development' }
    )
);
