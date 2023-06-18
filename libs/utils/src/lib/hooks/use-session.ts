import { UserSession } from '@types';
import { create } from 'zustand';

export type SessionStore = {
    session: UserSession | null;
    jwt: string | null;
    setSession: (user: UserSession | null) => void;
    setJwt: (jwt: string | null) => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
    session: null,
    jwt: null,
    setSession: (session) => set({ session }),
    setJwt: (jwt) => set({ jwt }),
}));
