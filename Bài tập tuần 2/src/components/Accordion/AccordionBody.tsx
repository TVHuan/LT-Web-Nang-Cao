import React from 'react';
import { AccordionBodyProps } from '../../types/accordion.types';
import { useAccordionContext, useAccordionItemContext } from './AccordionContext';

export const AccordionBody: React.FC<AccordionBodyProps> = ({
  children,
  className = '',
}) => {
  const { isItemActive } = useAccordionContext();
  const { id } = useAccordionItemContext();

  const isOpen = isItemActive(id);

  return (
    <div
      id={`accordion-content-${id}`}
      role="region"
      aria-labelledby={`accordion-header-${id}`}
      className={`accordion-collapse ${isOpen ? 'accordion-collapse--open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className={`accordion-body ${className}`.trim()}>
        <div className="accordion-body__inner">
          {children}
        </div>
      </div>
    </div>
  );
};
