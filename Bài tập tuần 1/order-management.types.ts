/**
 * LTWNC - Bài tập tuần 1: Module Quản lý đơn hàng
 *
 * GIẢI THÍCH THIẾT KẾ:
 * - Enum: trạng thái/giá trị cố định, tránh magic string.
 * - Interface: mô tả thực thể Order, OrderItem, Product, Customer.
 * - Generic + Utility Types (Partial, Pick, Omit): tái sử dụng từ entity gốc,
 *   không viết lại field — Create dùng Omit, Update dùng Partial, Summary dùng Pick.
 */

export enum OrderStatus {
  Pending = "PENDING",
  Confirmed = "CONFIRMED",
  Shipping = "SHIPPING",
  Delivered = "DELIVERED",
  Cancelled = "CANCELLED",
}

export enum PaymentMethod {
  Cash = "CASH",
  BankTransfer = "BANK_TRANSFER",
  CreditCard = "CREDIT_CARD",
  EWallet = "E_WALLET",
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  createdAt: Date;
}

// ===== GENERIC =====
// Wrapper API dùng chung cho mọi entity T
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

//UTILITY TYPES (tái sử dụng từ interface gốc)

// Tạo mới: Omit các field do server sinh 
export type CreateProduct = Omit<Product, "id">;
export type CreateCustomer = Omit<Customer, "id">;
export type CreateOrder = Omit<Order, "id" | "totalAmount" | "createdAt">;

// Cập nhật: Partial — chỉ gửi field cần đổi
export type UpdateProduct = Partial<Omit<Product, "id">>;
export type UpdateCustomer = Partial<Omit<Customer, "id">>;
export type UpdateOrder = Partial<Pick<Order, "status" | "paymentMethod">>;

// Hiển thị rút gọn: Pick — chỉ lấy field cần thiết 
export type ProductSummary = Pick<Product, "id" | "name" | "price">;
export type CustomerContact = Pick<Customer, "id" | "fullName" | "email" | "phone">;
export type OrderSummary = Pick<Order, "id" | "customerId" | "status" | "totalAmount">;
