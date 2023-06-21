import type { Score } from '@zxcvbn-ts/core';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type ScoreStore = {
    score: Score | null;
    setScore: (score: Score) => void;
};

export const useScoreStore = create<ScoreStore>()(
    devtools(
        persist(
            (set) => ({
                score: null,
                setScore: (score) => set((state) => ({ ...state, score })),
            }),
            {
                name: 'score-store',
            }
        ),
        { enabled: process.env['NODE_ENV'] === 'development' }
    )
);
