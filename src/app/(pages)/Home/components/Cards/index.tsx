import { Box } from "lucide-react";

interface CardsProps {
  title: string;
  image: any;
  observation?: string;
  qtd: string;
}

export default function CardsDeashBoard({
  image,
  title,
  observation,
  qtd,
}: CardsProps) {
  const subTitle = () => {
    return observation ? observation : "";
  };
  return (
    <div className="w-full h-full flex  bg-white text-black rounded-xl flex-1">
      <div className="w-1/3 flex items-center justify-center">{image}</div>
      <div className="w-full flex flex-col justify-center iten-center my-2 gap-2">
        <div className="flex flex-col w-full justify-center r">
          <span className="text-base flex flex-col">
            {title}
            <span className="text-4xl font-bold">{qtd}</span>
          </span>
        </div>
        <span className="text-sm">{subTitle()}</span>
      </div>
    </div>
  );
}
