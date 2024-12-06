"use client"

import { Product } from "@/shared/types";
import { productColumns } from "@/components/columns/product-columns";
import { DataTable } from "@/components/ui/data-table";
import { useStorage } from "@/contexts/storeage";

export default function ProductsDashboard() {
  const { products } = useStorage();

  return (
    <div className="flex-col container mx-auto">
      <DataTable columns={productColumns} data={products} />
    </div>
  );
}
