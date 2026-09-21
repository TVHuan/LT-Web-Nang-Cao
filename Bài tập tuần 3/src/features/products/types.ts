export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  image: string;
  stock: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedCategory: string;
  searchTerm: string;
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'rating';
}
