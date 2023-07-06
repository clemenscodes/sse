import { UserSession } from '@types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type SessionStore = {
    session: UserSession | null;
    jwt: string | null;
    setSession: (user: UserSession | null) => void;
    setJwt: (jwt: string | null) => void;
};

export const useSessionStore = create<SessionStore>()(
    devtools(
        persist(
            (set) => ({
                session: null,
                jwt: null,
                setSession: (session) =>
                    set((state) => ({ ...state, session })),
                setJwt: (jwt) => set((state) => ({ ...state, jwt })),
            }),
            {
                name: 'session-store',
            }
        )
    )
);
