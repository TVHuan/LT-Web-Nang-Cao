import React, { createContext, useContext, useReducer, useMemo, useEffect, ReactNode } from 'react';
import { Product } from '../types/product';

// Action Types cho mini-Redux reducer
type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: Product }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: Product }
  | { type: 'CLEAR_FAVORITES' }
  | { type: 'HYDRATE_STORAGE'; payload: Product[] };

interface FavoritesContextState {
  favorites: Product[];
  lastUpdated: string | null;
}

const initialState: FavoritesContextState = {
  favorites: [],
  lastUpdated: null,
};

function favoritesReducer(state: FavoritesContextState, action: FavoritesAction): FavoritesContextState {
  switch (action.type) {
    case 'HYDRATE_STORAGE':
      return {
        ...state,
        favorites: action.payload,
      };

    case 'TOGGLE_FAVORITE': {
      const exists = state.favorites.some((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          favorites: state.favorites.filter((item) => item.id !== action.payload.id),
          lastUpdated: new Date().toISOString(),
        };
      }
      const productWithTimestamp: Product = {
        ...action.payload,
        addedAt: new Date().toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      };
      return {
        ...state,
        favorites: [productWithTimestamp, ...state.favorites],
        lastUpdated: new Date().toISOString(),
      };
    }

    case 'ADD_FAVORITE': {
      if (state.favorites.some((item) => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [action.payload, ...state.favorites],
        lastUpdated: new Date().toISOString(),
      };
    }

    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.id !== action.payload),
        lastUpdated: new Date().toISOString(),
      };

    case 'CLEAR_FAVORITES':
      return {
        ...state,
        favorites: [],
        lastUpdated: new Date().toISOString(),
      };

    default:
      return state;
  }
}

interface FavoritesContextValue {
  favorites: Product[];
  lastUpdated: string | null;
  toggleFavorite: (product: Product) => void;
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'ltwnc-favorites-context-storage';

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Khôi phục từ LocalStorage khi khởi chạy
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'HYDRATE_STORAGE', payload: parsed });
        }
      }
    } catch (e) {
      console.error('Không thể đọc dữ liệu từ LocalStorage', e);
    }
  }, []);

  // Đồng bộ vào LocalStorage khi state.favorites thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.favorites));
    } catch (e) {
      console.error('Không thể lưu dữ liệu vào LocalStorage', e);
    }
  }, [state.favorites]);

  // Tối ưu hoá context value bằng useMemo tránh re-render không cần thiết
  const contextValue = useMemo<FavoritesContextValue>(() => {
    return {
      favorites: state.favorites,
      lastUpdated: state.lastUpdated,
      toggleFavorite: (product: Product) => dispatch({ type: 'TOGGLE_FAVORITE', payload: product }),
      addFavorite: (product: Product) => dispatch({ type: 'ADD_FAVORITE', payload: product }),
      removeFavorite: (productId: string) => dispatch({ type: 'REMOVE_FAVORITE', payload: productId }),
      isFavorite: (productId: string) => state.favorites.some((item) => item.id === productId),
      clearFavorites: () => dispatch({ type: 'CLEAR_FAVORITES' }),
      favoritesCount: state.favorites.length,
    };
  }, [state.favorites, state.lastUpdated]);

  return <FavoritesContext.Provider value={contextValue}>{children}</FavoritesContext.Provider>;
};

export const useFavoritesContext = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext phải được sử dụng bên trong FavoritesProvider');
  }
  return context;
};
