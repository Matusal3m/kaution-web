import { productColumns } from "@/components/columns/product-columns";
import { DataTable } from "@/components/ui/data-table";
import productService from "@/services/api/product-service";

export default async function ProductsDashboard() {
  const data = await productService.all();

  return <DataTable columns={productColumns} data={data} />;
}
