"use client";
import ColumnGroupingTable from "../../../../components/auth/ui/Tables/tableDeashBoard";
import OverAllInventory from "./components/OverallInventory";
import TopBar from "./components/TopBar";

export default function () {
  return (
    <div className="w-full h-full bg-gray-200 gap-4">
      <TopBar />
      <OverAllInventory />
      <ColumnGroupingTable />
    </div>
  );
}
