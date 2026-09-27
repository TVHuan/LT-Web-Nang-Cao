import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Heart, CheckCircle2, Trash2, X } from 'lucide-react';

interface ToastItem {
  id: string;
  type: 'add' | 'remove' | 'clear' | 'info';
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: 'add' | 'remove' | 'clear' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: 'add' | 'remove' | 'clear' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast-item toast-${toast.type}`}>
            <div className="toast-icon">
              {toast.type === 'add' && <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-bounce" />}
              {toast.type === 'remove' && <Trash2 className="w-5 h-5 text-amber-500" />}
              {toast.type === 'clear' && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
              {toast.type === 'info' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            </div>
            <span className="toast-message">{toast.message}</span>
            <button
              className="toast-close-btn"
              onClick={() => removeToast(toast.id)}
              aria-label="Đóng thông báo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast phải được sử dụng bên trong ToastProvider');
  }
  return context;
};
