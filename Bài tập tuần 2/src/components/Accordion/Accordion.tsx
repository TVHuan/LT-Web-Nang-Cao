import React, { useState, useCallback } from 'react';
import { AccordionProps } from '../../types/accordion.types';
import { AccordionContext } from './AccordionContext';
import { AccordionItem } from './AccordionItem';
import { AccordionHeader } from './AccordionHeader';
import { AccordionBody } from './AccordionBody';
import './Accordion.css';

interface AccordionComponent extends React.FC<AccordionProps> {
  Item: typeof AccordionItem;
  Header: typeof AccordionHeader;
  Body: typeof AccordionBody;
  Content: typeof AccordionBody;
}

export const Accordion: AccordionComponent = ({
  children,
  defaultActiveId = null,
  collapsible = true,
  onChange,
  className = '',
}) => {
  // Quản lý id của panel đang mở. Chỉ lưu 1 giá trị duy nhất (string hoặc null)
  // để đảm bảo chỉ có tối đa 1 panel mở tại một thời điểm.
  const [activeId, setActiveId] = useState<string | null>(defaultActiveId);

  const toggleItem = useCallback(
    (id: string) => {
      const nextId = activeId === id ? (collapsible ? null : id) : id;
      if (nextId !== activeId) {
        setActiveId(nextId);
        onChange?.(nextId);
      }
    },
    [activeId, collapsible, onChange]
  );

  const isItemActive = useCallback(
    (id: string) => activeId === id,
    [activeId]
  );

  return (
    <AccordionContext.Provider value={{ activeId, toggleItem, isItemActive }}>
      <div className={`accordion ${className}`.trim()}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// Gắn các subcomponents vào Accordion để tạo cú pháp Compound Component trực quan
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;
Accordion.Content = AccordionBody;
