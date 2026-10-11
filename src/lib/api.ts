import type { Category, Product } from "@/types/product";

const API_BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  return (await response.json()) as T;
}

export async function getCategories(): Promise<Category[]> {
  return fetchApi<Category[]>("/categories");
}

export async function getCategory(slug: string): Promise<Category> {
  return fetchApi<Category>(`/categories/${encodeURIComponent(slug)}`);
}

export async function getProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";

  return fetchApi<Product[]>(`/products${query}`);
}

export async function getProduct(id: number | string): Promise<Product> {
  return fetchApi<Product>(`/products/${encodeURIComponent(String(id))}`);
}

export function getProductBySlug(
  products: Product[],
  slug: string,
): Product | undefined {
  return products.find((product) => product.slug === slug);
}
