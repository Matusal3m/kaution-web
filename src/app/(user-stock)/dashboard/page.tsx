import DashboardTable from "@/components/dashboard/dashboard-table";

import categoryService from "@/services/api/category-service";
import productService from "@/services/api/product-service";
import stockService from "@/services/api/stock-service";

const getRowsData = async () => [
  {
    type: "Estoque",
    quantity: await stockService.quantity(),
  },
  {
    type: "Categoria",
    quantity: await categoryService.quantity(),
  },
  {
    type: "Produtos",
    quantity: await productService.quantity(),
  },
];

export default async function DashboardHome() {
  const rows = await getRowsData();

  return <DashboardTable rows={rows} />;
}
