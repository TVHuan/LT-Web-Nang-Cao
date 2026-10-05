import type { Product } from '../types/product';

const CATEGORIES = [
  'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports',
  'Toys', 'Beauty', 'Automotive', 'Food & Grocery', 'Health'
];

const BRANDS = [
  'Samsung', 'Apple', 'Nike', 'Adidas', 'Sony', 'LG', 'Dell',
  'HP', 'Asus', 'Lenovo', 'Zara', 'H&M', 'IKEA', 'Amazon Basics',
];

const ADJECTIVES = [
  'Premium', 'Ultra', 'Pro', 'Lite', 'Max', 'Mini', 'Smart', 'Advanced',
  'Classic', 'Deluxe', 'Elite', 'Essential', 'Ultimate', 'Special', 'Limited',
];

const NOUNS = [
  'Wireless Headphones', 'Running Shoes', 'Smart Watch', 'Coffee Maker',
  'Laptop Stand', 'Bluetooth Speaker', 'Yoga Mat', 'Kitchen Knife Set',
  'LED Desk Lamp', 'Portable Charger', 'Gaming Mouse', 'Mechanical Keyboard',
  'Air Purifier', 'Rice Cooker', 'Electric Toothbrush', 'Neck Massager',
  'Wall Calendar', 'Resistance Bands', 'Insulated Bottle', 'Travel Backpack',
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateProducts(count: number = 10000): Product[] {
  return Array.from({ length: count }, (_, i) => {
    const r = (offset: number) => seededRandom(i * 100 + offset);
    const category = CATEGORIES[Math.floor(r(1) * CATEGORIES.length)];
    const brand = BRANDS[Math.floor(r(2) * BRANDS.length)];
    const adj = ADJECTIVES[Math.floor(r(3) * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(r(4) * NOUNS.length)];
    const price = Math.round(r(5) * 9900 + 100) / 10; // 10 - 1000
    const stock = Math.floor(r(6) * 500);
    const rating = Math.round(r(7) * 40 + 10) / 10; // 1.0 - 5.0

    const colorIndex = Math.floor(r(8) * 360);
    const image = `https://picsum.photos/seed/${i + 1}/280/200`;

    return {
      id: i + 1,
      name: `${adj} ${noun}`,
      category,
      brand,
      price,
      stock,
      rating,
      image,
      description: `${brand} ${adj} ${noun} - High quality ${category.toLowerCase()} product with excellent performance and durability.`,
      sku: `${brand.substring(0, 3).toUpperCase()}-${category.substring(0, 3).toUpperCase()}-${String(i + 1).padStart(5, '0')}`,
    };
  });
}

export const ALL_PRODUCTS = generateProducts(10000);
export const CATEGORIES_LIST = ['All', ...CATEGORIES];
