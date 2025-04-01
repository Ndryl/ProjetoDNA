// components/NavbarWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { useContext } from "react";
import GlassmorphNavbar from "./glassmorph-navbar";
import AuthContext from "../../../context/AuthContext";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const { logado } = useContext(AuthContext);

  const publicRoutes = ["/login", "/signup"]; // Rotas sem Navbar
  const showNavbar = logado && !publicRoutes.includes(pathname);

  return showNavbar ? <GlassmorphNavbar /> : null;
}
