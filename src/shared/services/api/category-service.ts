import { Category } from "../../types";

const urlBase = process.env.API_BASE_URL!;

async function create(category: Category): Promise<Category | undefined> {
  try {
    const JWT = localStorage.getItem("jwt")!;
    
    const response = await fetch(`${urlBase}/categories`, {
      body: JSON.stringify(category),
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

async function update(newCategory: Category): Promise<Category | undefined> {
  try {
    const JWT = localStorage.getItem("jwt")!;
    
    const response = await fetch(`${urlBase}/categories`, {
      body: JSON.stringify(newCategory),
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

async function getAll(): Promise<Category[]> {
  try {
    const JWT = localStorage.getItem("jwt")!;
    
    const response = await fetch(`${urlBase}/categories`, {
      method: "GET",
      headers: {
        authorization: JWT,
      },
    });

    const json = (await response.json()) as Category[];

    return json;
  } catch (error) {
    console.log({ error });
    return [];
  }
}

async function getById(id: string) {
  try {
    const JWT = localStorage.getItem("jwt")!;
    
    const response = await fetch(`${urlBase}/categories/${id}`, {
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

async function getByStockId(id: string): Promise<Category[]> {
  try {
    const JWT = localStorage.getItem("jwt")!;
    
    const response = await fetch(`${urlBase}/categories/stock/${id}`, {
      method: "GET",
      headers: {
        authorization: JWT,
      },
    });

    const json = (await response.json()) as Category[];

    return json;
  } catch (error) {
    console.log({ error });
    return [];
  }
}

export { create, update, getAll, getById, getByStockId };
