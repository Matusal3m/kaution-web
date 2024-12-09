import {
  homeColumns,
  InformationAboutUserStock,
} from "@/components/columns/home-columns";
import { DataTable } from "@/components/ui/data-table";

async function getData(): Promise<InformationAboutUserStock[]> {
  return [
    {
      id: "a7sr@sfs12",
      quantity: 12,
      type: "stocks",
    },
    {
      id: "a7sr@sfs3d",
      quantity: 48,
      type: "categories",
    },
    {
      id: "a3fr@sfs3d",
      quantity: 48,
      type: "products",
    },
  ];
}

export default async function DashboardHome() {
  const data = await getData();

  return <DataTable columns={homeColumns} data={data} microTable />;
}
