import React, { memo, useCallback } from 'react';
import type { FilterState, SortField, SortOrder } from '../types/product';
import { CATEGORIES_LIST } from '../data/products';

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalCount: number;
  filteredCount: number;
}

// React.memo - Memoization: chỉ re-render khi filters thay đổi
const FilterBar = memo(function FilterBar({ filters, onChange, totalCount, filteredCount }: FilterBarProps) {
  const handleChange = useCallback(
    (field: keyof FilterState, value: string | number) => {
      onChange({ ...filters, [field]: value });
    },
    [filters, onChange]
  );

  const handleReset = useCallback(() => {
    onChange({
      search: '',
      category: 'All',
      minPrice: 0,
      maxPrice: 1000,
      minRating: 0,
      sortField: 'name',
      sortOrder: 'asc',
    });
  }, [onChange]);

  return (
    <div className="filter-bar">
      <div className="filter-row">
        <div className="filter-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, thương hiệu, SKU..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="input-search"
            id="filter-search"
          />
        </div>

        <select
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
          className="input-select"
          id="filter-category"
        >
          {CATEGORIES_LIST.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={filters.sortField}
          onChange={(e) => handleChange('sortField', e.target.value as SortField)}
          className="input-select"
          id="filter-sort-field"
        >
          <option value="name">Tên</option>
          <option value="price">Giá</option>
          <option value="rating">Đánh giá</option>
          <option value="stock">Tồn kho</option>
        </select>

        <button
          className="btn-sort"
          onClick={() => handleChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
          title="Đổi chiều sắp xếp"
          id="btn-toggle-sort"
        >
          {filters.sortOrder === 'asc' ? '↑ Tăng' : '↓ Giảm'}
        </button>

        <button className="btn-reset" onClick={handleReset} id="btn-reset-filter">
          ↺ Đặt lại
        </button>
      </div>

      <div className="filter-row filter-row-secondary">
        <label className="filter-label">
          Giá: {filters.minPrice * 1000}đ – {filters.maxPrice * 1000}đ
          <div className="range-wrap">
            <input
              type="range" min={0} max={500} step={10}
              value={filters.minPrice}
              onChange={(e) => handleChange('minPrice', +e.target.value)}
              className="input-range"
              id="filter-min-price"
            />
            <input
              type="range" min={500} max={1000} step={10}
              value={filters.maxPrice}
              onChange={(e) => handleChange('maxPrice', +e.target.value)}
              className="input-range"
              id="filter-max-price"
            />
          </div>
        </label>

        <label className="filter-label">
          Đánh giá tối thiểu: {filters.minRating > 0 ? `${filters.minRating}★` : 'Tất cả'}
          <input
            type="range" min={0} max={5} step={0.5}
            value={filters.minRating}
            onChange={(e) => handleChange('minRating', +e.target.value)}
            className="input-range"
            id="filter-min-rating"
          />
        </label>

        <div className="filter-stats">
          <span>Hiển thị <strong>{filteredCount.toLocaleString()}</strong> / {totalCount.toLocaleString()} sản phẩm</span>
        </div>
      </div>
    </div>
  );
});

export default FilterBar;
