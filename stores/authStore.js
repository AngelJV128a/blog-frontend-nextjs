// stores/authStore.js
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const useAuthStore = create((set) => ({
  user: null,
  setUserFromToken: () => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      set({ user: decoded });
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  },
  logout: () => {
    Cookies.remove("token"); // Elimina el token de las cookies
    set({ user: null }); // Limpia el estado global
  },
}));
