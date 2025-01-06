import { stockColumns } from "@/components/columns/stock-columns";
import { DataTable } from "@/components/ui/data-table";
import { getStocks } from "@/shared/services/api/dashboard-service";

export default async function StocksDashboard() {
  const data = await getStocks();

  return <DataTable columns={stockColumns} data={data} />;
}
