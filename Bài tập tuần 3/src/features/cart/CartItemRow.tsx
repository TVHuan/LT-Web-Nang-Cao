import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from './types';
import { useAppDispatch } from '../../app/hooks';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
} from './cartSlice';
import { formatCurrency } from '../../utils/formatters';
import { useToast } from '../../components/ToastContext';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { product, quantity } = item;

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
    showToast('Đã xoá sản phẩm', `Đã xoá "${product.name}" khỏi giỏ hàng`, 'info');
  };

  const handleIncrement = () => {
    if (quantity < product.stock) {
      dispatch(incrementQuantity(product.id));
    } else {
      showToast('Đã đạt giới hạn', `Sản phẩm này chỉ còn ${product.stock} chiếc trong kho`, 'error');
    }
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      handleRemove();
    } else {
      dispatch(decrementQuantity(product.id));
    }
  };

  const handleDirectQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;

    if (val <= 0) {
      handleRemove();
    } else if (val > product.stock) {
      dispatch(updateQuantity({ productId: product.id, quantity: product.stock }));
      showToast('Thông báo', `Đã điều chỉnh về số lượng tối đa trong kho (${product.stock})`, 'info');
    } else {
      dispatch(updateQuantity({ productId: product.id, quantity: val }));
    }
  };

  const lineTotal = product.price * quantity;

  return (
    <div className="cart-item-row" id={`cart-item-${product.id}`}>
      <img
        src={product.image}
        alt={product.name}
        className="cart-item-img"
        loading="lazy"
      />

      <div className="cart-item-details">
        <h4 className="cart-item-name" title={product.name}>
          {product.name}
        </h4>
        <div className="cart-item-unit-price">
          Đơn giá: <strong>{formatCurrency(product.price)}</strong>
        </div>

        <div className="cart-item-actions">
          {/* Cụm tăng giảm số lượng */}
          <div className="qty-counter">
            <button
              type="button"
              className="qty-btn"
              onClick={handleDecrement}
              title={quantity === 1 ? 'Xoá khỏi giỏ hàng' : 'Giảm 1'}
              aria-label="Giảm số lượng"
            >
              {quantity === 1 ? <Trash2 size={13} className="text-danger" /> : <Minus size={13} />}
            </button>

            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={handleDirectQuantityChange}
              className="qty-input"
              aria-label="Số lượng sản phẩm"
            />

            <button
              type="button"
              className="qty-btn"
              onClick={handleIncrement}
              disabled={quantity >= product.stock}
              title={quantity >= product.stock ? 'Đã đạt giới hạn kho' : 'Tăng 1'}
              aria-label="Tăng số lượng"
            >
              <Plus size={13} />
            </button>
          </div>

          {/* Thành tiền */}
          <div className="cart-item-line-total">
            {formatCurrency(lineTotal)}
          </div>

          {/* Nút xoá hoàn toàn */}
          <button
            type="button"
            className="cart-item-delete-btn"
            onClick={handleRemove}
            title="Xoá khỏi giỏ"
            aria-label={`Xoá ${product.name}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
