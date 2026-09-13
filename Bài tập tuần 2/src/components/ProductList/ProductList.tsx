import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Package } from 'lucide-react';
import { Product } from '../../types/product.types';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { usePagination } from '../../hooks/usePagination';
import { ProductCard } from './ProductCard';
import { PaginationControls } from './PaginationControls';
import './ProductList.css';

export const ProductList: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // Lấy danh sách các danh mục duy nhất
  const categories = useMemo(() => {
    const cats = ['Tất cả', ...new Set(MOCK_PRODUCTS.map((p) => p.category))];
    return cats;
  }, []);

  // Lọc sản phẩm theo tìm kiếm và danh mục
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchCategory =
        selectedCategory === 'Tất cả' || product.category === selectedCategory;
      const matchKeyword =
        product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        product.description.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchCategory && matchKeyword;
    });
  }, [searchKeyword, selectedCategory]);

  // Áp dụng Custom Hook Generic usePagination<Product>(data, itemsPerPage)
  const {
    currentPage,
    totalPages,
    currentData: paginatedProducts,
    next,
    prev,
    goToPage,
    canNext,
    canPrev,
    startIndex,
    endIndex,
    totalItems,
    itemsPerPage,
    setItemsPerPage,
  } = usePagination<Product>(filteredProducts, 8);

  return (
    <div className="product-list-container">
      {/* Header & Filter Controls */}
      <div className="product-list-header">
        <div className="product-list-header__title-box">
          <h2 className="product-list-title">Danh Sách Sản Phẩm</h2>
          <p className="product-list-subtitle">
            Các sản phẩm công nghệ nổi bật kèm bộ lọc và phân trang
          </p>
        </div>

        {/* Toolbar: Tìm kiếm và bộ lọc danh mục */}
        <div className="product-toolbar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm theo tên..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="search-input"
            />
            {searchKeyword && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchKeyword('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="category-filter">
            <SlidersHorizontal size={16} className="filter-icon" />
            <span className="filter-label">Danh mục:</span>
            <div className="category-badges">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-badge ${
                    selectedCategory === cat ? 'category-badge--active' : ''
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lưới sản phẩm */}
      {paginatedProducts.length > 0 ? (
        <div className="product-grid">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-products-state">
          <div className="empty-icon-wrap">
            <Package size={48} />
          </div>
          <h3>Không tìm thấy sản phẩm nào</h3>
          <p>Hãy thử tìm kiếm với từ khóa khác hoặc bỏ chọn bộ lọc danh mục.</p>
          <button
            type="button"
            className="btn-reset-filter"
            onClick={() => {
              setSearchKeyword('');
              setSelectedCategory('Tất cả');
            }}
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}

      {/* Điều khiển phân trang (Chỉ hiển thị khi có sản phẩm) */}
      {totalItems > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          canNext={canNext}
          canPrev={canPrev}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          next={next}
          prev={prev}
          goToPage={goToPage}
          setItemsPerPage={setItemsPerPage}
        />
      )}
    </div>
  );
};
