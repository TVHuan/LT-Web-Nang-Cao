import React from 'react';
import { Heart, Star, Check } from 'lucide-react';
import { Product } from '../types/product';
import { formatCurrency } from '../utils/formatters';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from './Toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  const isFav = isFavorite(product.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product);
    if (isFav) {
      showToast(`Đã bỏ "${product.name}" khỏi danh sách yêu thích`, 'remove');
    } else {
      showToast(`Đã thêm "${product.name}" vào danh sách yêu thích!`, 'add');
    }
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className={`product-card ${isFav ? 'product-card-favorited' : ''}`}>
      {/* Product Image & Badges */}
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        {/* Favorite Button (Core requirement) */}
        <button
          onClick={handleToggle}
          className={`favorite-btn ${isFav ? 'favorite-btn-active' : ''}`}
          title={isFav ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'}
          aria-label={isFav ? `Bỏ ${product.name} khỏi yêu thích` : `Thêm ${product.name} vào yêu thích`}
        >
          <Heart
            className={`w-5 h-5 transition-transform duration-200 ${
              isFav ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-400 hover:text-rose-500'
            }`}
          />
        </button>

        {/* Tags */}
        <div className="product-badges">
          {product.tag && <span className="product-tag">{product.tag}</span>}
          {discountPercent > 0 && <span className="discount-tag">-{discountPercent}%</span>}
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="rating-score">{product.rating}</span>
            <span className="reviews-count">({product.reviewsCount})</span>
          </div>
        </div>

        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        <p className="product-description">{product.description}</p>

        {/* Price & Action Row */}
        <div className="product-footer">
          <div className="price-block">
            <span className="product-price">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="product-original-price">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleToggle}
            className={`quick-fav-action ${isFav ? 'favorited' : ''}`}
            aria-label="Thao tác yêu thích"
          >
            {isFav ? (
              <>
                <Check className="w-4 h-4 text-rose-600" />
                <span>Đã thích</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4" />
                <span>Yêu thích</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
