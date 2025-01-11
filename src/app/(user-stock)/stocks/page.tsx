import { stockColumns } from "@/components/columns/stock-columns";
import { DataTable } from "@/components/ui/data-table";
import stockService from "@/services/api/stock-service";

export default async function StocksDashboard() {
  const data = await stockService.all();

  return <DataTable columns={stockColumns} data={data} />;
}
