import React from 'react';
import { Navbar } from './components/Navbar';
import { ProductList } from './features/products/ProductList';
import { CartDrawer } from './features/cart/CartDrawer';
import { ToastProvider } from './components/ToastContext';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <div className="app-container">
        {/* Thanh điều hướng */}
        <Navbar />

        {/* Nội dung chính: Danh sách sản phẩm */}
        <main className="container main-content" id="products-list-anchor">
          <ProductList />
        </main>

        {/* Ngăn kéo giỏ hàng */}
        <CartDrawer />

        {/* Footer */}
        <footer className="site-footer">
          <div className="container footer-container">
            <p>© 2026 TECHPRO STORE. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
};

export default App;
