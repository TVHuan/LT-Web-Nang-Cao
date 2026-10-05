import React, { memo } from 'react';
import type { Product } from '../types/product';
import { formatPrice, formatRating } from '../utils/productUtils';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isSelected: boolean;
}

// React.memo - Kỹ thuật Memoization: chỉ re-render khi props thực sự thay đổi
const ProductCard = memo(function ProductCard({ product, onSelect, isSelected }: ProductCardProps) {
  return (
    <div
      className={`product-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(product)}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(product)}
    >
      <div className="card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width={280}
          height={200}
        />
        <span className="card-badge">{product.category}</span>
      </div>
      <div className="card-body">
        <p className="card-brand">{product.brand}</p>
        <h3 className="card-name">{product.name}</h3>
        <p className="card-sku">SKU: {product.sku}</p>
        <div className="card-meta">
          <span className="card-rating">
            ★ {formatRating(product.rating)}
          </span>
          <span className={`card-stock ${product.stock === 0 ? 'out-of-stock' : ''}`}>
            {product.stock === 0 ? 'Hết hàng' : `Còn ${product.stock}`}
          </span>
        </div>
        <div className="card-footer">
          <span className="card-price">{formatPrice(product.price)}</span>
          <button
            className={`btn-add ${isSelected ? 'btn-selected' : ''}`}
            onClick={(e) => { e.stopPropagation(); onSelect(product); }}
          >
            {isSelected ? '✓ Đã chọn' : 'Chọn'}
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
