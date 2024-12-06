import { Stock } from "@/shared/types";
import { categoryColumns } from "@/components/columns/categories-columns";
import { DataTable } from "@/components/ui/data-table";

async function getData(): Promise<Stock[]> {
  return [
    {
      id: "atBrRwc2",
      name: "Escola",
    },
    {
      id: "n2B6Rwc2",
      name: "Casa",
    },
    {
      id: "pqtTrRdF2",
      name: "Comércio",
    },
    {
      id: "atBrRwc2",
      name: "Garagem",
    },
  ];
}

export default async function StocksDashboard() {
  const data = await getData();

  return (
    <div className="flex-col container mx-auto">
      <DataTable columns={categoryColumns} data={data} />
    </div>
  );
}
