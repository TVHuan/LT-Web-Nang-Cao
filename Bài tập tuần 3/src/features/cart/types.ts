import { Product } from '../products/types';

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: number;
}

export interface CartState {
  items: CartItem[];
  discountCode: string | null;
  discountPercent: number;
  shippingFee: number;
  isOpen: boolean; // Trạng thái mở/đóng Cart Drawer
}
