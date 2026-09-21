/**
 * Format số tiền sang định dạng tiền tệ Việt Nam (VNĐ)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};
