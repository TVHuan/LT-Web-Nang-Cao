import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductGrid } from './components/ProductGrid';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { TechnicalModal } from './components/TechnicalModal';
import { ToastProvider } from './components/Toast';
import { FavoritesProvider } from './context/FavoritesContext';
import { EngineProvider } from './hooks/useFavorites';
import { mockProducts } from './data/mockProducts';
import { ShieldCheck, Truck, RotateCcw, Headphones, Code2 } from 'lucide-react';

function MainApp() {
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isTechnicalModalOpen, setIsTechnicalModalOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Navigation Bar */}
      <Navbar
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenTechnicalInfo={() => setIsTechnicalModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Product Grid & Controls */}
        <ProductGrid
          products={mockProducts}
          onOpenDrawer={() => setIsFavoritesOpen(true)}
        />
      </main>

      {/* Service Highlights / Trust Banner */}
      <section className="service-features-banner">
        <div className="service-features-container">
          <div className="service-feature-item">
            <div className="service-icon-box">
              <Truck className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <h4 className="service-title">Giao Hàng Siêu Tốc</h4>
              <p className="service-desc">Miễn phí giao hàng toàn quốc đơn từ 5tr</p>
            </div>
          </div>

          <div className="service-feature-item">
            <div className="service-icon-box">
              <ShieldCheck className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <h4 className="service-title">Chính Hãng 100%</h4>
              <p className="service-desc">Bảo hành 12 - 24 tháng chính hãng</p>
            </div>
          </div>

          <div className="service-feature-item">
            <div className="service-icon-box">
              <RotateCcw className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <h4 className="service-title">Đổi Mới 30 Ngày</h4>
              <p className="service-desc">1 đổi 1 nhanh chóng nếu có lỗi từ NSX</p>
            </div>
          </div>

          <div className="service-feature-item">
            <div className="service-icon-box">
              <Headphones className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <h4 className="service-title">Hỗ Trợ 24/7</h4>
              <p className="service-desc">Tư vấn viên kỹ thuật đồng hành mọi lúc</p>
            </div>
          </div>
        </div>
      </section>

      {/* Favorites Drawer Modal */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
      />

      {/* Technical Evaluation Modal (Nhận xét so sánh 5-7 dòng & Kiến trúc) */}
      <TechnicalModal
        isOpen={isTechnicalModalOpen}
        onClose={() => setIsTechnicalModalOpen(false)}
      />

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-top-row">
            <div>
              <h3 className="footer-brand">TechVault PRO</h3>
              <p className="footer-brand-desc">
                Nền tảng mua sắm thiết bị công nghệ cao cấp chính hãng hàng đầu.
              </p>
            </div>

            <div className="footer-links-group">
              <button
                onClick={() => setIsTechnicalModalOpen(true)}
                className="footer-tech-btn"
              >
                <Code2 className="w-4 h-4 text-rose-500" />
                <span>Báo Cáo Kỹ Thuật (So Sánh Zustand & Redux)</span>
              </button>
            </div>
          </div>

          <div className="footer-bottom-row">
            <p>© 2026 TechVault Inc. All rights reserved.</p>
            <p className="footer-tech-note">
              State Architecture: Zustand Store (<code>favoritesStore</code>) • React 19 • TypeScript
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <EngineProvider>
      <FavoritesProvider>
        <ToastProvider>
          <MainApp />
        </ToastProvider>
      </FavoritesProvider>
    </EngineProvider>
  );
}
