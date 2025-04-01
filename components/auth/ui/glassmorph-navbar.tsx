"use client";

import { Button } from "@/components/ui/button";
import { LayoutGrid, Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const navigationItems = [
  {
    title: "Traffic Light",
    href: "/traffic-light",
    items: [],
  },
  {
    title: "Snake Game",
    href: "/snake-game",
    items: [],
  },
  {
    title: "Memory Game",
    href: "/memory-game",
    items: [],
  },
];

export default function GlassmorphNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" fixed left-1/2 top-0 z-50 mt-7 flex w-11/12 max-w-7xl -translate-x-1/2 flex-col items-center rounded-full bg-background/20 p-3 backdrop-blur-lg md:rounded-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/images/orcdev.png"
              alt="Orc Dev"
              width={50}
              height={50}
            />
          </Link>

          <div className="hidden gap-4 md:flex">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <Button variant="ghost" size="icon">
            <LayoutGrid className="size-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="size-4" />
          </Button>
        </div>

        <div className="md:hidden">
          <Button onClick={() => setIsOpen(!isOpen)}>
            <Menu className="size-4" />
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col items-center justify-center gap-3 px-5 py-3 md:hidden">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
