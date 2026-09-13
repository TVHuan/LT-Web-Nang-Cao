import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  canNext: boolean;
  canPrev: boolean;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  itemsPerPage: number;
  next?: () => void;
  prev?: () => void;
  nextPage?: () => void;
  prevPage?: () => void;
  goToPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  canNext,
  canPrev,
  startIndex,
  endIndex,
  totalItems,
  itemsPerPage,
  next,
  prev,
  nextPage,
  prevPage,
  goToPage,
  setItemsPerPage,
}) => {
  const handleNext = next ?? nextPage ?? (() => {});
  const handlePrev = prev ?? prevPage ?? (() => {});
  const [jumpPageInput, setJumpPageInput] = useState('');

  // Thuật toán hiển thị dải trang thông minh (kèm dấu ...)
  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const delta = 1; // Số trang hiển thị quanh currentPage

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (
        (i === currentPage - delta - 1 && i > 1) ||
        (i === currentPage + delta + 1 && i < totalPages)
      ) {
        pages.push('...');
      }
    }

    // Lọc trùng lặp '...' liên tiếp
    return pages.filter((item, index) => item !== '...' || pages[index - 1] !== '...');
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      goToPage(pageNum);
      setJumpPageInput('');
    }
  };

  return (
    <div className="pagination-wrapper">
      {/* Thông tin số lượng item hiển thị */}
      <div className="pagination-info">
        <span>
          Đang hiển thị{' '}
          <strong>
            {totalItems === 0 ? 0 : startIndex} - {endIndex}
          </strong>{' '}
          trong tổng số <strong>{totalItems}</strong> sản phẩm
        </span>
      </div>

      {/* Điều khiển phân trang trung tâm */}
      <div className="pagination-center">
        {/* Nút về trang đầu */}
        <button
          type="button"
          className="pagination-btn pagination-btn--nav"
          onClick={() => goToPage(1)}
          disabled={!canPrev}
          title="Trang đầu"
          aria-label="Trang đầu"
        >
          <ChevronsLeft size={18} />
        </button>

        {/* Nút Trang trước */}
        <button
          type="button"
          className="pagination-btn pagination-btn--nav"
          onClick={handlePrev}
          disabled={!canPrev}
          title="Trang trước"
          aria-label="Trang trước"
        >
          <ChevronLeft size={18} />
          <span className="pagination-btn-label">Trước</span>
        </button>

        {/* Danh sách các số trang */}
        <div className="pagination-numbers">
          {getVisiblePages().map((pageItem, idx) => {
            if (pageItem === '...') {
              return (
                <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
                  ...
                </span>
              );
            }
            const pageNum = pageItem as number;
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                type="button"
                className={`pagination-number-btn ${
                  isActive ? 'pagination-number-btn--active' : ''
                }`}
                onClick={() => goToPage(pageNum)}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Nút Trang sau */}
        <button
          type="button"
          className="pagination-btn pagination-btn--nav"
          onClick={handleNext}
          disabled={!canNext}
          title="Trang tiếp"
          aria-label="Trang tiếp"
        >
          <span className="pagination-btn-label">Sau</span>
          <ChevronRight size={18} />
        </button>

        {/* Nút đến trang cuối */}
        <button
          type="button"
          className="pagination-btn pagination-btn--nav"
          onClick={() => goToPage(totalPages)}
          disabled={!canNext}
          title="Trang cuối"
          aria-label="Trang cuối"
        >
          <ChevronsRight size={18} />
        </button>
      </div>

      {/* Tùy chọn số item/trang & Nhảy trang */}
      <div className="pagination-extra">
        <div className="items-per-page-selector">
          <label htmlFor="itemsPerPageSelect">Hiển thị:</label>
          <select
            id="itemsPerPageSelect"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="select-items-per-page"
          >
            <option value={4}>4 / trang</option>
            <option value={8}>8 / trang</option>
            <option value={12}>12 / trang</option>
            <option value={16}>16 / trang</option>
          </select>
        </div>

        <form onSubmit={handleJumpSubmit} className="jump-to-page-form">
          <input
            type="number"
            min={1}
            max={totalPages}
            placeholder={`1-${totalPages}`}
            value={jumpPageInput}
            onChange={(e) => setJumpPageInput(e.target.value)}
            className="input-jump-page"
            aria-label="Nhập số trang cần tới"
          />
          <button type="submit" className="btn-jump-submit">
            Đi
          </button>
        </form>
      </div>
    </div>
  );
};
