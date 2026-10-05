import React, { memo } from 'react';
import type { Product } from '../types/product';
import { formatPrice } from '../utils/productUtils';

interface StatsBarProps {
  products: Product[];
  selectedCount: number;
}

// useMemo được dùng trong App để tính stats — component này chỉ nhận kết quả đã tính
const StatsBar = memo(function StatsBar({ products, selectedCount }: StatsBarProps) {
  // Những tính toán nặng này được memo hóa ở App.tsx qua useMemo
  const total = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const avgRating = products.length > 0
    ? products.reduce((sum, p) => sum + p.rating, 0) / products.length
    : 0;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  return (
    <div className="stats-bar">
      <div className="stat-item">
        <span className="stat-icon">📦</span>
        <div>
          <p className="stat-value">{total.toLocaleString()}</p>
          <p className="stat-label">Sản phẩm</p>
        </div>
      </div>
      <div className="stat-item">
        <span className="stat-icon">💰</span>
        <div>
          <p className="stat-value">{formatPrice(totalValue / 1000)}</p>
          <p className="stat-label">Tổng giá trị</p>
        </div>
      </div>
      <div className="stat-item">
        <span className="stat-icon">⭐</span>
        <div>
          <p className="stat-value">{avgRating.toFixed(2)}</p>
          <p className="stat-label">Đánh giá TB</p>
        </div>
      </div>
      <div className="stat-item">
        <span className="stat-icon">❌</span>
        <div>
          <p className="stat-value">{outOfStock.toLocaleString()}</p>
          <p className="stat-label">Hết hàng</p>
        </div>
      </div>
      <div className="stat-item stat-selected">
        <span className="stat-icon">✓</span>
        <div>
          <p className="stat-value">{selectedCount}</p>
          <p className="stat-label">Đã chọn</p>
        </div>
      </div>
    </div>
  );
});

export default StatsBar;
