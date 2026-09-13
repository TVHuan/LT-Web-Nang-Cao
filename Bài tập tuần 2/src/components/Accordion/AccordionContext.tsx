import { createContext, useContext } from 'react';
import { AccordionContextType, AccordionItemContextType } from '../../types/accordion.types';

export const AccordionContext = createContext<AccordionContextType | null>(null);

export const useAccordionContext = (): AccordionContextType => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'Lỗi: Các component con của Accordion (Accordion.Item, Accordion.Header, Accordion.Body) phải được bọc bên trong <Accordion>!'
    );
  }
  return context;
};

export const AccordionItemContext = createContext<AccordionItemContextType | null>(null);

export const useAccordionItemContext = (): AccordionItemContextType => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'Lỗi: Accordion.Header và Accordion.Body phải được bọc bên trong <Accordion.Item id="...">!'
    );
  }
  return context;
};
