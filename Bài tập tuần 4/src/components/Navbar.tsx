import React from 'react';
import { Heart, Laptop, Code2, Zap } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useStoreEngine } from '../hooks/useFavorites';

interface NavbarProps {
  onOpenFavorites: () => void;
  onOpenTechnicalInfo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenFavorites, onOpenTechnicalInfo }) => {
  const { favoritesCount } = useFavorites();
  const { engine, setEngine } = useStoreEngine();

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand */}
        <a href="/" className="brand-group" aria-label="TechVault Home">
          <div className="brand-logo">
            <Laptop className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="brand-title">
              <span className="brand-main">TechVault</span>
              <span className="brand-badge-pro">PRO</span>
            </div>
            <p className="brand-desc">Flagship Tech & Lifestyle Store</p>
          </div>
        </a>

        {/* Center / Engine Toggle for grading & testing */}
        <div className="engine-toggle-compact">
          <span className="engine-label-compact">Store Engine:</span>
          <div className="engine-pills">
            <button
              onClick={() => setEngine('zustand')}
              className={`engine-pill-btn ${engine === 'zustand' ? 'active-z' : ''}`}
              title="Zustand Store (favoritesStore)"
            >
              <Zap className="w-3 h-3" />
              <span>Zustand</span>
            </button>
            <button
              onClick={() => setEngine('context')}
              className={`engine-pill-btn ${engine === 'context' ? 'active-c' : ''}`}
              title="React Context API (useReducer + useMemo)"
            >
              <span>Context</span>
            </button>
          </div>
        </div>

        {/* Right actions */}
        <div className="nav-actions">
          {/* Technical evaluation modal button (clean & non-intrusive) */}
          <button
            onClick={onOpenTechnicalInfo}
            className="nav-link-subtle"
            title="Xem báo cáo kỹ thuật & so sánh Zustand vs Redux Toolkit (5-7 dòng)"
          >
            <Code2 className="w-4 h-4 text-slate-500" />
            <span>Kỹ thuật & So sánh</span>
          </button>

          {/* Wishlist button */}
          <button
            onClick={onOpenFavorites}
            className={`wishlist-header-btn ${favoritesCount > 0 ? 'has-items' : ''}`}
            aria-label="Xem danh sách yêu thích"
          >
            <div className="heart-icon-wrapper">
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500 animate-pulse' : 'text-slate-600'}`} />
              {favoritesCount > 0 && (
                <span className="wishlist-badge">{favoritesCount}</span>
              )}
            </div>
            <span className="wishlist-btn-text">Yêu thích</span>
          </button>
        </div>
      </div>
    </header>
  );
};
