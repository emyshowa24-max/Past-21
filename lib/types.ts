export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  images: string[];
  category: string | null;
  sizes: string[];
  colors: string[];
  stock: number;
  is_published: boolean;
  created_at: string;
};
