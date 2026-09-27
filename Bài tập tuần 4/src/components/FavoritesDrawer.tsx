import React from 'react';
import { X, Trash2, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { formatCurrency } from '../utils/formatters';
import { useToast } from './Toast';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({ isOpen, onClose }) => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const totalValue = favorites.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (id: string, name: string) => {
    removeFavorite(id);
    showToast(`Đã xoá "${name}" khỏi mục yêu thích`, 'remove');
  };

  const handleClearAll = () => {
    if (favorites.length === 0) return;
    if (window.confirm('Bạn có chắc chắn muốn xoá toàn bộ danh sách sản phẩm yêu thích không?')) {
      clearFavorites();
      showToast('Đã làm trống toàn bộ danh sách yêu thích', 'clear');
    }
  };

  return (
    <div className="drawer-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <div className="drawer-icon-wrap">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h2 className="drawer-title">Sản Phẩm Yêu Thích</h2>
              <p className="drawer-subtitle">
                {favorites.length > 0 ? `Bạn đang có ${favorites.length} sản phẩm quan tâm` : 'Danh sách của bạn đang trống'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="drawer-close-btn" aria-label="Đóng ngăn kéo">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {favorites.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon-wrap">
                <Heart className="w-12 h-12 text-slate-300 stroke-[1.5]" />
              </div>
              <h3 className="empty-title">Chưa có sản phẩm yêu thích nào</h3>
              <p className="empty-desc">
                Nhấp vào biểu tượng trái tim ở bất kỳ sản phẩm nào để lưu lại danh sách các món đồ bạn quan tâm nhất.
              </p>
              <button onClick={onClose} className="btn-explore">
                <Sparkles className="w-4 h-4" />
                <span>Khám phá sản phẩm ngay</span>
              </button>
            </div>
          ) : (
            <div className="favorites-list">
              {favorites.map((product) => (
                <div key={product.id} className="favorite-item-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="fav-item-image"
                  />
                  <div className="fav-item-details">
                    <span className="fav-item-category">{product.category}</span>
                    <h4 className="fav-item-name">{product.name}</h4>
                    <div className="fav-item-pricing">
                      <span className="fav-item-price">{formatCurrency(product.price)}</span>
                      {product.originalPrice && (
                        <span className="fav-item-original-price">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    {product.addedAt && (
                      <span className="fav-item-time">Thêm lúc: {product.addedAt}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemove(product.id, product.name)}
                    className="fav-item-remove-btn"
                    title="Bỏ khỏi yêu thích"
                    aria-label={`Bỏ ${product.name} khỏi yêu thích`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {favorites.length > 0 && (
          <div className="drawer-footer">
            <div className="total-row">
              <span className="total-label">Tổng giá trị ước tính:</span>
              <span className="total-amount">{formatCurrency(totalValue)}</span>
            </div>

            <div className="drawer-actions">
              <button
                onClick={handleClearAll}
                className="btn-danger-outline"
                title="Xoá tất cả sản phẩm khỏi yêu thích"
              >
                <Trash2 className="w-4 h-4" />
                <span>Xóa tất cả</span>
              </button>

              <button
                onClick={onClose}
                className="btn-primary"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Tiếp tục chọn</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
