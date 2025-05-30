"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import Cookies from "js-cookie";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/Login" || pathname === "/Sign-Up";

  const setUser = useUserStore((state) => state.setUser);
  const setUserFromToken = useAuthStore((state) => state.setUserFromToken);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = Cookies.get("token");

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Guardamos sólo id y name en el store
        const data = res.data;
        setUser({ id: data.id, name: data.name });
        console.log("Usuario cargado:", data);
      } catch (error) {
        console.error(
          "Error cargando usuario",
          error.response?.status || error.message
        );
      }
    }

    fetchUser();
  }, [setUser]);

  useEffect(() => {
    setUserFromToken();
  }, []);

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
