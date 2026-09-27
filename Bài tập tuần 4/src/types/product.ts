export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  inStock: boolean;
  tag?: string;
  addedAt?: string;
}

export type CategoryFilter = 'All' | 'Laptop' | 'Điện thoại' | 'Tai nghe' | 'Đồng hồ' | 'Phụ kiện';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

export type StoreEngine = 'zustand' | 'context';
