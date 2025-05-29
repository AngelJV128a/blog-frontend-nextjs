import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,          // Aquí guardaremos { id, name }
  setUser: (user) => set({ user }),  // Para guardar usuario
  clearUser: () => set({ user: null })  // Para limpiar usuario
}));
