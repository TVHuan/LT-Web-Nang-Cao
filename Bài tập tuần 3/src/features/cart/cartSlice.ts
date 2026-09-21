import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Product } from '../products/types';
import { CartState } from './types';
import type { RootState } from '../../app/store';

const initialState: CartState = {
  items: [],
  discountCode: null,
  discountPercent: 0,
  shippingFee: 30000, // 30,000 VND standard shipping
  isOpen: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ hàng (tự động cộng dồn số lượng nếu đã tồn tại và kiểm tra tồn kho)
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.product.id === product.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        existingItem.quantity = Math.min(newQuantity, product.stock);
      } else {
        state.items.push({
          product,
          quantity: Math.min(quantity, product.stock),
          addedAt: Date.now(),
        });
      }
    },

    // Xoá sản phẩm khỏi giỏ hàng
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product.id !== productId);
    },

    // Cập nhật số lượng trực tiếp
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.product.id !== productId);
        } else {
          item.quantity = Math.min(quantity, item.product.stock);
        }
      }
    },

    // Tăng số lượng sản phẩm lên 1 (không vượt quá số lượng trong kho)
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.product.id === productId);
      if (item && item.quantity < item.product.stock) {
        item.quantity += 1;
      }
    },

    // Giảm số lượng sản phẩm đi 1 (nếu về 0 thì tự động xoá khỏi giỏ)
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const item = state.items.find((item) => item.product.id === productId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.product.id !== productId);
        }
      }
    },

    // Xoá toàn bộ sản phẩm trong giỏ hàng
    clearCart: (state) => {
      state.items = [];
      state.discountCode = null;
      state.discountPercent = 0;
    },

    // Áp dụng mã giảm giá voucher
    applyDiscountCode: (state, action: PayloadAction<string>) => {
      const code = action.payload.trim().toUpperCase();
      if (code === 'GIAM10') {
        state.discountCode = 'GIAM10';
        state.discountPercent = 10;
      } else if (code === 'VIP20') {
        state.discountCode = 'VIP20';
        state.discountPercent = 20;
      } else if (code === 'FREESHIP') {
        state.discountCode = 'FREESHIP';
        state.discountPercent = 0;
        state.shippingFee = 0;
      } else {
        // Mã không hợp lệ
        state.discountCode = null;
        state.discountPercent = 0;
      }
    },

    // Huỷ mã giảm giá
    removeDiscountCode: (state) => {
      state.discountCode = null;
      state.discountPercent = 0;
      state.shippingFee = 30000;
    },

    // Bật/tắt Cart Drawer
    toggleCartDrawer: (state, action: PayloadAction<boolean | undefined>) => {
      state.isOpen = action.payload !== undefined ? action.payload : !state.isOpen;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  applyDiscountCode,
  removeDiscountCode,
  toggleCartDrawer,
} = cartSlice.actions;

// Selectors chuẩn hóa bằng createSelector
export const selectCartState = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.items
);

export const selectCartTotalItems = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.product.price * item.quantity, 0)
);

export const selectCartDiscountAmount = createSelector(
  [selectCartSubtotal, (state: RootState) => state.cart.discountPercent],
  (subtotal, discountPercent) => Math.round((subtotal * discountPercent) / 100)
);

export const selectCartEffectiveShippingFee = createSelector(
  [selectCartSubtotal, (state: RootState) => state.cart.shippingFee, (state: RootState) => state.cart.discountCode],
  (subtotal, baseShipping, discountCode) => {
    if (subtotal === 0) return 0;
    if (discountCode === 'FREESHIP' || subtotal >= 5000000) return 0; // Đơn từ 5 triệu miễn phí vận chuyển
    return baseShipping;
  }
);

export const selectCartGrandTotal = createSelector(
  [selectCartSubtotal, selectCartDiscountAmount, selectCartEffectiveShippingFee],
  (subtotal, discountAmount, shippingFee) => {
    if (subtotal === 0) return 0;
    return Math.max(0, subtotal - discountAmount + shippingFee);
  }
);

export const selectCartIsOpen = (state: RootState) => state.cart.isOpen;

export default cartSlice.reducer;
