import React, { memo, useCallback, useMemo } from 'react';
import { Grid } from 'react-window';
import type { CellComponentProps, GridProps } from 'react-window';
import type { Product } from '../types/product';
import ProductCard from './ProductCard';

interface VirtualizedGridProps {
  products: Product[];
  selectedIds: Set<number>;
  onSelect: (product: Product) => void;
  containerWidth: number;
}

const ITEM_HEIGHT = 340;
const GAP = 16;
const PADDING = 32;

interface CellData {
  colCount: number;
  products: Product[];
  selectedIds: Set<number>;
  onSelect: (product: Product) => void;
}

// Kỹ thuật Virtualization với react-window v2
// Chỉ render các item đang visible trong viewport thay vì toàn bộ 10.000 sản phẩm
const VirtualizedGrid = memo(function VirtualizedGrid({
  products,
  selectedIds,
  onSelect,
  containerWidth,
}: VirtualizedGridProps) {
  const availableWidth = containerWidth - PADDING * 2;
  const colCount =
    availableWidth > 1100 ? 4 :
    availableWidth > 800 ? 3 :
    availableWidth > 520 ? 2 : 1;

  const itemWidth = Math.floor((availableWidth - GAP * (colCount - 1)) / colCount);
  const rowCount = Math.ceil(products.length / colCount);
  const gridHeight = Math.min(window.innerHeight - 260, 680);

  const cellData: CellData = useMemo(
    () => ({ colCount, products, selectedIds, onSelect }),
    [colCount, products, selectedIds, onSelect]
  );

  // Cell component for react-window v2 — receives row/col index via cellProps
  const CellComponent = useCallback(
    ({ rowIndex, columnIndex }: { rowIndex: number; columnIndex: number }) => {
      const index = rowIndex * colCount + columnIndex;
      if (index >= products.length) return null;
      const product = products[index];

      return (
        <div
          style={{
            padding: GAP / 2,
            height: ITEM_HEIGHT,
            boxSizing: 'border-box',
          }}
        >
          <ProductCard
            product={product}
            isSelected={selectedIds.has(product.id)}
            onSelect={onSelect}
          />
        </div>
      );
    },
    [products, selectedIds, onSelect, colCount]
  );

  const visibleRows = Math.ceil(gridHeight / (ITEM_HEIGHT + GAP));
  const visibleCards = Math.min(colCount * visibleRows, products.length);

  return (
    <div className="virtualized-container">
      <div className="virtualized-info">
        ⚡ Virtualization đang hoạt động — chỉ render ~{visibleCards} / {products.length.toLocaleString()} cards trong viewport
      </div>
      <div style={{ padding: `${GAP}px ${PADDING}px` }}>
        <Grid
          rowCount={rowCount}
          columnCount={colCount}
          rowHeight={ITEM_HEIGHT + GAP}
          columnWidth={itemWidth + GAP}
          height={gridHeight}
          width={availableWidth}
          overscanCount={2}
          cellComponent={CellComponent}
        />
      </div>
    </div>
  );
});

export default VirtualizedGrid;
