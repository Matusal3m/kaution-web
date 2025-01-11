const baseUrl = process.env.BASE_API_URL;

export type UserCategory = {
  id: number;
  name: string;
  stockId: number;
  stock: string;
  productsCount: number;
};

export type Category = {
  id: number;
  name: string;
  stockId: number;
};

async function create(
  newCategory: Omit<Category, "id">
): Promise<Category | undefined> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/categories`, {
      body: JSON.stringify(newCategory),
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

async function update(
  updatedCategory: Category
): Promise<Category | undefined> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/categories`, {
      body: JSON.stringify(updatedCategory),
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

async function all(): Promise<UserCategory[]> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/categories`, {
      method: "GET",
      headers: {
        // authorization: JWT,
      },
    });

    const json = await response.json();

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

async function quantity(): Promise<number | undefined> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/categories/quantity`, {
      method: "GET",
      headers: {
        // authorization: JWT,
      },
    });

    const { quantity } = await response.json();

    return quantity;
  } catch (error) {
    console.log({ error });
  }
}

export default { create, update, all, getById, getByStockId, quantity };
