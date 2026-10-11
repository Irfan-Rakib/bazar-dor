export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryName: string;
  unit: string;
  price: number;
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  changePercentage: number;
  emoji: string;
  description: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  emoji: string;
};
