export type Product = {
  id: string;
  name: string;
  quantity: number;
  description: string;
  categoryId?: number
  stockId?: number;
}