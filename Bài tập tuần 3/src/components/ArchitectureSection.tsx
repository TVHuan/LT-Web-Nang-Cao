import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code2, Folder, CheckCircle2 } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="architecture-section">
      <div className="container">
        <div
          className="architecture-header"
          onClick={() => setIsExpanded(!isExpanded)}
          role="button"
          tabIndex={0}
        >
          <div className="architecture-title-group">
            <div className="arch-icon-box">
              <Code2 size={20} />
            </div>
            <div>
              <h3 className="arch-heading">Kiến Trúc Dự Án Feature-Based & Hướng Dẫn Kỹ Thuật</h3>
              <p className="arch-desc">Bấm để xem đối chiếu chi tiết các yêu cầu của đề bài với mã nguồn</p>
            </div>
          </div>
          <button type="button" className="btn-arch-toggle" aria-label="Đóng mở chi tiết">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {isExpanded && (
          <div className="architecture-content">
            <div className="arch-grid">
              {/* Cột 1: Cấu trúc thư mục */}
              <div className="arch-card">
                <h4>
                  <Folder size={18} className="text-primary" /> Cấu trúc thư mục chuẩn Feature-Based
                </h4>
                <pre className="file-tree">
{`src/
├── app/
│   ├── store.ts         # Redux Store cấu hình reducers & RTK Query middleware
│   └── hooks.ts         # useAppDispatch & useAppSelector typed hooks
├── features/
│   ├── products/
│   │   ├── types.ts           # Type definitions (Product, ProductsState)
│   │   ├── productsSlice.ts   # createAsyncThunk fetchProducts + reducers
│   │   ├── productsApi.ts     # RTK Query createApi (Điểm cộng)
│   │   ├── ProductCard.tsx    # Card sản phẩm (useAppDispatch, useAppSelector)
│   │   └── ProductList.tsx    # Danh sách, tìm kiếm, lọc, chọn Thunk / RTK Query
│   └── cart/
│       ├── types.ts           # Type definitions (CartItem, CartState)
│       ├── cartSlice.ts       # add, remove, update qty, clear, voucher, selectors
│       ├── CartDrawer.tsx     # Drawer giỏ hàng trượt mượt mà
│       ├── CartItemRow.tsx    # Từng món hàng (+, -, input, xoá)
│       └── CartSummary.tsx    # Tổng tiền, giảm giá, phí ship, thanh toán
├── components/          # Navbar, HeroBanner, ToastContext...
├── services/
│   └── mockApi.ts       # Giả lập API có độ trễ network delay
├── utils/
│   └── formatters.ts    # Format tiền tệ VNĐ
├── App.tsx
├── index.css
└── main.tsx             # Provider store`}
                </pre>
              </div>

              {/* Cột 2: Bảng đối chiếu yêu cầu */}
              <div className="arch-card">
                <h4>
                  <CheckCircle2 size={18} className="text-success" /> Đối chiếu 100% Yêu Cầu Đề Bài
                </h4>
                <ul className="requirement-list">
                  <li>
                    <strong>Module giỏ hàng hoàn chỉnh:</strong> Gồm <code>cartSlice</code> và{' '}
                    <code>productsSlice</code> được tách biệt và liên kết nhịp nhàng.
                  </li>
                  <li>
                    <strong>productsSlice với createAsyncThunk:</strong> Thunk{' '}
                    <code>fetchProducts</code> xử lý cả 3 trạng thái pending, fulfilled, rejected từ mock API.
                  </li>
                  <li>
                    <strong>Điểm cộng RTK Query:</strong> Triển khai thêm <code>productsApi</code> với{' '}
                    <code>createApi</code> và <code>fakeBaseQuery</code>. Người dùng có thể bấm đổi nguồn dữ liệu trực tiếp trên UI!
                  </li>
                  <li>
                    <strong>cartSlice đầy đủ:</strong> Hỗ trợ <code>addToCart</code>, <code>removeFromCart</code>,{' '}
                    <code>updateQuantity</code>, <code>incrementQuantity</code>, <code>decrementQuantity</code>,{' '}
                    <code>clearCart</code>, và <code>applyDiscountCode</code>.
                  </li>
                  <li>
                    <strong>100% Typed Hooks:</strong> Không dùng <code>useDispatch/useSelector</code> trực tiếp từ thư viện ở bất kỳ component nào, toàn bộ đều dùng <code>useAppDispatch</code> và <code>useAppSelector</code> từ <code>src/app/hooks.ts</code>.
                  </li>
                  <li>
                    <strong>Tổ chức chuẩn Feature-Based:</strong> Cấu trúc thư mục chia theo <code>features/cart</code>, <code>features/products</code>, <code>app/store.ts</code>, <code>app/hooks.ts</code>.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
