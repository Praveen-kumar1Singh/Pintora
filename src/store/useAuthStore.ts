import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isAuthModalOpen: boolean;
  login: (userData: User) => void;
  logout: () => void;
  setAuthModalOpen: (isOpen: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      isAuthModalOpen: false,
      login: (userData) => set({ isAuthenticated: true, user: userData, isAuthModalOpen: false }),
      logout: () => set({ isAuthenticated: false, user: null }),
      setAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),
    }),
    {
      name: 'printora-auth-storage',
    }
  )
);
