export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  image: string;
  description: string;
  brand: string;
  sku: string;
}

export type SortField = 'name' | 'price' | 'rating' | 'stock';
export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortField: SortField;
  sortOrder: SortOrder;
}
