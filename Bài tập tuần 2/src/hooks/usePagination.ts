import { useState, useMemo, useCallback, useEffect } from 'react';

export interface UsePaginationOptions<T> {
  data: T[];
  itemsPerPage: number;
  initialPage?: number;
}

export interface UsePaginationResult<T> {
  // Trả về theo đúng yêu cầu đề bài:
  currentPage: number;   // trang hiện tại
  totalPages: number;    // tổng số trang
  next: () => void;      // hàm next
  prev: () => void;      // hàm prev
  goToPage: (page: number) => void; // hàm goToPage

  // Dữ liệu và các helper bổ trợ cho danh sách sản phẩm:
  currentData: T[];      // danh sách item trang hiện tại
  items: T[];            // alias cho currentData
  paginatedData: T[];    // alias cho currentData
  nextPage: () => void;  // alias cho next
  prevPage: () => void;  // alias cho prev
  canNext: boolean;
  canPrev: boolean;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  itemsPerPage: number;
  setItemsPerPage: (size: number) => void;
}

/**
 * Custom Hook Generic usePagination<T>
 * Áp dụng phân trang cho danh sách dữ liệu T[]
 *
 * Hỗ trợ 2 cách gọi linh hoạt:
 * 1. usePagination(data, itemsPerPage, initialPage)
 * 2. usePagination({ data, itemsPerPage, initialPage })
 */
export function usePagination<T>(
  dataOrOptions: T[] | UsePaginationOptions<T>,
  itemsPerPageArg?: number,
  initialPageArg?: number
): UsePaginationResult<T> {
  // Chuẩn hóa tham số đầu vào
  const isArrayInput = Array.isArray(dataOrOptions);
  const data = isArrayInput ? dataOrOptions : dataOrOptions.data;
  const initialItemsPerPage = isArrayInput
    ? itemsPerPageArg ?? 8
    : dataOrOptions.itemsPerPage;
  const initialPage = isArrayInput
    ? initialPageArg ?? 1
    : dataOrOptions.initialPage ?? 1;

  const [itemsPerPage, setItemsPerPageState] = useState<number>(() =>
    Math.max(1, initialItemsPerPage)
  );
  const [currentPage, setCurrentPage] = useState<number>(() =>
    Math.max(1, initialPage)
  );

  const totalItems = data.length;

  // Tính tổng số trang (tối thiểu là 1)
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  // Đảm bảo currentPage không vượt quá totalPages khi data hoặc itemsPerPage thay đổi
  useEffect(() => {
    setCurrentPage((prev) => {
      if (prev > totalPages) return totalPages;
      if (prev < 1) return 1;
      return prev;
    });
  }, [totalPages]);

  const setItemsPerPage = useCallback((newSize: number) => {
    setItemsPerPageState(Math.max(1, newSize));
  }, []);

  // Hàm goToPage
  const goToPage = useCallback(
    (page: number) => {
      const targetPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(targetPage);
    },
    [totalPages]
  );

  // Hàm next
  const next = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  // Hàm prev
  const prev = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const canNext = currentPage < totalPages;
  const canPrev = currentPage > 1;

  // Cắt lát dữ liệu của trang hiện tại
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [data, currentPage, itemsPerPage]);

  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return {
    currentPage,
    totalPages,
    next,
    prev,
    goToPage,

    // Aliases & helpers
    nextPage: next,
    prevPage: prev,
    currentData,
    items: currentData,
    paginatedData: currentData,
    canNext,
    canPrev,
    startIndex,
    endIndex,
    totalItems,
    itemsPerPage,
    setItemsPerPage,
  };
}
