"use client";

import { Category } from "@/shared/types";
import { categoryColumns } from "@/components/columns/categories-columns";
import { DataTable } from "@/components/ui/data-table";
import { useStorage } from "@/contexts/storeage";

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
  // const {categories} = useStorage();

  return <DataTable columns={categoryColumns} data={data} />;
}
