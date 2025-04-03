interface Card {
  title: string;
  qtd: number;
  color: string;
}

interface OverAllInventoryProps {
  Title?: string;
  Cards?: Card[];
}

const dataMock: Card[] = [
  { title: "Produtos Totais", qtd: 14, color: "#1570EF" },
  { title: "Produtos Ativos", qtd: 14, color: "#E19133" },
  { title: "Produtos Estoque", qtd: 14, color: "#845EBC" },
  { title: "Pouco no Estoque", qtd: 12, color: "#F36960" },
];

export default function OverAllInventory({
  Cards = dataMock,
  Title = "Resumo do Estoque",
}: OverAllInventoryProps) {
  return (
    <div className="container mx-auto px-4 bg-white gap-4 p-4 rounded-xl my-5 overflow-hidden  ">
      <h2 className="text-lg font-semibold text-black">{Title}</h2>
      <div className="grid grid-cols-4  text-black">
        {Cards.map((card, index) => (
          <div
            key={index}
            className={`p-4 text-center ${
              index !== 0 ? "border-l border-zinc-200" : ""
            }`}
          >
            <h3
              className="font-semibold text-base leading-6 text-start mb-2"
              style={{ color: card.color }}
            >
              {card.title}
            </h3>
            <p className="text-lg font-bold text-start text-[#5D6679] flex flex-col gap-2">
              {card.qtd}
              <span className="text-xs text-[#858D9D]">
                {index !== 3 ? "Últimos 7 dias" : "Encomendado"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
