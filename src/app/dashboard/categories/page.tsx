import { Category } from "@/shared/types";
import { categoryColumns } from "@/components/columns/categories-columns";
import { DataTable } from "@/components/ui/data-table";

async function getData(): Promise<Category[]> {
  return [
    {
      id: "atBrRwc2",
      name: "Lavanderia",
    },
    {
      id: "n2B6Rwc2",
      name: "Alimentos",
    },
    {
      id: "pqtTrRdF2",
      name: "Produtos de Limpeza",
    },
    {
      id: "atBrRwc2",
      name: "Itens de Escritório",
    },
  ];
}

export default async function CategoriesDashboard() {
  const data = await getData();

  return (
    <div className="flex-col container mx-auto">
      <DataTable columns={categoryColumns} data={data} />
    </div>
  );
}
