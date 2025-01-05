import { Product } from "../../types";

const baseUrl = process.env.BASE_API_URL;

async function create(product: Product): Promise<Product | undefined> {
  try {
    const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/products`, {
      body: JSON.stringify(product),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: JWT,
      },
    });

    return await response.json();
  } catch (error) {
    console.log({ error });
  }
}

async function update(newProduct: Product): Promise<Product | undefined> {
  try {
    const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/products`, {
      body: JSON.stringify(newProduct),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: JWT,
      },
    });

    return await response.json();
  } catch (error) {
    console.log({ error });
  }
}

async function all() {
  try {
    const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/products`, {
      method: "GET",
      headers: {
        authorization: JWT,
      },
    });

    const json = await response.json();

    return json;
  } catch (error) {
    console.log({ error });
  }
}

async function getById(id: string): Promise<Product | undefined> {
  try {
    const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/products/${id}`, {
      method: "GET",
      headers: {
        authorization: JWT,
      },
    });

    const json = await response.json();

    return json;
  } catch (error) {
    console.log({ error });
  }
}

async function getByStockId(id: string): Promise<Product[]> {
  try {
    const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/products/stock/${id}`, {
      method: "GET",
      headers: {
        authorization: JWT,
      },
    });

    const json = (await response.json()) as Product[];

    return json;
  } catch (error) {
    console.log({ error });
    return [];
  }
}

async function getByCategoryId(id: string): Promise<Product[]> {
  try {
    const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/products/category/${id}`, {
      method: "GET",
      headers: {
        authorization: JWT,
      },
    });

    const json = (await response.json()) as Product[];

    return json;
  } catch (error) {
    console.log({ error });
    return [];
  }
}

export { create, update, all, getById, getByStockId, getByCategoryId };
