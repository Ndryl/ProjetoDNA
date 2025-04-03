import { useState } from "react";

interface StatusPropss {
  statusArray: any[];
  setStatus: (status: string) => void;
  status: string;
}

export default function SelectStatus({ statusArray, setStatus, status }: StatusPropss) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative p-2 rounded-full transition-all duration-200 cursor-pointer ${
        isFocused
          ? "bg-gradient-to-r from-purple-500/10 to-purple-500/20 ring-2 ring-purple-500"
          : "border border-zinc-600 hover:bg-zinc-200 hover:border-purple-600"
      }`}
    >
      <div className="flex gap-2 items-center bg-white rounded-full pl-3 pr-4 py-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="outline-none w-full bg-transparent appearance-none text-zinc-700 cursor-pointer"
        >
          {statusArray.map((element) => (
            <option key={element.id} value={element.status}>
              {element.status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
