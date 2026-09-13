import { ReactNode } from 'react';

export interface AccordionContextType {
  activeId: string | null;
  toggleItem: (id: string) => void;
  isItemActive: (id: string) => boolean;
}

export interface AccordionProps {
  children: ReactNode;
  /**
   * ID của panel mở mặc định khi khởi tạo
   */
  defaultActiveId?: string | null;
  /**
   * Cho phép đóng panel đang mở khi click lại vào header (mặc định: true)
   */
  collapsible?: boolean;
  /**
   * Callback khi panel đang mở thay đổi
   */
  onChange?: (activeId: string | null) => void;
  /**
   * Class name tùy biến
   */
  className?: string;
}

export interface AccordionItemContextType {
  id: string;
}

export interface AccordionItemProps {
  id: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export interface AccordionHeaderProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  subtitle?: ReactNode;
}

export interface AccordionBodyProps {
  children: ReactNode;
  className?: string;
}
