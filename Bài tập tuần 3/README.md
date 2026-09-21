# Lập Trình Web Nâng Cao - Bài Tập Tuần 3: Redux Toolkit Shopping Cart

Hệ thống quản lý giỏ hàng và danh mục sản phẩm hoàn chỉnh được xây dựng bằng **Redux Toolkit (RTK)**, **React 19**, **TypeScript** và **Vite**, tuân thủ 100% kiến trúc chuẩn **Feature-Based**.

---

## 🎯 Bảng Đối Chiếu 100% Yêu Cầu Đề Bài

| Yêu Cầu Đề Bài | Trạng Thái | Vị Trí Triển Khai Trong Mã Nguồn |
| :--- | :---: | :--- |
| **1. Module giỏ hàng hoàn chỉnh gồm `cartSlice` & `productsSlice`** | ✅ Hoàn thành | [`src/features/cart/cartSlice.ts`](src/features/cart/cartSlice.ts)<br>[`src/features/products/productsSlice.ts`](src/features/products/productsSlice.ts) |
| **2. `productsSlice` dùng `createAsyncThunk` lấy danh sách sản phẩm từ API giả lập** | ✅ Hoàn thành | Thunk `fetchProducts` trong [`productsSlice.ts`](src/features/products/productsSlice.ts) gọi service giả lập có delay [`src/services/mockApi.ts`](src/services/mockApi.ts) |
| **3. Khuyến khích thử RTK Query để lấy điểm cộng** | 🌟 Hoàn thành (Bonus) | [`src/features/products/productsApi.ts`](src/features/products/productsApi.ts) sử dụng `createApi` + `fakeBaseQuery`. Có nút bấm trực tiếp trên giao diện để chuyển đổi kiểm thử giữa `createAsyncThunk` và `RTK Query` |
| **4. `cartSlice` hỗ trợ thêm, xoá, cập nhật số lượng sản phẩm** | ✅ Hoàn thành | Reducers: `addToCart`, `removeFromCart`, `updateQuantity`, `incrementQuantity`, `decrementQuantity`, `clearCart`, `applyDiscountCode` |
| **5. Toàn bộ component chỉ dùng `useAppDispatch`/`useAppSelector` đã gõ kiểu** | ✅ Hoàn thành | [`src/app/hooks.ts`](src/app/hooks.ts) định nghĩa `useAppDispatch` và `useAppSelector`. 100% component nhập từ đây, không import trực tiếp từ `react-redux` |
| **6. Tổ chức thư mục đúng chuẩn Feature-Based** | ✅ Hoàn thành | Phân tách rành mạch: `src/features/cart`, `src/features/products`, `src/app/store.ts`, `src/app/hooks.ts` |

---

## 📁 Cấu Trúc Thư Mục Chuẩn Feature-Based

```
Bài tập tuần 3/
├── public/
├── src/
│   ├── app/
│   │   ├── store.ts             # Redux Store cấu hình reducers & RTK Query middleware
│   │   └── hooks.ts             # Typed hooks useAppDispatch & useAppSelector
│   ├── features/
│   │   ├── products/
│   │   │   ├── types.ts         # Types Product, ProductsState, Filter, Sort
│   │   │   ├── productsSlice.ts # createAsyncThunk fetchProducts + reducers
│   │   │   ├── productsApi.ts   # RTK Query createApi (Điểm cộng)
│   │   │   ├── ProductCard.tsx  # Component thẻ sản phẩm
│   │   │   └── ProductList.tsx  # Danh sách sản phẩm, lọc danh mục, tìm kiếm
│   │   └── cart/
│   │       ├── types.ts         # Types CartItem, CartState
│   │       ├── cartSlice.ts     # Actions thêm, xoá, cập nhật số lượng, selectors
│   │       ├── CartDrawer.tsx   # Drawer giỏ hàng trượt mượt mà
│   │       ├── CartItemRow.tsx  # Dòng hiển thị sản phẩm (+/- số lượng, xoá)
│   │       └── CartSummary.tsx  # Bảng tính tạm tính, voucher, phí ship, thanh toán
│   ├── components/
│   │   ├── Navbar.tsx           # Thanh điều hướng với badge giỏ hàng thời gian thực
│   │   ├── HeroBanner.tsx       # Banner thông tin bài tập
│   │   ├── ArchitectureSection.tsx # Đối chiếu mã nguồn trực quan ngay trên UI
│   │   └── ToastContext.tsx     # Hệ thống Toast thông báo trải nghiệm người dùng
│   ├── services/
│   │   └── mockApi.ts           # Dữ liệu sản phẩm và API Promise giả lập delay
│   ├── utils/
│   │   └── formatters.ts        # Helper format tiền tệ VNĐ
│   ├── App.tsx                  # Layout chính của ứng dụng
│   ├── index.css                # Toàn bộ CSS Design System hiện đại
│   ├── main.tsx                 # Khởi tạo React App bọc trong Redux Provider
│   └── vite-env.d.ts            # Vite client types
├── index.html                   # HTML template với Google Font Plus Jakarta Sans
├── package.json                 # Dependencies Redux Toolkit, React 19, Lucide...
├── tsconfig.json                # TypeScript compiler options
└── vite.config.ts               # Vite configuration
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### 1. Di chuyển vào thư mục bài tập tuần 3:
```bash
cd "Bài tập tuần 3"
```

### 2. Cài đặt các gói phụ thuộc (nếu chưa cài):
```bash
npm install
```

### 3. Khởi động môi trường phát triển (Development Server):
```bash
npm run dev
```
Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:5174/`

### 4. Kiểm tra biên dịch TypeScript và Build đóng gói:
```bash
npm run build
```

---

## 💡 Các Tính Năng Nổi Bật Được Tích Hợp

1. **Dual Data Fetching Mode**:
   - Cho phép giảng viên chuyển đổi tức thời giữa **createAsyncThunk** và **RTK Query** ngay tại thanh điều khiển trên đầu trang sản phẩm để đối chứng cơ chế hoạt động.
2. **Quản lý Giỏ Hàng Thông Minh**:
   - Tự động cộng dồn số lượng khi bấm thêm sản phẩm đã có.
   - Kiểm soát giới hạn tồn kho: không thể tăng vượt quá số lượng `stock` của sản phẩm.
   - Nhập số lượng trực tiếp trong ô input hoặc bấm nút `+` / `-`.
   - Giảm số lượng về 0 tự động chuyển sang trạng thái xoá.
   - Nút xoá từng dòng hoặc nút "Xoá tất cả" có hộp thoại xác nhận.
3. **Mã Giảm Giá (Voucher) Tự Động**:
   - Thử các mã: `GIAM10` (Giảm 10%), `VIP20` (Giảm 20%), `FREESHIP` (Miễn phí vận chuyển).
   - Tự động miễn phí vận chuyển cho đơn hàng từ `5.000.000 ₫`.
4. **Trải Nghiệm Người Dùng (UX/UI)**:
   - Thông báo Toast sinh động mỗi khi thực hiện tác vụ giỏ hàng.
   - Skeleton loading hiệu ứng shimmer khi đang tải sản phẩm.
   - Phản hồi trực quan số lượng sản phẩm đang có trong giỏ ngay trên nút "Thêm giỏ hàng".
