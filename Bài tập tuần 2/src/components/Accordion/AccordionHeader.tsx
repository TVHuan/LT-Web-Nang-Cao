import React from 'react';
import { ChevronDown } from 'lucide-react';
import { AccordionHeaderProps } from '../../types/accordion.types';
import { useAccordionContext, useAccordionItemContext } from './AccordionContext';

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  children,
  className = '',
  icon,
  subtitle,
}) => {
  const { toggleItem, isItemActive } = useAccordionContext();
  const { id } = useAccordionItemContext();

  const isOpen = isItemActive(id);

  const handleClick = () => {
    toggleItem(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(id);
    }
  };

  return (
    <h3 className="accordion-header-wrapper">
      <button
        type="button"
        className={`accordion-trigger ${isOpen ? 'accordion-trigger--open' : ''} ${className}`.trim()}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        id={`accordion-header-${id}`}
      >
        <div className="accordion-trigger__content">
          {icon && <span className="accordion-trigger__icon-prefix">{icon}</span>}
          <div className="accordion-trigger__titles">
            <span className="accordion-trigger__title">{children}</span>
            {subtitle && <span className="accordion-trigger__subtitle">{subtitle}</span>}
          </div>
        </div>

        <span className={`accordion-trigger__chevron ${isOpen ? 'accordion-trigger__chevron--rotated' : ''}`}>
          <ChevronDown size={20} />
        </span>
      </button>
    </h3>
  );
};
