import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StoreEngine } from '../types/product';
import { useFavoritesStore } from '../stores/favoritesStore';
import { useFavoritesContext } from '../context/FavoritesContext';

interface EngineContextType {
  engine: StoreEngine;
  setEngine: (engine: StoreEngine) => void;
}

export const EngineContext = createContext<EngineContextType>({
  engine: 'zustand',
  setEngine: () => {},
});

export const EngineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [engine, setEngine] = useState<StoreEngine>('zustand');

  return (
    <EngineContext.Provider value={{ engine, setEngine }}>
      {children}
    </EngineContext.Provider>
  );
};

export const useStoreEngine = () => useContext(EngineContext);

/**
 * Custom hook thống nhất cho phép linh hoạt gọi favorites từ Zustand Store
 * hoặc Context Nâng Cao tùy theo chế độ đang được chọn.
 */
export const useFavorites = () => {
  const { engine } = useStoreEngine();

  // Zustand hooks
  const zustandFavorites = useFavoritesStore((state) => state.favorites);
  const zustandToggle = useFavoritesStore((state) => state.toggleFavorite);
  const zustandAdd = useFavoritesStore((state) => state.addFavorite);
  const zustandRemove = useFavoritesStore((state) => state.removeFavorite);
  const zustandIsFavorite = useFavoritesStore((state) => state.isFavorite);
  const zustandClear = useFavoritesStore((state) => state.clearFavorites);
  const zustandLastUpdated = useFavoritesStore((state) => state.lastUpdated);

  // Context hooks
  const context = useFavoritesContext();

  if (engine === 'context') {
    return {
      engine: 'context' as const,
      favorites: context.favorites,
      toggleFavorite: context.toggleFavorite,
      addFavorite: context.addFavorite,
      removeFavorite: context.removeFavorite,
      isFavorite: context.isFavorite,
      clearFavorites: context.clearFavorites,
      favoritesCount: context.favoritesCount,
      lastUpdated: context.lastUpdated,
    };
  }

  return {
    engine: 'zustand' as const,
    favorites: zustandFavorites,
    toggleFavorite: zustandToggle,
    addFavorite: zustandAdd,
    removeFavorite: zustandRemove,
    isFavorite: zustandIsFavorite,
    clearFavorites: zustandClear,
    favoritesCount: zustandFavorites.length,
    lastUpdated: zustandLastUpdated,
  };
};
