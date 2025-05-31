"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/Login" || pathname === "/Sign-Up";

  const setUserFromToken = useAuthStore((state) => state.setUserFromToken);
  useEffect(() => {
    setUserFromToken(); // Llama esto desde layout o App para popular el store
  }, []);

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
