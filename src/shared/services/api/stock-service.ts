import { Stock } from "@/shared/types";

const urlBase = process.env.API_BASE_URL!;

async function create(stock: Stock): Promise<Stock | undefined> {
  try {
    const JWT = "";
    const response = await fetch(`${urlBase}/stocks`, {
      body: JSON.stringify(stock),
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

async function update(newStock: Promise<Stock | undefined>) {
  try {
    const JWT = "";
    const response = await fetch(`${urlBase}/stocks`, {
      body: JSON.stringify(newStock),
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

async function getAll(): Promise<Stock[]> {
  try {
    const JWT = "";
    const response = await fetch(`${urlBase}/stocks`, {
      method: "GET",
      headers: {
        authorization: JWT,
      },
    });

    const json = await response.json();

    return json;
  } catch (error) {
    console.log({ error });
    return []
  }
}

async function getById(id: string): Promise<Stock | undefined> {
  try {
    const JWT = "";
    const response = await fetch(`${urlBase}/stocks/${id}`, {
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

export { create, update, getAll, getById };
