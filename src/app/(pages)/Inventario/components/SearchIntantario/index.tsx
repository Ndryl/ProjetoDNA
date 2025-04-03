"use client";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchInventario() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative p-2 rounded-full transition-all duration-200 ${
        isFocused
          ? "bg-gradient-to-r from-purple-500/10 to-purple-500/20 ring-2 ring-purple-500"
          : "border border-zinc-600 hover:bg-zinc-200 hover:border-purple-600"
      }`}
    >
      <div className="flex gap-2 items-center bg-white rounded-full pl-3 pr-4 py-2">
        <Search
          className={`h-5 w-5 ${
            isFocused ? "text-purple-600" : "text-zinc-500"
          }`}
        />
        <input
          type="text"
          className="outline-none w-full bg-transparent placeholder-zinc-400"
          placeholder="Buscar no inventário..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
}
