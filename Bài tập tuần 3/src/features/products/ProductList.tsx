import React, { useEffect, useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  RefreshCw,
  Sparkles,
  Zap,
  AlertCircle,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchProducts,
  setSelectedCategory,
  setSearchTerm,
  setSortBy,
  resetFilters,
} from './productsSlice';
import { useGetProductsQuery } from './productsApi';
import { ProductCard } from './ProductCard';
import { Product } from './types';

export const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();

  // Mode chọn: 'thunk' (createAsyncThunk) hoặc 'rtk-query' (RTK Query - Bonus)
  const [dataMode, setDataMode] = useState<'thunk' | 'rtk-query'>('thunk');

  // Lấy dữ liệu từ Redux Store (createAsyncThunk)
  const {
    items: thunkProducts,
    status: thunkStatus,
    error: thunkError,
    selectedCategory,
    searchTerm,
    sortBy,
  } = useAppSelector((state) => state.products);

  // Lấy dữ liệu từ RTK Query (Điểm cộng)
  const {
    data: rtkProducts,
    isLoading: isRtkLoading,
    isFetching: isRtkFetching,
    isError: isRtkError,
    error: rtkError,
    refetch: refetchRtk,
  } = useGetProductsQuery(undefined, {
    skip: dataMode !== 'rtk-query',
  });

  // Tải dữ liệu ban đầu cho createAsyncThunk
  useEffect(() => {
    if (dataMode === 'thunk' && thunkStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dataMode, thunkStatus, dispatch]);

  // Xác định danh sách nguồn đang hoạt động
  const activeProducts: Product[] = useMemo(() => {
    if (dataMode === 'thunk') {
      return thunkProducts;
    }
    return rtkProducts || [];
  }, [dataMode, thunkProducts, rtkProducts]);

  const isLoading =
    dataMode === 'thunk' ? thunkStatus === 'loading' : isRtkLoading || isRtkFetching;
  const isError = dataMode === 'thunk' ? thunkStatus === 'failed' : isRtkError;
  const errorMessage =
    dataMode === 'thunk'
      ? thunkError
      : rtkError && typeof rtkError === 'object' && 'error' in rtkError
      ? String((rtkError as { error?: string }).error)
      : 'Không thể kết nối đến máy chủ';

  // Danh mục sản phẩm
  const categories = ['Tất cả', 'Bàn phím', 'Chuột', 'Âm thanh', 'Màn hình', 'Phụ kiện'];

  // Lọc và sắp xếp sản phẩm
  const filteredProducts = useMemo(() => {
    let result = [...activeProducts];

    // Lọc theo danh mục
    if (selectedCategory !== 'Tất cả') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Lọc theo từ khoá tìm kiếm
    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearch) ||
          p.description.toLowerCase().includes(lowerSearch) ||
          p.category.toLowerCase().includes(lowerSearch)
      );
    }

    // Sắp xếp
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeProducts, selectedCategory, searchTerm, sortBy]);

  const handleRefresh = () => {
    if (dataMode === 'thunk') {
      dispatch(fetchProducts());
    } else {
      refetchRtk();
    }
  };

  return (
    <section className="product-section">
      {/* Chuyển đổi nguồn dữ liệu */}
      <div className="data-mode-bar">
        <span className="data-mode-label">Nguồn dữ liệu:</span>
        <div className="data-mode-controls">
          <button
            type="button"
            className={`btn-mode ${dataMode === 'thunk' ? 'active' : ''}`}
            onClick={() => setDataMode('thunk')}
          >
            <Zap size={14} /> createAsyncThunk
          </button>
          <button
            type="button"
            className={`btn-mode btn-mode-bonus ${dataMode === 'rtk-query' ? 'active' : ''}`}
            onClick={() => setDataMode('rtk-query')}
          >
            <Sparkles size={14} /> RTK Query
          </button>
        </div>
      </div>

      {/* Toolbar bộ lọc & tìm kiếm */}
      <div className="product-toolbar">
        {/* Tìm kiếm */}
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm bàn phím, chuột, tai nghe..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="search-input"
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => dispatch(setSearchTerm(''))}
            >
              ×
            </button>
          )}
        </div>

        {/* Sắp xếp */}
        <div className="sort-box">
          <ArrowUpDown size={16} className="sort-icon" />
          <select
            value={sortBy}
            onChange={(e) =>
              dispatch(setSortBy(e.target.value as 'default' | 'price-asc' | 'price-desc' | 'rating'))
            }
            className="sort-select"
          >
            <option value="default">Sắp xếp: Mặc định</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="rating">Đánh giá: Cao nhất</option>
          </select>
        </div>

        {/* Nút Làm mới */}
        <button
          type="button"
          onClick={handleRefresh}
          disabled={isLoading}
          className="btn-refresh"
          title="Tải lại danh sách sản phẩm"
        >
          <RefreshCw size={16} className={isLoading ? 'spin' : ''} />
          <span>Tải lại</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="category-pills" role="tablist">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={selectedCategory === category}
            className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => dispatch(setSelectedCategory(category))}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Header kết quả */}
      <div className="results-header">
        <span className="results-count">
          Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm
          {selectedCategory !== 'Tất cả' && ` thuộc danh mục "${selectedCategory}"`}
          {searchTerm && ` cho từ khoá "${searchTerm}"`}
        </span>
        {(selectedCategory !== 'Tất cả' || searchTerm !== '' || sortBy !== 'default') && (
          <button
            type="button"
            className="btn-reset-filters"
            onClick={() => dispatch(resetFilters())}
          >
            Đặt lại bộ lọc
          </button>
        )}
      </div>

      {/* Trạng thái Lỗi */}
      {isError && (
        <div className="error-card">
          <AlertCircle size={32} className="error-icon" />
          <div className="error-content">
            <h4>Đã xảy ra sự cố khi tải sản phẩm!</h4>
            <p>{errorMessage}</p>
          </div>
          <button type="button" className="btn-retry" onClick={handleRefresh}>
            Thử lại
          </button>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="product-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="product-card skeleton-card">
              <div className="skeleton skeleton-img"></div>
              <div className="product-content">
                <div className="skeleton skeleton-text" style={{ width: '40%' }}></div>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-text" style={{ width: '90%' }}></div>
                <div className="skeleton skeleton-btn"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Danh sách sản phẩm thực tế */}
      {!isLoading && !isError && filteredProducts.length > 0 && (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State khi không tìm thấy */}
      {!isLoading && !isError && filteredProducts.length === 0 && (
        <div className="empty-state">
          <Filter size={48} className="empty-icon" />
          <h3>Không tìm thấy sản phẩm phù hợp</h3>
          <p>Hãy thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác.</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => dispatch(resetFilters())}
          >
            Xem tất cả sản phẩm
          </button>
        </div>
      )}
    </section>
  );
};
