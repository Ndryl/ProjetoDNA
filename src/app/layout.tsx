"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import LayoutWrapper from "./components/layoutWrapper";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter()
  const isAuthPage = pathname === "/login" || pathname === "/register";
  

  

  return (
    <html lang="en">
      <body className="w-full h-full">
        <AuthProvider>
          {isAuthPage ? (
            children // Não mostra sidebar no login ou registro
          ) : (
            <SidebarProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </SidebarProvider>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
