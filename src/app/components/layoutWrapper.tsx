'use client'

import { AppSidebar } from "@/components/ui/AppSidebar";


export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full">
      <AppSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
