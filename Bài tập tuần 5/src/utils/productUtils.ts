import type { Product, FilterState } from '../types/product';

export function filterAndSortProducts(products: Product[], filters: FilterState): Product[] {
  let result = products;

  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  }

  if (filters.category && filters.category !== 'All') {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.minPrice > 0) {
    result = result.filter((p) => p.price >= filters.minPrice);
  }

  if (filters.maxPrice < 1000) {
    result = result.filter((p) => p.price <= filters.maxPrice);
  }

  if (filters.minRating > 0) {
    result = result.filter((p) => p.rating >= filters.minRating);
  }

  result = [...result].sort((a, b) => {
    const dir = filters.sortOrder === 'asc' ? 1 : -1;
    if (filters.sortField === 'name') return dir * a.name.localeCompare(b.name);
    return dir * (a[filters.sortField] - b[filters.sortField]);
  });

  return result;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price * 1000);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
