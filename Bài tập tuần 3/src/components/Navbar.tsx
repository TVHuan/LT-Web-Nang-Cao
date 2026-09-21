import React from 'react';
import { ShoppingBag, Cpu } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleCartDrawer, selectCartTotalItems, selectCartSubtotal } from '../features/cart/cartSlice';
import { formatCurrency } from '../utils/formatters';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector(selectCartTotalItems);
  const subtotal = useAppSelector(selectCartSubtotal);

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="logo-icon-box">
            <Cpu size={22} className="logo-icon" />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              TECHPRO <span className="brand-accent">STORE</span>
            </div>
          </div>
        </div>

        {/* Action Button: Giỏ hàng */}
        <div className="header-actions">
          <button
            type="button"
            className="cart-trigger-btn"
            onClick={() => dispatch(toggleCartDrawer(true))}
            aria-label={`Mở giỏ hàng có ${totalItems} sản phẩm`}
          >
            <div className="cart-icon-wrapper">
              <ShoppingBag size={20} />
              {totalItems > 0 && <span className="cart-badge-count">{totalItems}</span>}
            </div>
            <div className="cart-btn-details">
              <span className="cart-btn-label">Giỏ hàng</span>
              <span className="cart-btn-total">
                {totalItems > 0 ? formatCurrency(subtotal) : '0 ₫'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
