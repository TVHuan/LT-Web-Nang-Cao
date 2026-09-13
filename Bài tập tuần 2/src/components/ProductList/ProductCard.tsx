import React from 'react';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../types/product.types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [added, setAdded] = React.useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card">
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
        {product.badge && (
          <span className={`product-badge product-badge--${product.badge.toLowerCase().replace(/\s+/g, '-')}`}>
            {product.badge}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="product-discount-tag">-{discountPercent}%</span>
        )}
      </div>

      <div className="product-card__content">
        <div className="product-card__meta">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            <Star size={14} className="star-icon star-icon--filled" />
            <span className="rating-score">{product.rating}</span>
            <span className="reviews-count">({product.reviewsCount})</span>
          </div>
        </div>

        <h4 className="product-name" title={product.name}>
          {product.name}
        </h4>

        <p className="product-description">{product.description}</p>

        <div className="product-card__footer">
          <div className="product-price-box">
            <span className="current-price">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="original-price">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>

          <button
            type="button"
            className={`btn-add-cart ${added ? 'btn-add-cart--success' : ''}`}
            onClick={handleAddToCart}
            aria-label="Thêm vào giỏ hàng"
          >
            {added ? <Check size={18} /> : <ShoppingBag size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};
