"use client";

import { auth } from "@/Services/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import CardsDeashBoard from "./components/Cards";

export default function Logado() {
  // Cria as células dinamicamente (agora 4 cards)
  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < 4; i++) {
      // Alterado de 3 para 4
      cells.push(
        <div
          key={i}
          className={`col-span-1 row-span-1 border border-gray-300 rounded-2xl`} // Mantido col-span-1 para cada card
        >
          <CardsDeashBoard />
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="grid grid-cols-5 grid-rows-6 border border-gray-400 rounded-md overflow-hidden min-h-screen gap-2 p-2">
      {/* Div com imagem ocupando 1 coluna e 3 linhas */}
      <div className="col-span-1 row-span-3 border border-gray-300 rounded-2xl overflow-hidden">
        <img
          src="/HomeImage.png"
          alt="Home"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Renderiza as células (4 cards) */}
      {renderCells()}
    </div>
  );
}
