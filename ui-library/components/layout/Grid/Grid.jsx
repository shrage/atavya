import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Grid component
 * 
 * A responsive grid layout system built on CSS Grid.
 * Uses Tailwind CSS for responsive breakpoints and styling.
 * 
 * @component
 * @example
 * ```jsx
 * <Grid columns={3} gap={4}>
 *   <GridItem>Item 1</GridItem>
 *   <GridItem>Item 2</GridItem>
 *   <GridItem span={2}>Item 3 (spans 2 columns)</GridItem>
 * </Grid>
 * ```
 */
const Grid = ({
  children,
  columns = 12,
  gap = 4,
  rowGap,
  columnGap,
  templateColumns,
  templateRows,
  autoFlow,
  autoRows,
  autoColumns,
  dense = false,
  alignItems,
  alignContent,
  justifyItems,
  justifyContent,
  responsive = true,
  className,
  ...props
}) => {
  // Gap sizes (in rem)
  const gapSizes = {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
  };
  
  // Convert numeric gap to rem values or use string directly
  const getGapValue = (value) => {
    if (value === undefined) return undefined;
    return gapSizes[value] || value;
  };
  
  // Handle responsive columns (default: 12 on large screens, fewer on smaller screens)
  const getResponsiveColumns = () => {
    if (!responsive) {
      return `grid-cols-${columns}`;
    }
    
    // Responsive column configuration
    // For simplicity, we'll reduce columns on smaller screens
    const smallColumns = Math.max(1, Math.min(columns, 2));
    const mediumColumns = Math.max(1, Math.min(columns, 6));
    
    return `grid-cols-${smallColumns} sm:grid-cols-${Math.min(4, columns)} md:grid-cols-${mediumColumns} lg:grid-cols-${columns}`;
  };
  
  // CSS Grid styles
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: templateColumns,
    gridTemplateRows: templateRows,
    gridAutoFlow: autoFlow ? (dense ? `${autoFlow} dense` : autoFlow) : (dense ? 'row dense' : undefined),
    gridAutoRows: autoRows,
    gridAutoColumns: autoColumns,
    gap: getGapValue(gap),
    rowGap: getGapValue(rowGap),
    columnGap: getGapValue(columnGap),
    alignItems,
    alignContent,
    justifyItems,
    justifyContent,
  };
  
  // Filter out undefined values
  const filteredStyles = Object.entries(gridStyles)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  
  return (
    <div 
      className={twMerge(
        templateColumns ? '' : getResponsiveColumns(),
        className
      )}
      style={filteredStyles}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * GridItem component
 * 
 * A component for grid items with span and positioning capabilities.
 * 
 * @component
 * @example
 * ```jsx
 * <GridItem span={2} spanSm={1} spanMd={2} spanLg={3}>
 *   Content
 * </GridItem>
 * ```
 */
const GridItem = ({
  children,
  span,
  spanSm,
  spanMd,
  spanLg,
  spanXl,
  start,
  startSm,
  startMd,
  startLg,
  startXl,
  end,
  endSm,
  endMd,
  endLg,
  endXl,
  rowSpan,
  rowStart,
  rowEnd,
  colSpan,
  colStart,
  colEnd,
  className,
  ...props
}) => {
  // Generate column span classes
  const getSpanClasses = () => {
    const classes = [];
    
    if (span) classes.push(`col-span-${span}`);
    if (spanSm) classes.push(`sm:col-span-${spanSm}`);
    if (spanMd) classes.push(`md:col-span-${spanMd}`);
    if (spanLg) classes.push(`lg:col-span-${spanLg}`);
    if (spanXl) classes.push(`xl:col-span-${spanXl}`);
    
    if (start) classes.push(`col-start-${start}`);
    if (startSm) classes.push(`sm:col-start-${startSm}`);
    if (startMd) classes.push(`md:col-start-${startMd}`);
    if (startLg) classes.push(`lg:col-start-${startLg}`);
    if (startXl) classes.push(`xl:col-start-${startXl}`);
    
    if (end) classes.push(`col-end-${end}`);
    if (endSm) classes.push(`sm:col-end-${endSm}`);
    if (endMd) classes.push(`md:col-end-${endMd}`);
    if (endLg) classes.push(`lg:col-end-${endLg}`);
    if (endXl) classes.push(`xl:col-end-${endXl}`);
    
    return classes.join(' ');
  };
  
  // CSS Grid styles for more complex scenarios
  const gridStyles = {
    gridRow: rowSpan ? `span ${rowSpan} / span ${rowSpan}` : undefined,
    gridRowStart: rowStart,
    gridRowEnd: rowEnd,
    gridColumn: colSpan ? `span ${colSpan} / span ${colSpan}` : undefined,
    gridColumnStart: colStart,
    gridColumnEnd: colEnd,
  };
  
  // Filter out undefined values
  const filteredStyles = Object.entries(gridStyles)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  
  return (
    <div 
      className={twMerge(
        getSpanClasses(),
        className
      )}
      style={filteredStyles}
      {...props}
    >
      {children}
    </div>
  );
};

Grid.propTypes = {
  /** Grid children */
  children: PropTypes.node,
  /** Number of columns (default: 12) */
  columns: PropTypes.number,
  /** Gap between grid items (in rem or Tailwind spacing units) */
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Gap between rows (overrides gap) */
  rowGap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Gap between columns (overrides gap) */
  columnGap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Custom grid template columns (e.g., "repeat(3, 1fr)") */
  templateColumns: PropTypes.string,
  /** Custom grid template rows (e.g., "auto 1fr auto") */
  templateRows: PropTypes.string,
  /** Grid auto flow direction */
  autoFlow: PropTypes.oneOf(['row', 'column', 'row dense', 'column dense']),
  /** Grid auto rows value */
  autoRows: PropTypes.string,
  /** Grid auto columns value */
  autoColumns: PropTypes.string,
  /** Whether to use dense packing algorithm */
  dense: PropTypes.bool,
  /** Align grid items along the block/column axis */
  alignItems: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  /** Align grid content along the block/column axis */
  alignContent: PropTypes.oneOf(['start', 'end', 'center', 'stretch', 'space-between', 'space-around', 'space-evenly']),
  /** Align grid items along the inline/row axis */
  justifyItems: PropTypes.oneOf(['start', 'end', 'center', 'stretch']),
  /** Align grid content along the inline/row axis */
  justifyContent: PropTypes.oneOf(['start', 'end', 'center', 'stretch', 'space-between', 'space-around', 'space-evenly']),
  /** Whether to use responsive column counts */
  responsive: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

GridItem.propTypes = {
  /** Grid item content */
  children: PropTypes.node,
  /** Number of columns to span */
  span: PropTypes.number,
  /** Number of columns to span on small screens */
  spanSm: PropTypes.number,
  /** Number of columns to span on medium screens */
  spanMd: PropTypes.number,
  /** Number of columns to span on large screens */
  spanLg: PropTypes.number,
  /** Number of columns to span on extra large screens */
  spanXl: PropTypes.number,
  /** Column start position */
  start: PropTypes.number,
  /** Column start position on small screens */
  startSm: PropTypes.number,
  /** Column start position on medium screens */
  startMd: PropTypes.number,
  /** Column start position on large screens */
  startLg: PropTypes.number,
  /** Column start position on extra large screens */
  startXl: PropTypes.number,
  /** Column end position */
  end: PropTypes.number,
  /** Column end position on small screens */
  endSm: PropTypes.number,
  /** Column end position on medium screens */
  endMd: PropTypes.number,
  /** Column end position on large screens */
  endLg: PropTypes.number,
  /** Column end position on extra large screens */
  endXl: PropTypes.number,
  /** Number of rows to span (CSS grid-row) */
  rowSpan: PropTypes.number,
  /** Row start position (CSS grid-row-start) */
  rowStart: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Row end position (CSS grid-row-end) */
  rowEnd: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Number of columns to span (CSS grid-column) */
  colSpan: PropTypes.number,
  /** Column start position (CSS grid-column-start) */
  colStart: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Column end position (CSS grid-column-end) */
  colEnd: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Additional CSS classes */
  className: PropTypes.string,
};

// Export both components
Grid.Item = GridItem;

export { Grid, GridItem };
