import { Product } from '../features/products/types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Bàn phím cơ Keychron Q1 Pro Wireless',
    price: 4390000,
    originalPrice: 4890000,
    category: 'Bàn phím',
    description: 'Bàn phím cơ Custom không dây 75% núm xoay, vỏ nhôm CNC nguyên khối, kết nối Bluetooth 5.1 & Type-C, switch Banana tactile êm ái.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    stock: 12,
    rating: 4.9,
    reviewCount: 128,
    featured: true,
  },
  {
    id: 'prod-2',
    name: 'Chuột Logitech MX Master 3S',
    price: 2490000,
    originalPrice: 2890000,
    category: 'Chuột',
    description: 'Chuột công thái học cao cấp với Quiet Clicks, cảm biến Darkfield 8000 DPI lướt trên mọi bề mặt kể cả kính, cuộn MagSpeed siêu tốc.',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
    stock: 18,
    rating: 4.8,
    reviewCount: 310,
    featured: true,
  },
  {
    id: 'prod-3',
    name: 'Tai nghe Sony WH-1000XM5 Hi-Res',
    price: 7990000,
    originalPrice: 8990000,
    category: 'Âm thanh',
    description: 'Tai nghe chống ồn chủ động đỉnh cao số 1 thế giới với bộ xử lý Integrated Processor V1, 8 micro thu âm, thời lượng pin 30 giờ liên tục.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    stock: 8,
    rating: 5.0,
    reviewCount: 95,
    featured: true,
  },
  {
    id: 'prod-4',
    name: 'Màn hình Dell UltraSharp U2723QE 4K',
    price: 13500000,
    originalPrice: 14990000,
    category: 'Màn hình',
    description: 'Màn hình chuyên đồ hoạ 27 inch 4K IPS Black, độ tương phản 2000:1, chuẩn màu 98% DCI-P3, cổng kết nối USB-C Hub 90W sạc nhanh.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    stock: 5,
    rating: 4.9,
    reviewCount: 64,
    featured: true,
  },
  {
    id: 'prod-5',
    name: 'Loa Marshall Stanmore III Bluetooth',
    price: 9290000,
    originalPrice: 9990000,
    category: 'Âm thanh',
    description: 'Loa gia đình huyền thoại phong cách vintage, âm trường rộng mở chân thực, công nghệ Dynamic Loudness và kết nối Bluetooth 5.2.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    stock: 7,
    rating: 4.7,
    reviewCount: 82,
  },
  {
    id: 'prod-6',
    name: 'Giá đỡ Laptop Nhôm Công Thái Học Rain Design mStand',
    price: 1250000,
    originalPrice: 1450000,
    category: 'Phụ kiện',
    description: 'Đế nhôm tản nhiệt nguyên khối chuẩn phong cách Apple MacBook, nâng màn hình vừa tầm mắt giúp bảo vệ đốt sống cổ tối đa.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    stock: 25,
    rating: 4.6,
    reviewCount: 140,
  },
  {
    id: 'prod-7',
    name: 'Webcam Elgato Facecam Full HD 60FPS',
    price: 3890000,
    originalPrice: 4290000,
    category: 'Phụ kiện',
    description: 'Webcam chuyên nghiệp dành cho streamer và học online, ống kính thuỷ tinh Elgato Prime Lens góc rộng, cảm biến Sony STARVIS CMOS.',
    image: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=600&q=80',
    stock: 10,
    rating: 4.8,
    reviewCount: 43,
  },
  {
    id: 'prod-8',
    name: 'Bàn phím cơ NuPhy Air75 V2 Slim',
    price: 2950000,
    originalPrice: 3350000,
    category: 'Bàn phím',
    description: 'Bàn phím cơ Low-profile siêu mỏng nhẹ, hỗ trợ QMK/VIA tùy biến không giới hạn, kết nối 3 chế độ mượt mà cho cả MacOS & Windows.',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80',
    stock: 15,
    rating: 4.8,
    reviewCount: 76,
  },
];

/**
 * Giả lập API gọi lấy danh sách sản phẩm với Promise và độ trễ ngẫu nhiên (simulated network delay)
 */
export const fetchProductsApi = async (shouldFail = false): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600)); // 600ms latency
  if (shouldFail) {
    throw new Error('Không thể kết nối đến máy chủ. Vui lòng thử lại sau!');
  }
  return [...MOCK_PRODUCTS];
};
