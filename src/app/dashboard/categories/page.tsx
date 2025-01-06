import { categoryColumns } from "@/components/columns/categories-columns";
import { DataTable } from "@/components/ui/data-table";
import { getCategories } from "@/shared/services/api/dashboard-service";

export default async function CategoriesDashboard() {
  const data = await getCategories();

  return <DataTable columns={categoryColumns} data={data} />;
}
