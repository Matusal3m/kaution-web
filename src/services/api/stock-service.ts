const baseUrl = process.env.BASE_API_URL;

export type UserStock = {
  id: number;
  name: string;
  productsCount: number;
  categoriesCount: number;
};

export type Stock = {
  id: number;
  name: string;
};

async function create(newStock: Omit<Stock, "id">): Promise<Stock | undefined> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/stocks`, {
      body: JSON.stringify(newStock),
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

async function update(updatedStock: Promise<Stock | undefined>) {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/stocks`, {
      body: JSON.stringify(updatedStock),
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

async function all(): Promise<UserStock[]> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/stocks`, {
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

async function getById(id: string): Promise<Stock | undefined> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/stocks/${id}`, {
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

async function quantity(): Promise<number | undefined> {
  try {
    // const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/stocks/quantity`, {
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

export default { create, update, all, getById, quantity };
