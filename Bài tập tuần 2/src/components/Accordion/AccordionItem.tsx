import React from 'react';
import { AccordionItemProps } from '../../types/accordion.types';
import { AccordionItemContext, useAccordionContext } from './AccordionContext';

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  children,
  className = '',
  disabled = false,
}) => {
  const { isItemActive } = useAccordionContext();
  const isActive = isItemActive(id);

  return (
    <AccordionItemContext.Provider value={{ id }}>
      <div
        className={`accordion-item ${isActive ? 'accordion-item--active' : ''} ${
          disabled ? 'accordion-item--disabled' : ''
        } ${className}`.trim()}
        data-state={isActive ? 'open' : 'closed'}
        data-item-id={id}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};
