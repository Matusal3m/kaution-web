const baseUrl = process.env.BASE_API_URL;

export type UserProduct = {
  id: number;
  name: string;
  quantity: number;
  description: string;
  category: string;
  stock: string;
};

export type Product = {
  id: number;
  name: string;
  userId: number;
  stockId: number;
  description: string | null;
  quantity: number;
  categoryId: number;
};

async function create(
  product: Omit<Product, "id" | "userId">
): Promise<Product | undefined> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/products`, {
      body: JSON.stringify(product),
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
  updatedProduct: Partial<Product>
): Promise<Product | undefined> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/products`, {
      body: JSON.stringify(updatedProduct),
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

async function all(): Promise<UserProduct[]> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/products`, {
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

async function getById(id: number): Promise<Product | undefined> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/products/${id}`, {
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

async function getByStockId(id: string): Promise<Product[]> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/products/stock/${id}`, {
      method: "GET",
      headers: {
        // authorization: JWT,
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
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/products/category/${id}`, {
      method: "GET",
      headers: {
        // authorization: JWT,
      },
    });

    const json = (await response.json()) as Product[];

    return json;
  } catch (error) {
    console.log({ error });
    return [];
  }
}

async function quantity(): Promise<number | undefined> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/products/quantity`, {
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

export default {
  create,
  update,
  all,
  getById,
  getByStockId,
  getByCategoryId,
  quantity,
};
