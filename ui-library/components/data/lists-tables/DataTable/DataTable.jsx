import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * DataTable component for displaying and sorting tabular data
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <DataTable
 *   columns={[
 *     { key: 'name', label: 'Name' },
 *     { key: 'email', label: 'Email' },
 *   ]}
 *   data={[
 *     { id: 1, name: 'John Doe', email: 'john@example.com' },
 *     { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
 *   ]}
 * />
 * ```
 */
const DataTable = ({
  columns,
  data,
  className,
  onRowClick,
  sortable = true,
  hoverable = true,
  bordered = false,
  striped = true,
  compact = false,
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  const handleSort = (key) => {
    if (!sortable) return;

    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const containerStyles = twMerge(
    'w-full overflow-x-auto',
    className
  );

  const tableStyles = twMerge(
    'min-w-full divide-y divide-border-light',
    bordered && 'border border-border-light'
  );

  const headerCellStyles = twMerge(
    'px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider bg-background-skeleton',
    compact && 'px-4 py-2',
    bordered && 'border-x border-border-light',
    sortable && 'cursor-pointer hover:bg-background-hover'
  );

  const bodyCellStyles = twMerge(
    'px-6 py-4 whitespace-nowrap text-sm text-text-primary',
    compact && 'px-4 py-2',
    bordered && 'border-x border-border-light'
  );

  const rowStyles = twMerge(
    'group',
    hoverable && 'hover:bg-background-hover',
    onRowClick && 'cursor-pointer'
  );

  const stripedRowStyles = (index) => 
    striped && index % 2 === 0 ? 'bg-background-skeleton' : 'bg-background-offwhite';

  const getSortIcon = (key) => {
    if (!sortable || sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className={containerStyles}>
      <table className={tableStyles}>
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className={headerCellStyles}
              >
                <div className="flex items-center justify-between">
                  <span>{label}</span>
                  <span className="text-text-tertiary ml-2">{getSortIcon(key)}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-light">
          {sortedData.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              onClick={() => onRowClick?.(row)}
              className={twMerge(rowStyles, stripedRowStyles(rowIndex))}
            >
              {columns.map(({ key, render }) => (
                <td key={key} className={bodyCellStyles}>
                  {render ? render(row[key], row) : row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DataTable.propTypes = {
  /** Array of column definitions */
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    render: PropTypes.func,
  })).isRequired,
  /** Array of data objects */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Row click handler */
  onRowClick: PropTypes.func,
  /** Whether the table is sortable */
  sortable: PropTypes.bool,
  /** Whether rows are highlighted on hover */
  hoverable: PropTypes.bool,
  /** Whether the table has borders */
  bordered: PropTypes.bool,
  /** Whether rows are striped */
  striped: PropTypes.bool,
  /** Whether the table is compact */
  compact: PropTypes.bool,
};

export default DataTable;
