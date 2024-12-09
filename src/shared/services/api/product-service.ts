
import { Product } from "../../types";

const urlBase = "https://stock-api-rsj9.onrender.com";

async function create(product: Product): Promise<Product | undefined> {
  try {
    const JWT = localStorage.getItem("jwt")!;
    
    const response = await fetch(`${urlBase}/products`, {
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
    
    const response = await fetch(`${urlBase}/products`, {
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

async function getAll() {
  try {
    const JWT = localStorage.getItem("jwt")!;
    
    const response = await fetch(`${urlBase}/products`, {
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
    
    const response = await fetch(`${urlBase}/products/${id}`, {
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
    
    const response = await fetch(`${urlBase}/products/stock/${id}`, {
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
    
    const response = await fetch(`${urlBase}/products/category/${id}`, {
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

export { create, update, getAll, getById, getByStockId, getByCategoryId };
