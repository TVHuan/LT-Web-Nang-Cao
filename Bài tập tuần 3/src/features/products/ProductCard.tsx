import React from 'react';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { Product } from './types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, selectCartItems } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/formatters';
import { useToast } from '../../components/ToastContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const { showToast } = useToast();

  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const currentQuantityInCart = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;
  const isMaxStockReached = currentQuantityInCart >= product.stock;

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (isOutOfStock || isMaxStockReached) return;

    dispatch(addToCart({ product, quantity: 1 }));
    showToast(
      'Đã thêm vào giỏ hàng',
      `${product.name} (Số lượng trong giỏ: ${currentQuantityInCart + 1})`,
      'success'
    );
  };

  return (
    <article className="product-card" id={`product-${product.id}`}>
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {discountPercent > 0 && (
          <span className="badge badge-discount">-{discountPercent}%</span>
        )}
        {product.featured && (
          <span className="badge badge-featured">Nổi bật</span>
        )}
      </div>

      <div className="product-content">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <div className="product-rating" title={`${product.rating} sao (${product.reviewCount} đánh giá)`}>
            <Star size={14} className="star-icon" fill="currentColor" />
            <span className="rating-num">{product.rating}</span>
            <span className="rating-count">({product.reviewCount})</span>
          </div>
        </div>

        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        <p className="product-desc">{product.description}</p>

        <div className="product-stock-status">
          {isOutOfStock ? (
            <span className="stock-badge stock-out">Hết hàng</span>
          ) : product.stock <= 5 ? (
            <span className="stock-badge stock-low">Chỉ còn {product.stock} sản phẩm</span>
          ) : (
            <span className="stock-badge stock-in">Còn {product.stock} sản phẩm</span>
          )}
        </div>

        <div className="product-footer">
          <div className="price-container">
            <span className="current-price">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="original-price">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>

          <button
            type="button"
            className={`btn-add-cart ${isMaxStockReached ? 'btn-max-stock' : ''}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock || isMaxStockReached}
            title={
              isOutOfStock
                ? 'Sản phẩm đã hết hàng'
                : isMaxStockReached
                ? 'Đã đạt giới hạn số lượng trong kho'
                : 'Thêm vào giỏ hàng'
            }
          >
            {isMaxStockReached ? (
              <>
                <Check size={16} /> Đã đạt tối đa ({currentQuantityInCart})
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> Thêm giỏ hàng {currentQuantityInCart > 0 && `(${currentQuantityInCart})`}
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
