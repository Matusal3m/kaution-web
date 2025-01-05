const baseUrl = process.env.BASE_API_URL;

async function getProducts() {
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
  }
}

async function getCategories() {
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
  }
}

async function getStocks() {
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
  }
}

export { getCategories, getProducts, getStocks };
