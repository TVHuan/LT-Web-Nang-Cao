export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  image: string;
  badge?: 'Mới' | 'Hot' | 'Giảm sốc' | 'Bán chạy';
  description: string;
}
