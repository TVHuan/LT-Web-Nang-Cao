import React, { useState } from 'react';
import { Tag, Trash2, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  applyDiscountCode,
  removeDiscountCode,
  clearCart,
  selectCartSubtotal,
  selectCartDiscountAmount,
  selectCartEffectiveShippingFee,
  selectCartGrandTotal,
} from './cartSlice';
import { formatCurrency } from '../../utils/formatters';
import { useToast } from '../../components/ToastContext';

export const CartSummary: React.FC = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const [inputCode, setInputCode] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const subtotal = useAppSelector(selectCartSubtotal);
  const discountAmount = useAppSelector(selectCartDiscountAmount);
  const shippingFee = useAppSelector(selectCartEffectiveShippingFee);
  const grandTotal = useAppSelector(selectCartGrandTotal);
  const discountCode = useAppSelector((state) => state.cart.discountCode);
  const discountPercent = useAppSelector((state) => state.cart.discountPercent);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    const code = inputCode.trim().toUpperCase();
    if (code === 'GIAM10' || code === 'VIP20' || code === 'FREESHIP') {
      dispatch(applyDiscountCode(code));
      showToast('Áp dụng thành công', `Đã áp dụng mã giảm giá: ${code}`, 'success');
      setInputCode('');
    } else {
      showToast(
        'Mã không hợp lệ',
        'Vui lòng thử các mã: GIAM10 (-10%), VIP20 (-20%), hoặc FREESHIP',
        'error'
      );
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeDiscountCode());
    showToast('Đã huỷ mã', 'Đã gỡ mã giảm giá khỏi đơn hàng', 'info');
  };

  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc chắn muốn xoá toàn bộ sản phẩm trong giỏ hàng không?')) {
      dispatch(clearCart());
      showToast('Đã làm trống giỏ', 'Toàn bộ sản phẩm trong giỏ đã được xoá', 'info');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderSuccess(true);
      dispatch(clearCart());
      showToast('Đặt hàng thành công!', 'Cảm ơn bạn đã mua hàng tại TECHPRO Store', 'success');
    }, 1200);
  };

  if (orderSuccess) {
    return (
      <div className="order-success-box">
        <CheckCircle2 size={48} className="success-icon" />
        <h3>Đặt hàng thành công!</h3>
        <p>Mã đơn hàng: #TP-{Math.floor(100000 + Math.random() * 900000)}</p>
        <p className="order-note">Chúng tôi sẽ sớm liên hệ để xác nhận và giao hàng cho bạn.</p>
        <button
          type="button"
          className="btn-primary btn-block"
          onClick={() => setOrderSuccess(false)}
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  return (
    <div className="cart-summary-wrapper">
      {/* Khung nhập mã giảm giá */}
      <div className="discount-section">
        <form onSubmit={handleApplyCoupon} className="coupon-form">
          <div className="coupon-input-group">
            <Tag size={16} className="coupon-icon" />
            <input
              type="text"
              placeholder="Nhập mã voucher (VD: GIAM10)"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="coupon-input"
            />
            <button type="submit" className="btn-apply-coupon">
              Áp dụng
            </button>
          </div>
        </form>

        {/* Gợi ý mã có sẵn */}
        <div className="coupon-suggestions">
          <span className="suggestion-label">Mã gợi ý:</span>
          {['GIAM10', 'VIP20', 'FREESHIP'].map((code) => (
            <button
              key={code}
              type="button"
              className={`coupon-tag ${discountCode === code ? 'active' : ''}`}
              onClick={() => {
                dispatch(applyDiscountCode(code));
                showToast('Áp dụng mã', `Đã áp dụng ${code}`, 'success');
              }}
            >
              {code}
            </button>
          ))}
        </div>

        {discountCode && (
          <div className="active-discount-badge">
            <span>
              Mã đang dùng: <strong>{discountCode}</strong>{' '}
              {discountPercent > 0 ? `(-${discountPercent}%)` : '(Miễn phí vận chuyển)'}
            </span>
            <button
              type="button"
              className="btn-remove-coupon"
              onClick={handleRemoveCoupon}
              title="Gỡ mã giảm giá"
            >
              Gỡ mã
            </button>
          </div>
        )}
      </div>

      {/* Chi tiết tính toán số tiền */}
      <div className="price-breakdown">
        <div className="price-row">
          <span>Tạm tính:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="price-row discount-row">
            <span>Chiết khấu ({discountPercent}%):</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}

        <div className="price-row">
          <div className="shipping-label">
            <span>Phí vận chuyển:</span>
            {subtotal >= 5000000 && (
              <span className="free-shipping-tag">Đơn &gt; 5 triệu Free</span>
            )}
          </div>
          <span>
            {shippingFee === 0 ? (
              <strong className="text-free">Miễn phí</strong>
            ) : (
              formatCurrency(shippingFee)
            )}
          </span>
        </div>

        <div className="price-divider"></div>

        <div className="price-row grand-total-row">
          <span>Tổng thanh toán:</span>
          <span className="grand-total-val">{formatCurrency(grandTotal)}</span>
        </div>
        <p className="vat-note">(Đã bao gồm VAT 10% nếu có)</p>
      </div>

      {/* Nút hành động */}
      <div className="summary-actions">
        <button
          type="button"
          className="btn-checkout"
          onClick={handleCheckout}
          disabled={isCheckingOut || subtotal === 0}
        >
          {isCheckingOut ? (
            'Đang xử lý đơn hàng...'
          ) : (
            <>
              Thanh toán ngay <ArrowRight size={18} />
            </>
          )}
        </button>

        <button
          type="button"
          className="btn-clear-cart"
          onClick={handleClearAll}
          disabled={subtotal === 0}
        >
          <Trash2 size={15} /> Xoá tất cả
        </button>
      </div>

      <div className="security-notice">
        <ShieldCheck size={16} />
        <span>Giao dịch an toàn & Bảo hành chính hãng 100%</span>
      </div>
    </div>
  );
};
