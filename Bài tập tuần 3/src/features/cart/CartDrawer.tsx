import React, { useEffect } from 'react';
import { ShoppingBag, X, ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  toggleCartDrawer,
  selectCartIsOpen,
  selectCartItems,
  selectCartTotalItems,
} from './cartSlice';
import { CartItemRow } from './CartItemRow';
import { CartSummary } from './CartSummary';

export const CartDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectCartIsOpen);
  const items = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartTotalItems);

  // Khoá scroll khi drawer đang mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Đóng khi bấm Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        dispatch(toggleCartDrawer(false));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-backdrop" onClick={() => dispatch(toggleCartDrawer(false))}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Giỏ hàng của bạn"
      >
        {/* Header Drawer */}
        <div className="cart-drawer-header">
          <div className="drawer-title-group">
            <ShoppingBag className="drawer-icon" size={22} />
            <h2 className="drawer-title">Giỏ hàng</h2>
            <span className="drawer-badge">{totalItems} món</span>
          </div>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => dispatch(toggleCartDrawer(false))}
            aria-label="Đóng giỏ hàng"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nội dung danh sách món hàng */}
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-icon-wrapper">
                <ShoppingBag size={56} className="empty-cart-icon" />
              </div>
              <h3>Giỏ hàng đang trống</h3>
              <p>Bạn chưa thêm sản phẩm nào vào giỏ. Hãy chọn những món đồ công nghệ yêu thích nhé!</p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => dispatch(toggleCartDrawer(false))}
              >
                <ArrowLeft size={16} /> Mua sắm ngay
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer tính toán chi phí */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <CartSummary />
          </div>
        )}
      </aside>
    </div>
  );
};
