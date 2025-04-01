"use client";

import CardsDeashBoard from "./components/Cards";
import { GrathText } from "../../../../components/auth/ui/Graphs/graphText";
import ColumnGroupingTable from "../../../../components/auth/ui/Tables/tableDeashBoard";
import GraphBar from "../../../../components/auth/ui/Graphs/grathBar";
import {
  PackageCheck,
  PackageMinus,
  PackageOpen,
  PackageX,
} from "lucide-react";

const arrayTitle = [
  "Produtos Em Uso",
  "Produtos em Estoque",
  "Produtos obstruidos",
  "Produtos Perto de Esgotar",
];
const arrayImage = [
  <PackageOpen className="w-10 h-10" />,
  <PackageCheck className="w-10 h-10" />,
  <PackageX className="w-10 h-10" />,
  <PackageMinus className="w-10 h-10" />,
];
const valor = ["1250", "300", "150", "50"];

export default function Logado() {
  // Cria as células dinamicamente (agora 4 cards)
  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < 4; i++) {
      // Alterado de 3 para 4
      cells.push(
        <div
          key={i}
          className={`col-span-1 row-span-1  rounded-2xl`} // Mantido col-span-1 para cada card
        >
          <CardsDeashBoard
            image={arrayImage[i]}
            title={arrayTitle[i]}
            qtd={valor[i]}
          />
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="grid grid-cols-5 grid-rows-6 rounded-md overflow-hidden h-screen gap-2 p-2">
      <div className="col-span-1 row-span-3  rounded-2xl overflow-hidden">
        <img
          src="/HomeImage.png"
          alt="Home"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="col-start-3 col-end-3 row-start-2 row-end-6  rounded-2xl overflow-hidden">
        <GrathText />
      </div>
      <div className="col-start-4 col-end-6 row-start-2 row-end-7  rounded-2xl overflow-hidden">
        <ColumnGroupingTable />
      </div>
      <div className="col-start-1 col-end-3 row-start-4 row-end-7   rounded-2xl overflow-hidden">
        <GraphBar />
      </div>
      {renderCells()}
    </div>
  );
}
