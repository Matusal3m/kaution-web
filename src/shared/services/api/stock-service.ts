import { Stock } from "@/shared/types";

const baseUrl = process.env.BASE_API_URL;

async function create({ name }: { name: string }): Promise<Stock | undefined> {
  try {
    const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/stocks`, {
      body: JSON.stringify({ name }),
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
    const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/stocks`, {
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

async function all(): Promise<Stock[]> {
  try {
    const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/stocks`, {
      method: "GET",
      headers: {
        authorization: JWT,
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
    const JWT = localStorage.getItem("jwt")!;

    const response = await fetch(`${baseUrl}/stocks/${id}`, {
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

export { create, update, all, getById };
