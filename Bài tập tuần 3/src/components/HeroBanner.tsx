import React from 'react';
import {
  CheckCircle2,
  FolderGit2,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  toggleCartDrawer,
  selectCartTotalItems,
  selectCartSubtotal,
} from '../features/cart/cartSlice';
import { formatCurrency } from '../utils/formatters';

export const HeroBanner: React.FC = () => {
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector(selectCartTotalItems);
  const subtotal = useAppSelector(selectCartSubtotal);

  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-dot"></span>
            LTWNC • BÀI TẬP TUẦN 3 • REDUX TOOLKIT & RTK QUERY
          </div>

          <h1 className="hero-title">
            Module Giỏ Hàng & Quản Lý Sản Phẩm Chuẩn{' '}
            <span className="gradient-text">Feature-Based</span>
          </h1>

          <p className="hero-subtitle">
            Dự án hoàn chỉnh triển khai đầy đủ các yêu cầu bài tập: <strong>productsSlice</strong> (createAsyncThunk & RTK Query), 
            <strong> cartSlice</strong> (thêm, xoá, cập nhật số lượng, voucher), 100% component dùng typed hooks 
            <strong> useAppDispatch / useAppSelector</strong>.
          </p>

          <div className="hero-checklist">
            <div className="checklist-item">
              <CheckCircle2 size={16} className="check-icon" />
              <span>productsSlice (createAsyncThunk API giả lập)</span>
            </div>
            <div className="checklist-item">
              <CheckCircle2 size={16} className="check-icon" />
              <span>cartSlice (Thêm, xoá, sửa số lượng, tính tiền, voucher)</span>
            </div>
            <div className="checklist-item">
              <CheckCircle2 size={16} className="check-icon" />
              <span>100% Typed Hooks (useAppDispatch / useAppSelector)</span>
            </div>
            <div className="checklist-item bonus-item">
              <Sparkles size={16} className="sparkle-icon" />
              <span>RTK Query createApi (Điểm cộng khuyến khích)</span>
            </div>
            <div className="checklist-item">
              <FolderGit2 size={16} className="check-icon" />
              <span>Cấu trúc feature-based: features/cart, features/products, app/store.ts, app/hooks.ts</span>
            </div>
          </div>

          <div className="hero-actions">
            <button
              type="button"
              className="btn-hero-cart"
              onClick={() => dispatch(toggleCartDrawer(true))}
            >
              <ShoppingBag size={18} />
              Xem giỏ hàng ({totalItems} món - {formatCurrency(subtotal)})
            </button>
            <a href="#products-list-anchor" className="btn-hero-explore">
              Khám phá sản phẩm
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
