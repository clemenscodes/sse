import { Attachment, Note } from '@prisma/api';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type PreviewStore = {
    preview: Note['content'] | null;
    attachment: Attachment['videoId'] | null;
    videoId: Attachment['videoId'] | null;
    setPreview: (preview: Note['content']) => void;
    setAttachment: (attachment: Attachment['videoId']) => void;
    setVideoId: (attachment: Attachment['videoId']) => void;
};

export const usePreviewStore = create<PreviewStore>()(
    devtools(
        persist(
            (set) => ({
                preview: null,
                attachment: null,
                videoId: null,
                setPreview: (preview) =>
                    set((state) => ({ ...state, preview })),
                setAttachment: (attachment) =>
                    set((state) => ({
                        ...state,
                        attachment: attachment ? attachment : null,
                    })),
                setVideoId: (videoId) =>
                    set((state) => ({
                        ...state,
                        videoId: videoId ? videoId : null,
                    })),
            }),
            {
                name: 'preview-store',
            }
        )
    )
);
