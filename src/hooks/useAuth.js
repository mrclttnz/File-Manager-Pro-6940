import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));

export const useAuth = () => {
  const { isAuthenticated, user, login, logout } = useAuthStore();
  
  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
};