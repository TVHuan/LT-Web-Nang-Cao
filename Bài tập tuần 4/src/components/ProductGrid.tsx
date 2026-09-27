import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Heart, AlertCircle } from 'lucide-react';
import { Product, CategoryFilter, SortOption } from '../types/product';
import { ProductCard } from './ProductCard';
import { useFavorites } from '../hooks/useFavorites';

interface ProductGridProps {
  products: Product[];
  onOpenDrawer: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onOpenDrawer }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const { isFavorite, favoritesCount } = useFavorites();

  const categories: CategoryFilter[] = ['All', 'Laptop', 'Điện thoại', 'Tai nghe', 'Đồng hồ', 'Phụ kiện'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Only favorites filter
        if (onlyFavorites && !isFavorite(p.id)) {
          return false;
        }
        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        return 0;
      });
  }, [products, selectedCategory, onlyFavorites, searchQuery, sortBy, isFavorite]);

  return (
    <div className="product-section" id="product-list">
      {/* Filter and Control Bar */}
      <div className="control-bar">
        {/* Categories */}
        <div className="category-scroll-container">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat === 'All' ? 'Tất cả danh mục' : cat}
            </button>
          ))}
        </div>

        {/* Filter controls */}
        <div className="filter-actions-row">
          {/* Search Box */}
          <div className="search-input-wrapper">
            <Search className="search-icon w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, thương hiệu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="search-clear-btn">
                ×
              </button>
            )}
          </div>

          <div className="action-buttons-group">
            {/* Sort Select */}
            <div className="select-wrapper">
              <SlidersHorizontal className="select-icon w-4 h-4" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="sort-select"
                aria-label="Sắp xếp sản phẩm"
              >
                <option value="default">Sắp xếp: Mặc định</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="rating-desc">Đánh giá: Cao nhất</option>
              </select>
            </div>

            {/* Toggle Only Favorites */}
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`filter-fav-btn ${onlyFavorites ? 'active' : ''}`}
            >
              <Heart className={`w-4 h-4 ${onlyFavorites ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>Chỉ hiện yêu thích ({favoritesCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Status Header */}
      <div className="grid-status-header">
        <span className="results-count">
          Hiển thị <strong>{filteredProducts.length}</strong> / {products.length} sản phẩm
          {onlyFavorites && ' (Đang lọc sản phẩm đã yêu thích)'}
        </span>
        <div className="flex items-center gap-3">
          {onlyFavorites && (
            <button
              onClick={() => setOnlyFavorites(false)}
              className="clear-filter-link"
            >
              Bỏ lọc yêu thích
            </button>
          )}
          {favoritesCount > 0 && (
            <button
              onClick={onOpenDrawer}
              className="clear-filter-link"
              title="Mở chi tiết danh sách yêu thích"
            >
              Xem danh sách yêu thích ({favoritesCount}) →
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="empty-results-box">
          <AlertCircle className="w-12 h-12 text-slate-400 stroke-[1.5]" />
          <h3>Không tìm thấy sản phẩm phù hợp</h3>
          <p>
            {onlyFavorites
              ? 'Bạn chưa thêm sản phẩm nào vào mục yêu thích hoặc không có sản phẩm yêu thích nào khớp với bộ lọc hiện tại.'
              : 'Hãy thử tìm kiếm với từ khóa khác hoặc bỏ chọn các bộ lọc.'}
          </p>
          <div className="flex gap-3 mt-4">
            {onlyFavorites && (
              <button onClick={() => setOnlyFavorites(false)} className="btn-secondary">
                Xem tất cả sản phẩm
              </button>
            )}
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSortBy('default');
                setOnlyFavorites(false);
              }}
              className="btn-primary"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
