import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Product } from '../types/product';

/**
 * Interface cho trạng thái và các action của FavoritesStore
 */
export interface FavoritesState {
  favorites: Product[];
  lastUpdated: string | null;

  // Actions
  toggleFavorite: (product: Product) => void;
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
  getFavoritesCount: () => number;
}

/**
 * Zustand Store riêng biệt quản lý danh sách sản phẩm yêu thích (favoritesStore)
 * - Tích hợp middleware persist để tự động lưu vào LocalStorage
 * - Tích hợp devtools để hỗ trợ Redux DevTools Extension trên trình duyệt
 * - Đảm bảo tính bất biến (immutability) và tối ưu render theo selector
 */
export const useFavoritesStore = create<FavoritesState>()(
  devtools(
    persist(
      (set, get) => ({
        favorites: [],
        lastUpdated: null,

        /**
         * Thêm hoặc bỏ sản phẩm khỏi danh sách yêu thích
         * Nếu đã có -> Xoá khỏi danh sách
         * Nếu chưa có -> Thêm vào đầu danh sách cùng nhãn thời gian
         */
        toggleFavorite: (product: Product) => {
          const currentFavorites = get().favorites;
          const exists = currentFavorites.some((item) => item.id === product.id);

          if (exists) {
            set(
              (state) => ({
                favorites: state.favorites.filter((item) => item.id !== product.id),
                lastUpdated: new Date().toISOString(),
              }),
              false,
              'favorites/remove'
            );
          } else {
            const productWithTimestamp: Product = {
              ...product,
              addedAt: new Date().toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }),
            };
            set(
              (state) => ({
                favorites: [productWithTimestamp, ...state.favorites],
                lastUpdated: new Date().toISOString(),
              }),
              false,
              'favorites/add'
            );
          }
        },

        /**
         * Thêm sản phẩm vào danh sách yêu thích (nếu chưa có)
         */
        addFavorite: (product: Product) => {
          const currentFavorites = get().favorites;
          if (!currentFavorites.some((item) => item.id === product.id)) {
            set(
              (state) => ({
                favorites: [{ ...product, addedAt: new Date().toLocaleTimeString('vi-VN') }, ...state.favorites],
                lastUpdated: new Date().toISOString(),
              }),
              false,
              'favorites/add'
            );
          }
        },

        /**
         * Bỏ 1 sản phẩm khỏi danh sách yêu thích theo ID
         */
        removeFavorite: (productId: string) => {
          set(
            (state) => ({
              favorites: state.favorites.filter((item) => item.id !== productId),
              lastUpdated: new Date().toISOString(),
            }),
            false,
            'favorites/remove'
          );
        },

        /**
         * Kiểm tra xem 1 sản phẩm có trong danh sách yêu thích hay không
         */
        isFavorite: (productId: string) => {
          return get().favorites.some((item) => item.id === productId);
        },

        /**
         * Xóa toàn bộ danh sách yêu thích
         */
        clearFavorites: () => {
          set(
            {
              favorites: [],
              lastUpdated: new Date().toISOString(),
            },
            false,
            'favorites/clear'
          );
        },

        /**
         * Lấy tổng số lượng sản phẩm yêu thích hiện tại
         */
        getFavoritesCount: () => {
          return get().favorites.length;
        },
      }),
      {
        name: 'ltwnc-favorites-zustand-storage',
      }
    ),
    { name: 'FavoritesStore' }
  )
);
