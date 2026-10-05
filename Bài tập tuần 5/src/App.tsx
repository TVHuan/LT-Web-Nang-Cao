import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  lazy,
  Suspense,
} from 'react';
import type { FilterState, Product } from './types/product';
import { ALL_PRODUCTS } from './data/products';
import { filterAndSortProducts } from './utils/productUtils';
import FilterBar from './components/FilterBar';
import StatsBar from './components/StatsBar';
import VirtualizedGrid from './components/VirtualizedGrid';

// Kỹ thuật Code Splitting: chỉ load PerformanceReport khi user click
const PerformanceReport = lazy(() => import('./components/PerformanceReport'));

const DEFAULT_FILTERS: FilterState = {
  search: '',
  category: 'All',
  minPrice: 0,
  maxPrice: 1000,
  minRating: 0,
  sortField: 'name',
  sortOrder: 'asc',
};

export default function App() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [showReport, setShowReport] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  // Theo dõi kích thước container để responsive virtualized grid
  useEffect(() => {
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Kỹ thuật Memoization: useMemo — chỉ filter/sort lại khi filters thực sự thay đổi
  const filteredProducts = useMemo(
    () => filterAndSortProducts(ALL_PRODUCTS, filters),
    [filters]
  );

  // Kỹ thuật Memoization: useCallback — stable reference, tránh phá vỡ React.memo của ProductCard
  const handleSelect = useCallback((product: Product) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) next.delete(product.id);
      else next.add(product.id);
      return next;
    });
  }, []);

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleClearSelected = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <span className="header-logo">🛍</span>
            <div>
              <h1 className="header-title">Product Manager</h1>
              <p className="header-subtitle">Quản lý {ALL_PRODUCTS.length.toLocaleString()} sản phẩm với tối ưu React</p>
            </div>
          </div>
          <div className="header-actions">
            {selectedIds.size > 0 && (
              <button className="btn-clear-selected" onClick={handleClearSelected}>
                Bỏ chọn ({selectedIds.size})
              </button>
            )}
            <button
              className={`btn-report ${showReport ? 'active' : ''}`}
              onClick={() => setShowReport((v) => !v)}
              id="btn-toggle-report"
            >
              📊 {showReport ? 'Ẩn báo cáo' : 'Báo cáo hiệu năng'}
            </button>
          </div>
        </div>

        <div className="optimization-badges">
          <span className="badge badge-memo">React.memo</span>
          <span className="badge badge-usememo">useMemo</span>
          <span className="badge badge-callback">useCallback</span>
          <span className="badge badge-virtual">react-window</span>
          <span className="badge badge-lazy">React.lazy</span>
          <span className="badge badge-lazy-img">Lazy Images</span>
        </div>
      </header>

      {/* Performance Report — Code Splitting với Suspense */}
      {showReport && (
        <Suspense fallback={
          <div className="report-loading">
            <div className="spinner" />
            <span>Đang tải báo cáo hiệu năng...</span>
          </div>
        }>
          <PerformanceReport />
        </Suspense>
      )}

      {/* Stats */}
      <StatsBar products={filteredProducts} selectedCount={selectedIds.size} />

      {/* Filter */}
      <FilterBar
        filters={filters}
        onChange={handleFiltersChange}
        totalCount={ALL_PRODUCTS.length}
        filteredCount={filteredProducts.length}
      />

      {/* Product Grid — Virtualized */}
      <main className="app-main" ref={containerRef}>
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <p>Không tìm thấy sản phẩm nào phù hợp</p>
            <button className="btn-reset" onClick={() => setFilters(DEFAULT_FILTERS)}>
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <VirtualizedGrid
            products={filteredProducts}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            containerWidth={containerWidth || 1200}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>LTWNC — Bài tập tuần 5: Tối ưu React với Memoization, Virtualization & Code Splitting</p>
      </footer>
    </div>
  );
}
