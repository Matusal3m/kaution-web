import { productColumns } from "@/components/columns/product-columns";
import { DataTable } from "@/components/ui/data-table";
import { getProducts } from "@/shared/services/api/dashboard-service";

export default async function ProductsDashboard() {
  const data = await getProducts();

  return <DataTable columns={productColumns} data={data} />;
}
