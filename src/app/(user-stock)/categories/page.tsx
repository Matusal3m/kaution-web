import { categoryColumns } from "@/components/columns/categories-columns";
import { DataTable } from "@/components/ui/data-table";
import categoryService from "@/services/api/category-service";

export default async function CategoriesDashboard() {
  const data = await categoryService.all();

  return <DataTable columns={categoryColumns} data={data} />;
}
