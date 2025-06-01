"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login" || pathname === "/sign-up";

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
