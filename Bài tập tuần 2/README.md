# BÀI TẬP TUẦN 2: COMPOUND COMPONENT & CUSTOM HOOK GENERIC
**Môn học**: Lập Trình Web Nâng Cao  

---

## 📋 MỤC LỤC
1. [Tổng quan yêu cầu](#1-tổng-quan-yêu-cầu)
2. [Cấu trúc thư mục](#2-cấu-trúc-thư-mục)
3. [Hướng dẫn cài đặt & khởi chạy](#3-hướng-dẫn-cài-đặt--khởi-chạy)
4. [Chi tiết Bài 1: Compound Component Accordion](#4-chi-tiết-bài-1-compound-component-accordion)
5. [Chi tiết Bài 2: Custom Hook usePagination<T>](#5-chi-tiết-bài-2-custom-hook-usepaginationt)
6. [Các điểm nổi bật về kỹ thuật & tối ưu](#6-các-điểm-nổi-bật-về-kỹ-thuật--tối-ưu)

---

## 1. TỔNG QUAN YÊU CẦU

### Yêu cầu 1: Compound Component Accordion
- Xây dựng Accordion hoàn chỉnh sử dụng **React Context API** (tương tự pattern của component Tabs đã thực hành).
- Hỗ trợ nhiều panel, nhưng **chỉ mở 1 panel duy nhất tại một thời điểm**.
- Khi người dùng nhấp mở một panel mới, panel đang mở trước đó sẽ tự động thu gọn lại.
- Hỗ trợ thuộc tính `collapsible` (cho phép click lại vào panel đang mở để đóng tất cả).

### Yêu cầu 2: Custom Hook Generic `usePagination<T>`
- Viết custom hook generic `usePagination<T>`:
  - Nhận vào mảng dữ liệu generic `T[]` và số lượng `itemsPerPage` (số item/trang).
  - Trả về: `currentPage`, `totalPages`, `currentData`, cùng các hàm điều hướng `nextPage`, `prevPage`, `goToPage`, các cờ `canNext`, `canPrev`.
- Áp dụng vào **Danh sách sản phẩm công nghệ (Product List)** với giao diện trực quan, lọc danh mục, tìm kiếm, điều khiển chọn số lượng phần tử trên trang và nhảy trang linh hoạt.

---

## 2. CẤU TRÚC THƯ MỤC

```text
Bài tập tuần 2/
├── package.json                   # Cấu hình dự án & dependencies (React, Lucide, Vite)
├── tsconfig.json                  # Cấu hình TypeScript hỗ trợ JSX React
├── vite.config.ts                 # Cấu hình Vite bundler & React plugin
├── index.html                     # HTML Template tích hợp Google Fonts (Plus Jakarta Sans)
├── README.md                      # Tài liệu hướng dẫn chi tiết bài tập
└── src/
    ├── main.tsx                   # Điểm khởi chạy React application
    ├── App.tsx                    # Giao diện chính chứa Tab Accordion, Pagination & Tài liệu
    ├── index.css                  # Toàn bộ Design System (biến màu, reset CSS, layout)
    ├── vite-env.d.ts              # Khai báo kiểu môi trường Vite
    │
    ├── types/
    │   ├── accordion.types.ts     # Interface & Types cho Compound Component Accordion
    │   └── product.types.ts       # Interface Product cho danh sách sản phẩm
    │
    ├── hooks/
    │   └── usePagination.ts       # Custom Hook Generic usePagination<T>
    │
    ├── components/
    │   ├── Accordion/             # Module Compound Component Accordion
    │   │   ├── Accordion.tsx      # Component cha quản lý state Context
    │   │   ├── AccordionItem.tsx  # Panel item cung cấp ItemContext
    │   │   ├── AccordionHeader.tsx# Header trigger có chevron xoay & accessibility
    │   │   ├── AccordionBody.tsx  # Nội dung panel với CSS Grid animation
    │   │   ├── AccordionContext.tsx# React Context API & custom context hooks
    │   │   ├── Accordion.css      # CSS hiệu ứng đóng mở mượt mà
    │   │   └── index.ts           # Barrel export
    │   │
    │   └── ProductList/           # Module hiển thị sản phẩm kết hợp usePagination
    │       ├── ProductList.tsx    # Danh sách sản phẩm tích hợp bộ lọc & usePagination
    │       ├── ProductCard.tsx    # Thẻ sản phẩm chuẩn thương mại điện tử
    │       ├── PaginationControls.tsx # Thanh điều khiển phân trang đầy đủ tính năng
    │       └── ProductList.css    # CSS hiển thị lưới sản phẩm & thanh phân trang
    │
    └── data/
        └── mockProducts.ts        # Bộ dữ liệu 24 sản phẩm mẫu chân thực
```

---

## 3. HƯỚNG DẪN CÀI ĐẶT & KHỞI CHẠY

Tại thư mục gốc của bài tập tuần 2:

```bash
# 1. Di chuyển vào thư mục Bài tập tuần 2
cd "Bài tập tuần 2"

# 2. Cài đặt các gói thư viện
npm install

# 3. Khởi chạy môi trường phát triển (Dev Server)
npm run dev
```

Mở trình duyệt tại: `http://localhost:5173/` để trải nghiệm ứng dụng trực tiếp.

Để kiểm tra bản build đóng gói production:
```bash
npm run build
npm run preview
```

---

## 4. CHI TIẾT BÀI 1: COMPOUND COMPONENT ACCORDION

### 4.1. Kiến trúc Compound Component với Context API

Tương tự như pattern của thẻ `<select>` và `<option>` trong HTML tiêu chuẩn, Accordion được thiết kế thành một họ các component liên kết chặt chẽ:

- `<Accordion>`: Component cha, nắm giữ state `activeId` (ID của panel hiện đang mở hoặc `null`).
- `<Accordion.Item id="...">`: Bao bọc một mục accordion, truyền `id` thông qua `AccordionItemContext`.
- `<Accordion.Header>`: Nút bấm trigger mở/đóng, hiển thị tiêu đề, phụ đề, biểu tượng và mũi tên chevron tự động xoay 180°.
- `<Accordion.Body>`: Khung nội dung hiển thị khi panel đó tương ứng với `activeId`.

### 4.2. Cú pháp sử dụng

```tsx
import { Accordion } from './components/Accordion';

function FaqSection() {
  return (
    <Accordion defaultActiveId="faq-1" collapsible={true}>
      <Accordion.Item id="faq-1">
        <Accordion.Header icon={<ShieldCheck size={20} />}>
          Chính sách bảo hành
        </Accordion.Header>
        <Accordion.Body>
          Bảo hành chính hãng 12 tháng, lỗi 1 đổi 1 trong 30 ngày.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item id="faq-2">
        <Accordion.Header icon={<Truck size={20} />}>
          Chính sách giao hàng
        </Accordion.Header>
        <Accordion.Body>
          Giao nhanh trong 2h nội thành, miễn phí toàn quốc.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
```

### 4.3. Logic đảm bảo chỉ mở 1 panel tại một thời điểm

```typescript
const toggleItem = useCallback(
  (id: string) => {
    // Nếu click vào chính panel đang mở:
    //   - collapsible === true  -> đóng lại (activeId = null)
    //   - collapsible === false -> giữ nguyên (activeId = id)
    // Nếu click vào panel khác -> mở panel mới, tự động đóng panel cũ!
    const nextId = activeId === id ? (collapsible ? null : id) : id;
    if (nextId !== activeId) {
      setActiveId(nextId);
      onChange?.(nextId);
    }
  },
  [activeId, collapsible, onChange]
);
```

---

## 5. CHI TIẾT BÀI 2: CUSTOM HOOK USEPAGINATION<T>

### 5.1. Định nghĩa Generic & Signature

Hook được thiết kế độc lập, nhận bất kỳ kiểu dữ liệu nào thông qua TypeScript Generic `<T>`:

```typescript
export interface UsePaginationOptions<T> {
  data: T[];
  itemsPerPage: number;
  initialPage?: number;
}

export interface UsePaginationResult<T> {
  currentPage: number;
  totalPages: number;
  currentData: T[];
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  canNext: boolean;
  canPrev: boolean;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
}
```

### 5.2. Cách sử dụng trong Component

```tsx
import { usePagination } from './hooks/usePagination';
import { Product } from './types/product.types';

function ProductList({ products }: { products: Product[] }) {
  const {
    currentPage,
    totalPages,
    currentData: paginatedProducts,
    nextPage,
    prevPage,
    goToPage,
    canNext,
    canPrev,
    startIndex,
    endIndex,
    totalItems,
    itemsPerPage,
    setItemsPerPage,
  } = usePagination<Product>({
    data: products,
    itemsPerPage: 8,
    initialPage: 1,
  });

  return (
    <div>
      {/* Hiển thị sản phẩm trang hiện tại */}
      <div className="product-grid">
        {paginatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Điều khiển phân trang */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        canNext={canNext}
        canPrev={canPrev}
        nextPage={nextPage}
        prevPage={prevPage}
        goToPage={goToPage}
        // ...
      />
    </div>
  );
}
```

---

## 6. CÁC ĐIỂM NỔI BẬT VỀ KỸ THUẬT & TỐI ƯU

1. **Hiệu năng & Tránh Render Thừa**:
   - Mọi hàm điều hướng (`nextPage`, `prevPage`, `goToPage`, `toggleItem`) đều được bọc trong `useCallback`.
   - `currentData` và `totalPages` được ghi nhớ bằng `useMemo`, chỉ tính toán lại khi `data`, `currentPage`, hoặc `itemsPerPage` thay đổi.
2. **Auto-clamp Trang Hợp Lệ**:
   - Khi người dùng lọc danh mục làm danh sách từ 24 phần tử giảm xuống 5 phần tử (từ 3 trang xuống 1 trang), hook tự động kéo `currentPage` về trang cuối hợp lệ thông qua `useEffect`, chống lỗi trang trắng.
3. **Hiệu ứng Animation Accordion mượt mà**:
   - Sử dụng kỹ thuật CSS Grid `grid-template-rows: 0fr` $\rightarrow$ `1fr` giúp kích thước chiều cao co giãn tự nhiên theo nội dung động mà không bị giật lag hay phụ thuộc vào giá trị `max-height` cố định.
4. **Tiêu chuẩn Trợ Năng (Accessibility - a11y)**:
   - Các nút bấm trigger của Accordion có đầy đủ `aria-expanded`, `aria-controls`, `role="region"`, `id` liên kết chặt chẽ.
   - Hỗ trợ điều khiển bằng bàn phím (`Enter`, `Space`).
