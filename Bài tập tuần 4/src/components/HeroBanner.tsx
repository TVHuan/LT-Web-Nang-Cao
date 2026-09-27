import React from 'react';
import { Heart, ArrowDown, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

interface HeroBannerProps {
  totalProducts: number;
  onOpenFavorites: () => void;
  onScrollToProducts: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  totalProducts,
  onOpenFavorites,
  onScrollToProducts,
}) => {
  const { favoritesCount } = useFavorites();

  return (
    <section className="hero-banner">
      <div className="hero-glow-blob hero-glow-1"></div>
      <div className="hero-glow-blob hero-glow-2"></div>

      <div className="hero-inner">
        <div className="hero-badge">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Bộ Sưu Tập Thiết Bị Công Nghệ 2026</span>
        </div>

        <h1 className="hero-title">
          Khám Phá <span className="text-gradient">Đỉnh Cao Công Nghệ</span>
          <br />Thế Hệ Mới Nhất
        </h1>

        <p className="hero-subtitle">
          Trải nghiệm hệ sinh thái thiết bị di động, laptop và phụ kiện cao cấp.
          Lưu lại các sản phẩm bạn quan tâm vào danh sách yêu thích để dễ dàng theo dõi và mua sắm.
        </p>

        {/* E-commerce Trust Badges */}
        <div className="feature-pills-row">
          <div className="feature-pill">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Bảo hành chính hãng 12–24 tháng</span>
          </div>
          <div className="feature-pill">
            <Truck className="w-4 h-4 text-emerald-500" />
            <span>Giao hàng hoả tốc miễn phí</span>
          </div>
          <div className="feature-pill">
            <RotateCcw className="w-4 h-4 text-emerald-500" />
            <span>30 ngày đổi mới nếu có lỗi</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hero-buttons">
          <button onClick={onScrollToProducts} className="hero-btn-primary">
            <span>Xem tất cả sản phẩm ({totalProducts})</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button onClick={onOpenFavorites} className="hero-btn-favorite">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Danh sách yêu thích ({favoritesCount})</span>
          </button>
        </div>
      </div>
    </section>
  );
};
