const baseUrl = process.env.BASE_API_URL;

export type ProductDashboardResponse = Array<{
  id: number;
  name: string;
  description: string;
  stock: string;
  category: string;
}>;

export type CategoryDashboardResponse = Array<{
  category: {
    id: number;
    name: string;
  };
  stock: {
    id: number;
    name: string;
  };
  productsCount: number;
}>;

export type StockDashboardResponse = Array<{
  id: number;
  name: string;
  stock: string;
  productsCount: number;
  categoriesCount: number;
}>;

async function getProducts(): Promise<ProductDashboardResponse> {
  try {
    const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/dashboard/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: JWT,
      },
    });

    return await response.json();
  } catch (error) {
    console.log({ error });
    return [];
  }
}

async function getCategories(): Promise<CategoryDashboardResponse> {
  try {
    const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/dashboard/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: JWT,
      },
    });

    return await response.json();
  } catch (error) {
    console.log({ error });
    return [];
  }
}

async function getStocks(): Promise<StockDashboardResponse> {
  try {
    const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/dashboard/stocks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: JWT,
      },
    });

    return await response.json();
  } catch (error) {
    console.log({ error });
    return [];
  }
}

export { getCategories, getProducts, getStocks };
