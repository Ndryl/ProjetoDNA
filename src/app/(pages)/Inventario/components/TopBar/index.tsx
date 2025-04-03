import { Bell, Search, User } from "lucide-react";
import SearchInventario from "../SearchIntantario";

export default function () {
  return (
    <div className="flex justify-between bg-[#FFFFFF] items-center p-4 pl-10">
      <SearchInventario />
      <div className="flex gap-4 items-center">
        {" "}
        <Bell className="w-5 h-5" />{" "}
        <div className="w-10 h-10 border-zinc-600 border  rounded-full flex justify-center items-center">
          <User className="w-5 h-5 text-zinc-600" />{" "}
        </div>
      </div>
    </div>
  );
}
