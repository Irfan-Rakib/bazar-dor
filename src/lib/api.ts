import type { Category, Product } from "@/types/product";

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetchJson<unknown>("/products");

  // We will map the actual API response to Product
  // after verifying its field names.
  if (Array.isArray(response)) {
    return response as Product[];
  }

  if (
    response &&
    typeof response === "object" &&
    "data" in response &&
    Array.isArray(response.data)
  ) {
    return response.data as Product[];
  }

  throw new Error("Unexpected products API response format");
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetchJson<unknown>("/categories");

  if (Array.isArray(response)) {
    return response as Category[];
  }

  if (
    response &&
    typeof response === "object" &&
    "data" in response &&
    Array.isArray(response.data)
  ) {
    return response.data as Category[];
  }

  throw new Error("Unexpected categories API response format");
}
