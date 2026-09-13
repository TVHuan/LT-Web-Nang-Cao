import React, { useState } from 'react';
import {
  Layers,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Cpu,
  Sparkles,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { Accordion } from './components/Accordion';
import { ProductList } from './components/ProductList/ProductList';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'accordion' | 'pagination'>('accordion');
  const [isCollapsible, setIsCollapsible] = useState<boolean>(true);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-brand">
            <span className="brand-badge">LTWNC</span>
            <div>
              <h1 className="brand-title">Bài Tập Tuần 2</h1>
              <p className="brand-subtitle">Compound Component Accordion &amp; Custom Hook usePagination</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="app-nav-tabs">
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'accordion' ? 'nav-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('accordion')}
            >
              <Layers size={18} />
              <span>Accordion</span>
            </button>
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'pagination' ? 'nav-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('pagination')}
            >
              <ShoppingBag size={18} />
              <span>Danh Sách Sản Phẩm</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* TAB 1: ACCORDION COMPOUND COMPONENT */}
        {activeTab === 'accordion' && (
          <div className="content-section">
            <div className="card-box">
              <div className="card-box__header">
                <div>
                  <h2 className="card-box__title">Câu Hỏi Thường Gặp &amp; Chính Sách</h2>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '4px' }}>
                    Chỉ mở tối đa 1 panel tại một thời điểm (khi mở panel mới, panel cũ tự động đóng)
                  </p>
                </div>

                <button
                  type="button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'none',
                    border: '1px solid #e2e8f0',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: isCollapsible ? '#2563eb' : '#64748b',
                  }}
                  onClick={() => setIsCollapsible(!isCollapsible)}
                  title="Cho phép đóng lại khi click vào chính panel đang mở"
                >
                  {isCollapsible ? <ToggleRight size={20} color="#2563eb" /> : <ToggleLeft size={20} />}
                  <span>Thu gọn khi click lại: {isCollapsible ? 'Bật' : 'Tắt'}</span>
                </button>
              </div>

              {/* Compound Component Accordion */}
              <Accordion defaultActiveId="panel-1" collapsible={isCollapsible}>
                <Accordion.Item id="panel-1">
                  <Accordion.Header
                    icon={<ShieldCheck size={20} />}
                    subtitle="Cam kết sản phẩm mới 100%, nguyên seal và bảo hành chính hãng"
                  >
                    Chính sách bảo hành và đổi mới sản phẩm
                  </Accordion.Header>
                  <Accordion.Body>
                    Mọi thiết bị điện tử mua tại cửa hàng đều được hưởng chính sách bảo hành 12 tháng chính hãng
                    toàn quốc. Trong 30 ngày đầu tiên kể từ ngày nhận hàng, nếu phát sinh lỗi từ nhà sản xuất
                    (lỗi phần cứng, điểm chết màn hình, nguồn chập chờn...), quý khách sẽ được <strong>1 đổi 1 mới 100% ngay lập tức</strong> mà không mất thêm bất kỳ chi phí nào.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item id="panel-2">
                  <Accordion.Header
                    icon={<Truck size={20} />}
                    subtitle="Giao hàng hỏa tốc trong 2 giờ nội thành, miễn phí toàn quốc đơn từ 1.000.000đ"
                  >
                    Thời gian và quy trình giao nhận hàng
                  </Accordion.Header>
                  <Accordion.Body>
                    Đơn hàng tại khu vực Hà Nội và TP.HCM hỗ trợ dịch vụ giao hỏa tốc nhận hàng trong vòng 2 giờ.
                    Đối với các tỉnh thành khác, thời gian giao hàng dự kiến từ 24 - 48 giờ làm việc thông qua các đơn vị
                    vận chuyển uy tín (Viettel Post, GHN, GHTK). Quý khách hoàn toàn được quyền đồng kiểm ngoại quan
                    trước khi thanh toán.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item id="panel-3">
                  <Accordion.Header
                    icon={<RotateCcw size={20} />}
                    subtitle="Hỗ trợ trả hàng trong vòng 7 ngày nếu không hài lòng"
                  >
                    Quy định đổi trả và hoàn tiền
                  </Accordion.Header>
                  <Accordion.Body>
                    Nếu quý khách không hài lòng về sản phẩm hoặc đổi ý, quý khách có thể gửi yêu cầu trả hàng
                    trong vòng 7 ngày kể từ ngày nhận. Sản phẩm cần còn nguyên vẹn tem niêm phong, phụ kiện, hộp và
                    hóa đơn mua hàng. Tiền sẽ được hoàn lại tài khoản ngân hàng của quý khách trong vòng 24 giờ sau khi kho nhận được sản phẩm.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item id="panel-4">
                  <Accordion.Header
                    icon={<CreditCard size={20} />}
                    subtitle="Chấp nhận thẻ Visa/MasterCard, VietQR 24/7 và trả góp 0%"
                  >
                    Phương thức thanh toán &amp; Trả góp 0%
                  </Accordion.Header>
                  <Accordion.Body>
                    Chúng tôi hỗ trợ đa dạng phương thức thanh toán an toàn và bảo mật cao:
                    <ul style={{ paddingLeft: '20px', marginTop: '8px', lineHeight: '1.7' }}>
                      <li>Thanh toán tiền mặt khi nhận hàng (COD).</li>
                      <li>Chuyển khoản ngân hàng tức thì qua VietQR 24/7.</li>
                      <li>Cổng thanh toán thẻ tín dụng nội địa &amp; quốc tế (Visa, Mastercard, JCB).</li>
                      <li>Chương trình trả góp 0% lãi suất kỳ hạn 3, 6, 9, 12 tháng qua thẻ tín dụng liên kết hơn 25 ngân hàng.</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item id="panel-5">
                  <Accordion.Header
                    icon={<Cpu size={20} />}
                    subtitle="Cấu hình phần cứng cao cấp &amp; tối ưu hóa hiệu năng"
                  >
                    Hỗ trợ kỹ thuật &amp; Cài đặt phần mềm
                  </Accordion.Header>
                  <Accordion.Body>
                    Khách hàng được hỗ trợ cài đặt hệ điều hành bản quyền, các phần mềm văn phòng, đồ họa và sao lưu dữ liệu hoàn toàn miễn phí trọn đời sản phẩm. Đội ngũ kỹ thuật viên luôn sẵn sàng hỗ trợ từ xa qua UltraViewer/TeamViewer 7 ngày trong tuần.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item id="panel-6">
                  <Accordion.Header
                    icon={<Sparkles size={20} />}
                    subtitle="Đặc quyền cho khách hàng thân thiết"
                  >
                    Chương trình tích điểm &amp; Ưu đãi VIP
                  </Accordion.Header>
                  <Accordion.Body>
                    Mỗi 100.000đ chi tiêu sẽ được tích lũy tương đương 1 điểm thưởng. Khách hàng đạt hạng Vàng và Kim Cương sẽ được giảm giá thêm 3-5% trên tổng hóa đơn cho mọi đơn hàng tiếp theo cùng quà tặng sinh nhật đặc biệt.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        )}

        {/* TAB 2: DANH SÁCH SẢN PHẨM (USEPAGINATION) */}
        {activeTab === 'pagination' && (
          <div className="content-section">
            <div className="card-box">
              <ProductList />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Lập Trình Web Nâng Cao • Bài Tập Tuần 2</p>
      </footer>
    </div>
  );
};
