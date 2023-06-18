import { UserSession } from '@types';
import { create } from 'zustand';

export type SessionStore = {
    session: UserSession | null;
    setSession: (user: UserSession | null) => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
    session: null,
    setSession: (session) => set({ session }),
}));
