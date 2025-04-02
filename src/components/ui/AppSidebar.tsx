"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { Calendar, Home, Inbox, LogOut, Menu, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth } from "@/Services/firebaseConfig";

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Cookies.remove("session");
      Cookies.remove("userToken");
      router.replace("/login");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  const items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Inbox", url: "#", icon: Inbox },
    { title: "Calendar", url: "#", icon: Calendar },
    { title: "Search", url: "#", icon: Search },
  ];

  return (
    <div
      className={`bg-gray-200 min-h-screen transition-all duration-300 ${
        isOpen ? "w-64 px-4 border-r" : "w-16 px-2"
      }`}
    >
      <Sidebar className={`h-full ${!isOpen && "border-none"}`}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Botão de alternância - Sempre visível dentro da sidebar */}
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setIsOpen(!isOpen)}>
                    <Menu />
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Itens do menu */}
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon />
                        <span
                          className={`transition-opacity duration-300 ${
                            isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                          } overflow-hidden whitespace-nowrap`}
                        >
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                {/* Botão de Logout */}
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleLogout}>
                    <LogOut />
                    <span
                      className={`transition-opacity duration-300 ${
                        isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                      } overflow-hidden whitespace-nowrap`}
                    >
                      Sair
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
