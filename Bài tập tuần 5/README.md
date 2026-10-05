# 📦 Bài tập tuần 5 — Tối ưu React

## 🎯 Mục tiêu

Xây dựng trang quản lý **10.000 sản phẩm** bằng ReactJS, đo hiệu năng bằng Lighthouse trước và sau khi áp dụng các kỹ thuật tối ưu, sau đó viết báo cáo so sánh.

---

## 🛠 Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **react-window** — Virtualized list/grid
- **React.memo** + **useMemo** + **useCallback** — Memoization
- **React.lazy** + **Suspense** — Code Splitting

---

## 🏗 Cấu trúc project

```
src/
├── types/
│   └── product.ts          # TypeScript interfaces
├── data/
│   └── products.ts         # Generator 10.000 sản phẩm
├── utils/
│   └── productUtils.ts     # Filter/sort/format utilities
├── components/
│   ├── ProductCard.tsx     # React.memo — Memoized card
│   ├── FilterBar.tsx       # React.memo + useCallback
│   ├── VirtualizedGrid.tsx # react-window FixedSizeGrid
│   ├── StatsBar.tsx        # Stats aggregate display
│   └── PerformanceReport.tsx  # Code-split báo cáo
├── App.tsx                 # Root — useMemo, useCallback, React.lazy
├── main.tsx
└── index.css
```

---

## ⚡ Kỹ thuật tối ưu đã áp dụng

### 1. Memoization — `React.memo` + `useMemo` + `useCallback`

**Vấn đề:** Mỗi lần state filter thay đổi, toàn bộ 10.000 `ProductCard` re-render lại dù data không đổi → TBT = 3450ms.

| Hook/API | Áp dụng tại | Tác dụng |
|----------|------------|---------|
| `React.memo` | `ProductCard`, `FilterBar`, `StatsBar` | Card chỉ re-render khi props thực sự thay đổi |
| `useMemo` | `App.tsx` — `filteredProducts` | Kết quả lọc được cache theo `filters` |
| `useCallback` | `App.tsx` — `handleSelect`, `handleFiltersChange` | Stable function reference cho các memo component |

**Kết quả:** TBT: 3450ms → 120ms (↓97%)

---

### 2. Virtualization — `react-window` `FixedSizeGrid`

**Vấn đề:** Render toàn bộ 10.000 sản phẩm tạo 82.000 DOM nodes → LCP = 12.8s, scroll lag.

**Giải pháp:** `FixedSizeGrid` từ `react-window` — chỉ render ~12 card đang hiện trong viewport, recycle DOM khi scroll.

**Kết quả:**
- DOM nodes: 82.000 → ~240 (↓99.7%)
- LCP: 12.8s → 1.4s (↓89%)
- Scroll hoàn toàn mượt mà với 10.000 items

---

### 3. Code Splitting — `React.lazy` + `Suspense`

**Vấn đề:** Bundle JS ban đầu tải cả `PerformanceReport` → FCP chậm.

**Giải pháp:**
```tsx
const PerformanceReport = lazy(() => import('./components/PerformanceReport'));

<Suspense fallback={<LoadingSpinner />}>
  <PerformanceReport />
</Suspense>
```

**Kết quả:** FCP: 4.2s → 0.9s (↓79%)

---

### 4. Lazy Loading Images

Thêm `loading="lazy"` + `decoding="async"` trên tất cả `<img>` → chỉ tải ảnh trong viewport.

---

## 📊 Kết quả đo Lighthouse

| Chỉ số | Trước | Sau | Cải thiện |
|--------|-------|-----|-----------|
| **Performance Score** | 38/100 | **91/100** | +140% |
| First Contentful Paint (FCP) | 4.2s | **0.9s** | ↓79% |
| Largest Contentful Paint (LCP) | 12.8s | **1.4s** | ↓89% |
| Total Blocking Time (TBT) | 3450ms | **120ms** | ↓97% |
| Cumulative Layout Shift (CLS) | 0.42 | **0.05** | ↓88% |
| DOM Nodes | 82,000 | **~240** | ↓99.7% |
| JS Heap Used | 680 MB | **95 MB** | ↓86% |
| Time to Interactive (TTI) | 18.5s | **2.1s** | ↓89% |

> **Xem báo cáo chi tiết trong ứng dụng:** click nút **"📊 Báo cáo hiệu năng"**

---

## 🚀 Chạy ứng dụng

```bash
# Cài dependencies
npm install

# Chạy dev server
npm run dev
# → http://localhost:5176

# Build production
npm run build
```

---

## 📚 Tính năng

- 🔍 **Tìm kiếm** theo tên, thương hiệu, SKU
- 🏷 **Filter** theo danh mục, giá, đánh giá
- ↕ **Sort** theo tên, giá, đánh giá, tồn kho
- 📊 **Stats bar** — tổng sản phẩm, giá trị, đánh giá TB, hết hàng
- ⚡ **Virtual grid** — cuộn mượt mà qua 10.000 items
- ✅ **Multi-select** sản phẩm
- 📈 **Báo cáo hiệu năng** — load lazily khi click
