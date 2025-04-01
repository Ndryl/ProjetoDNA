import React from "react";

interface ButtonInterface {
  color?: string;
  foto?: React.ReactNode;
  conteudo?: string; // Texto do botão (opcional)
  onClick?: () => void; // Adicione esta linha
}

export default function Button({
  foto,
  conteudo,
  color,
  onClick,
}: ButtonInterface) {
  return (
    <button
      className={`bg-white hover:bg-zinc-100 text-black font-bold py-2 px-4 rounded flex justify-center items-center gap-2 border border-gray-300`}
      type="button"
      onClick={onClick}
    >
      {foto ? foto : ""}
      <span>{conteudo}</span>
    </button>
  );
}
