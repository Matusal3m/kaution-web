import { Category } from "../../types";

const baseUrl = process.env.BASE_API_URL;

async function create(category: {
  name: string;
  stockId: number;
}): Promise<Category | undefined> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/categories`, {
      body: JSON.stringify(category),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: JWT,
      },
    });

    return await response.json();
  } catch (error) {
    console.log({ error });
  }
}

async function update(newCategory: Category): Promise<Category | undefined> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/categories`, {
      body: JSON.stringify(newCategory),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // authorization: JWT,
      },
    });

    return await response.json();
  } catch (error) {
    console.log({ error });
  }
}

async function all(): Promise<Category[]> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/categories`, {
      method: "GET",
      headers: {
        // authorization: JWT,
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
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/categories/${id}`, {
      method: "GET",
      headers: {
        // authorization: JWT,
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
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/categories/stock/${id}`, {
      method: "GET",
      headers: {
        // authorization: JWT,
      },
    });

    const json = (await response.json()) as Category[];

    return json;
  } catch (error) {
    console.log({ error });
    return [];
  }
}

export { create, update, all, getById, getByStockId };
