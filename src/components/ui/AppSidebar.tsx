"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { Calendar, Home, Inbox, LogOut, Menu, Search } from "lucide-react";
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
      className={`bg-[#FFFFFF] min-h-screen transition-all duration-300 overflow-hidden border-r ${
        isOpen ? "w-64 px-4" : "w-16 px-2 max-w-[4rem]"
      }`}
    >
      <div className="h-full flex flex-col">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          <Menu />
        </button>
        <nav className="flex flex-col gap-2 mt-4">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.url}
              className="flex items-center gap-2 p-2"
            >
              <item.icon />
              <span
                className={`transition-opacity duration-300 overflow-hidden whitespace-nowrap ${
                  isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                }`}
              >
                {item.title}
              </span>
            </a>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="p-2 mt-auto flex items-center gap-2"
        >
          <LogOut />
          <span
            className={`transition-opacity duration-300 overflow-hidden whitespace-nowrap ${
              isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
            }`}
          >
            Sair
          </span>
        </button>
      </div>
    </div>
  );
}
