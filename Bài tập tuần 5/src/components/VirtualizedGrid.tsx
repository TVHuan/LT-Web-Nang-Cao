import React, { memo, useCallback, useRef } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import type { GridChildComponentProps } from 'react-window';
import type { Product } from '../types/product';
import ProductCard from './ProductCard';

interface VirtualizedGridProps {
  products: Product[];
  selectedIds: Set<number>;
  onSelect: (product: Product) => void;
  containerWidth: number;
}

const ITEM_HEIGHT = 340;
const COLUMN_COUNT = 4;
const GAP = 16;

// Kỹ thuật Virtualization với react-window
// Chỉ render các item đang visible trong viewport thay vì toàn bộ 10.000 sản phẩm
const VirtualizedGrid = memo(function VirtualizedGrid({
  products,
  selectedIds,
  onSelect,
  containerWidth,
}: VirtualizedGridProps) {
  const colCount = containerWidth > 1200 ? 4 : containerWidth > 900 ? 3 : containerWidth > 600 ? 2 : 1;
  const rowCount = Math.ceil(products.length / colCount);
  const itemWidth = Math.floor((containerWidth - GAP * (colCount - 1)) / colCount);

  const Cell = useCallback(
    ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
      const index = rowIndex * colCount + columnIndex;
      if (index >= products.length) return null;
      const product = products[index];

      const cellStyle: React.CSSProperties = {
        ...style,
        left: Number(style.left) + columnIndex * GAP,
        top: Number(style.top) + rowIndex * GAP,
        width: itemWidth,
        height: ITEM_HEIGHT,
        padding: 0,
      };

      return (
        <div style={cellStyle}>
          <ProductCard
            product={product}
            isSelected={selectedIds.has(product.id)}
            onSelect={onSelect}
          />
        </div>
      );
    },
    [products, selectedIds, onSelect, colCount, itemWidth]
  );

  const gridHeight = Math.min(window.innerHeight - 280, 700);

  return (
    <div className="virtualized-container">
      <div className="virtualized-info">
        <span>⚡ Virtualization đang hoạt động — chỉ render ~{colCount * Math.ceil(gridHeight / ITEM_HEIGHT)} / {products.length.toLocaleString()} cards</span>
      </div>
      <Grid
        columnCount={colCount}
        columnWidth={itemWidth + GAP}
        height={gridHeight}
        rowCount={rowCount}
        rowHeight={ITEM_HEIGHT + GAP}
        width={containerWidth}
        itemData={{ products, selectedIds, onSelect }}
        overscanRowCount={2}
        className="virtual-grid"
      >
        {Cell}
      </Grid>
    </div>
  );
});

export default VirtualizedGrid;
