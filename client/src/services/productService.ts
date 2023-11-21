// services
import * as tokenService from "./tokenService";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/products`;

interface Product {
  _id: string;
  name: string;
  category: string;
  amount: number;
  unit: string;
  company: string;
}

async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return (await res.json()) as Product[];
  } catch (err) {
    throw new Error(`Network error: ${err}`);
  }
}
async function createProduct(product: Product): Promise<Product> {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return (await res.json()) as Product;
  } catch (err) {
    throw new Error(`Network error: ${err}`);
  }
}

async function updateProduct(product: Product): Promise<Product> {
  try {
    const res = await fetch(`${BASE_URL}/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return (await res.json()) as Product;
  } catch (err) {
    throw new Error(`Network error: ${err}`);
  }
}

async function deleteProduct(id: string): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    throw new Error(`Network error: ${err}`);
  }
}

export { getAllProducts, createProduct, updateProduct, deleteProduct };
