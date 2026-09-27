import React, { useState } from 'react';
import { BookOpen, Layers, Award } from 'lucide-react';

export const ComparisonCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'review' | 'table'>('review');

  return (
    <section className="comparison-section" id="comparison-analysis">
      <div className="section-header-badge">
        <Award className="w-4 h-4 text-rose-500" />
        <span>Yêu cầu đề bài: Nhận xét so sánh (5–7 dòng)</span>
      </div>

      <div className="comparison-card">
        <div className="card-top">
          <div>
            <h2 className="comparison-title">
              Nhận Xét So Sánh: Zustand Store (favoritesStore) vs. Redux Toolkit (RTK)
            </h2>
            <p className="comparison-subtitle">
              Phân tích ưu/nhược điểm thực tế khi triển khai tính năng "Sản phẩm yêu thích"
            </p>
          </div>

          <div className="tab-switcher">
            <button
              onClick={() => setActiveTab('review')}
              className={`tab-btn ${activeTab === 'review' ? 'active' : ''}`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Đoạn nhận xét (5–7 dòng)</span>
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`tab-btn ${activeTab === 'table' ? 'active' : ''}`}
            >
              <Layers className="w-4 h-4" />
              <span>Bảng đối chiếu kỹ thuật</span>
            </button>
          </div>
        </div>

        {activeTab === 'review' ? (
          <div className="review-content-box">
            <div className="review-quote-badge">
              <span className="quote-number">5-7</span> Dòng Phân Tích Chuẩn Đề Bài
            </div>

            <ol className="review-lines-list">
              <li>
                <strong>1. Cú pháp tối giản & Không Boilerplate:</strong> Zustand cho phép tạo trực tiếp <code>favoritesStore</code> chỉ với một hàm <code>create()</code>, không bắt buộc cấu hình <code>Provider</code> bọc ngoài Root hay khai báo action types/reducers tách rời như Redux Toolkit.
              </li>
              <li>
                <strong>2. Dung lượng siêu nhẹ & Hiệu năng cao:</strong> Zustand chỉ nặng xấp xỉ <strong>~1.1 kB</strong> (so với Redux Toolkit + React-Redux nặng &gt; <strong>40 kB</strong>), khởi tạo nhanh tức thì và không làm phình kích thước bundle của ứng dụng.
              </li>
              <li>
                <strong>3. Kiểm soát Re-render chi tiết:</strong> Nhờ cơ chế <em>Atomic Selectors</em> (như <code>state =&gt; state.favorites</code>), component chỉ re-render khi đúng dữ liệu đó thay đổi, tối ưu hơn React Context mặc định và đơn giản hơn <code>useAppSelector</code> của RTK.
              </li>
              <li>
                <strong>4. Middleware tích hợp sẵn:</strong> Hỗ trợ trực tiếp <code>persist</code> (lưu tự động vào LocalStorage) và <code>devtools</code> chỉ bằng 1 dòng wrap, trong khi Redux cần cấu hình thêm redux-persist khá cồng kềnh.
              </li>
              <li>
                <strong>5. Nhược điểm khi mở rộng Enterprise:</strong> So với Redux Toolkit, Zustand thiếu một chuẩn quy ước kiến trúc khắt khe, không có sẵn <code>RTK Query</code> cho việc tự động caching/deduping dữ liệu server phức tạp quy mô lớn.
              </li>
              <li>
                <strong>6. Kết luận lựa chọn:</strong> Đối với tính năng độc lập, tập trung vào client-state như "Sản phẩm yêu thích", lựa chọn <strong>Zustand Store</strong> là giải pháp vượt trội hoàn hảo về tốc độ phát triển, độ mượt mà và tính thanh thoát của mã nguồn.
              </li>
            </ol>
          </div>
        ) : (
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Tiêu chí so sánh</th>
                  <th className="highlight-col">Zustand (Lựa chọn cài đặt)</th>
                  <th>Redux Toolkit (RTK)</th>
                  <th>React Context Nâng Cao</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Khối lượng mã (Boilerplate)</strong></td>
                  <td className="highlight-col text-emerald-600 font-semibold">Cực kỳ tối giản, không cần Provider</td>
                  <td>Nhiều (slice, store, hooks, provider)</td>
                  <td>Trung bình (reducer, context, provider)</td>
                </tr>
                <tr>
                  <td><strong>Kích thước thư viện (Bundle size)</strong></td>
                  <td className="highlight-col text-emerald-600 font-semibold">~1.1 kB (siêu nhẹ)</td>
                  <td>~40 kB+ (khá nặng)</td>
                  <td>0 kB (tích hợp sẵn trong React)</td>
                </tr>
                <tr>
                  <td><strong>Tối ưu hóa Re-render</strong></td>
                  <td className="highlight-col text-emerald-600 font-semibold">Tự động với Selector (chỉ render phần đổi)</td>
                  <td>Tốt nhờ Reselect / useAppSelector</td>
                  <td>Dễ re-render diện rộng nếu thiếu useMemo</td>
                </tr>
                <tr>
                  <td><strong>Hỗ trợ Persist LocalStorage</strong></td>
                  <td className="highlight-col text-emerald-600 font-semibold">Middleware <code>persist</code> 1 dòng cấu hình</td>
                  <td>Cần cài thêm <code>redux-persist</code></td>
                  <td>Tự viết <code>useEffect</code> đồng bộ</td>
                </tr>
                <tr>
                  <td><strong>Server Data Caching</strong></td>
                  <td className="highlight-col">Cần kết hợp TanStack Query</td>
                  <td className="text-emerald-600 font-semibold">Tích hợp sẵn <code>RTK Query</code> rất mạnh</td>
                  <td>Không có sẵn</td>
                </tr>
                <tr>
                  <td><strong>Khuyên dùng khi</strong></td>
                  <td className="highlight-col text-emerald-600 font-semibold">Ứng dụng vừa & nhỏ, Client UI State (như Yêu thích)</td>
                  <td>Dự án Enterprise lớn, luồng dữ liệu khổng lồ</td>
                  <td>State cơ bản đơn giản ít phân nhánh</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
