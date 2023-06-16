import { UserSession } from '@types';
import { createStore } from 'zustand';

type SessionStore = {
    user: UserSession | null;
    setUser: (user: UserSession | null) => void;
};

export const useSessionStore = createStore<SessionStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));
