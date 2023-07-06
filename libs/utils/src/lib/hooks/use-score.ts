import type { Score } from '@zxcvbn-ts/core';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type ScoreStore = {
    score: Score;
    setScore: (score: Score) => void;
};

export const useScoreStore = create<ScoreStore>()(
    devtools(
        persist(
            (set) => ({
                score: 0,
                setScore: (score) => set((state) => ({ ...state, score })),
            }),
            {
                name: 'score-store',
            }
        )
    )
);
