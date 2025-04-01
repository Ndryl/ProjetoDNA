"use client";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/registro";

  return (
    <div
      className={`min-h-screen flex w-full flex-1 ${
        isAuthPage ? "items-center justify-center" : ""
      }`}
    >
      {!isAuthPage ? (
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full flex flex-1">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      ) : (
        <main className="h-screen flex items-center justify-center w-full">
          {children}
        </main>
      )}
    </div>
  );
}
