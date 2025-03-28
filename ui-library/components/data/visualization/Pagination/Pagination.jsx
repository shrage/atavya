import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Pagination component
 * Provides navigation controls for paginated content
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <Pagination
 *   currentPage={2}
 *   totalPages={10}
 *   onPageChange={(page) => console.log(`Navigate to page ${page}`)}
 * />
 * ```
 */
const Pagination = ({
  // Pagination state
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  siblingCount = 1,
  
  // Events
  onPageChange,
  onPageSizeChange,
  
  // Display options
  variant = 'buttons',
  showPageSizeSelector = false,
  pageSizeOptions = [10, 25, 50, 100],
  hideOnSinglePage = false,
  showFirstLast = true,
  showPrevNext = true,
  showPageNumbers = true,
  showPageInfo = false,
  maxDisplayedPages = 7,
  
  // Labels and texts
  labels = {
    first: '«',
    previous: '‹',
    next: '›',
    last: '»',
    pageInfo: 'Showing {range} of {total} items',
    pageSizeSelector: 'Items per page:',
  },
  
  // Styling
  className,
  buttonClassName,
  activeButtonClassName,
  disabledButtonClassName,
  pageInfoClassName,
  pageSizeSelectorClassName,
}) => {
  // Calculate total pages if not provided directly
  const calculatedTotalPages = useMemo(() => {
    if (totalPages !== undefined) return totalPages;
    if (totalItems !== undefined && pageSize !== undefined) {
      return Math.ceil(totalItems / pageSize);
    }
    return 1;
  }, [totalPages, totalItems, pageSize]);
  
  // Don't render anything if there's only one page and hideOnSinglePage is true
  if (hideOnSinglePage && calculatedTotalPages <= 1) {
    return null;
  }
  
  // Generate the range of page numbers to display
  const generatePageRange = () => {
    if (calculatedTotalPages <= maxDisplayedPages) {
      return Array.from({ length: calculatedTotalPages }, (_, i) => i + 1);
    }
    
    // Calculate the range of pages to show
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      calculatedTotalPages
    );
    
    // Whether to show ellipsis
    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < calculatedTotalPages - 1;
    
    // Calculate how many numbers to show after/before dots
    const firstPageIndex = 1;
    const lastPageIndex = calculatedTotalPages;
    
    // Case 1: No left dots, but right dots
    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from(
        { length: leftItemCount },
        (_, i) => i + 1
      );
      
      return [...leftRange, '...', lastPageIndex];
    }
    
    // Case 2: No right dots, but left dots
    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => lastPageIndex - rightItemCount + i + 1
      );
      
      return [firstPageIndex, '...', ...rightRange];
    }
    
    // Case 3: Both left and right dots
    if (showLeftDots && showRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
  };
  
  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > calculatedTotalPages || page === currentPage) {
      return;
    }
    
    if (onPageChange) {
      onPageChange(page);
    }
  };
  
  // Handle page size change
  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (onPageSizeChange) {
      onPageSizeChange(newSize);
    }
  };
  
  // Generate the page info text
  const getPageInfoText = () => {
    if (!showPageInfo) return null;
    
    let rangeText = '';
    
    if (totalItems !== undefined && pageSize !== undefined) {
      const start = (currentPage - 1) * pageSize + 1;
      const end = Math.min(currentPage * pageSize, totalItems);
      rangeText = `${start}-${end}`;
    } else {
      rangeText = `Page ${currentPage} of ${calculatedTotalPages}`;
    }
    
    return labels.pageInfo
      .replace('{range}', rangeText)
      .replace('{total}', totalItems || 'unknown');
  };
  
  // Get button classes based on state
  const getButtonClasses = (isActive, isDisabled) => {
    if (isDisabled) {
      return twMerge(
        'px-3 py-1 text-text-disabled cursor-not-allowed',
        disabledButtonClassName
      );
    }
    
    if (isActive) {
      return twMerge(
        'px-3 py-1 bg-primary text-white rounded cursor-pointer',
        activeButtonClassName
      );
    }
    
    return twMerge(
      'px-3 py-1 bg-white text-text-primary hover:bg-background-hover rounded cursor-pointer',
      buttonClassName
    );
  };
  
  // Render page item based on variant
  const renderPageItem = (content, page, isActive = false, isDisabled = false) => {
    // Don't render button for ellipsis
    if (content === '...') {
      return (
        <span
          key={`ellipsis-${page}`}
          className="px-3 py-1 text-text-secondary"
          aria-hidden="true"
        >
          ...
        </span>
      );
    }
    
    return (
      <button
        key={`page-${page}`}
        type="button"
        className={getButtonClasses(isActive, isDisabled)}
        onClick={() => handlePageChange(page)}
        disabled={isDisabled}
        aria-current={isActive ? 'page' : undefined}
        aria-label={`Page ${page}`}
      >
        {content}
      </button>
    );
  };
  
  // Render the pagination component based on the variant
  const renderPagination = () => {
    switch (variant) {
      case 'buttons':
        return (
          <div className="flex items-center space-x-1">
            {/* First page button */}
            {showFirstLast && (
              <button
                type="button"
                className={getButtonClasses(false, currentPage === 1)}
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                aria-label="Go to first page"
              >
                {labels.first}
              </button>
            )}
            
            {/* Previous page button */}
            {showPrevNext && (
              <button
                type="button"
                className={getButtonClasses(false, currentPage === 1)}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
              >
                {labels.previous}
              </button>
            )}
            
            {/* Page numbers */}
            {showPageNumbers && generatePageRange().map((pageNumber) => {
              const isActive = pageNumber === currentPage;
              return renderPageItem(
                pageNumber,
                pageNumber,
                isActive,
                false
              );
            })}
            
            {/* Next page button */}
            {showPrevNext && (
              <button
                type="button"
                className={getButtonClasses(false, currentPage === calculatedTotalPages)}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === calculatedTotalPages}
                aria-label="Go to next page"
              >
                {labels.next}
              </button>
            )}
            
            {/* Last page button */}
            {showFirstLast && (
              <button
                type="button"
                className={getButtonClasses(false, currentPage === calculatedTotalPages)}
                onClick={() => handlePageChange(calculatedTotalPages)}
                disabled={currentPage === calculatedTotalPages}
                aria-label="Go to last page"
              >
                {labels.last}
              </button>
            )}
          </div>
        );
        
      case 'simple':
        return (
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className={getButtonClasses(false, currentPage === 1)}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              {labels.previous}
            </button>
            
            <span className="text-text-secondary">
              {currentPage} / {calculatedTotalPages}
            </span>
            
            <button
              type="button"
              className={getButtonClasses(false, currentPage === calculatedTotalPages)}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === calculatedTotalPages}
              aria-label="Next page"
            >
              {labels.next}
            </button>
          </div>
        );
      
      case 'input':
        return (
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className={getButtonClasses(false, currentPage === 1)}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              {labels.previous}
            </button>
            
            <div className="flex items-center">
              <input
                type="number"
                min="1"
                max={calculatedTotalPages}
                value={currentPage}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val) && val >= 1 && val <= calculatedTotalPages) {
                    handlePageChange(val);
                  }
                }}
                className="w-12 h-8 px-2 text-center border border-border-secondary rounded"
                aria-label="Current page"
              />
              <span className="ml-2 text-text-secondary">
                / {calculatedTotalPages}
              </span>
            </div>
            
            <button
              type="button"
              className={getButtonClasses(false, currentPage === calculatedTotalPages)}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === calculatedTotalPages}
              aria-label="Next page"
            >
              {labels.next}
            </button>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div
      className={twMerge(
        'flex flex-wrap items-center justify-between gap-y-2',
        className
      )}
      role="navigation"
      aria-label="Pagination"
    >
      {/* Page info */}
      {showPageInfo && (
        <div className={twMerge('text-sm text-text-secondary', pageInfoClassName)}>
          {getPageInfoText()}
        </div>
      )}
      
      {/* Main pagination */}
      {renderPagination()}
      
      {/* Page size selector */}
      {showPageSizeSelector && pageSize !== undefined && (
        <div className={twMerge('flex items-center space-x-2', pageSizeSelectorClassName)}>
          <label className="text-sm text-text-secondary">
            {labels.pageSizeSelector}
          </label>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-2 py-1 text-sm border border-border-secondary rounded bg-white"
            aria-label="Items per page"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

Pagination.propTypes = {
  /** Current page number (1-based) */
  currentPage: PropTypes.number.isRequired,
  
  /** Total number of pages */
  totalPages: PropTypes.number,
  
  /** Total number of items (alternative to totalPages) */
  totalItems: PropTypes.number,
  
  /** Number of items per page (used with totalItems) */
  pageSize: PropTypes.number,
  
  /** Number of siblings to show on each side of the current page */
  siblingCount: PropTypes.number,
  
  /** Called when the page changes */
  onPageChange: PropTypes.func.isRequired,
  
  /** Called when the page size changes */
  onPageSizeChange: PropTypes.func,
  
  /** Visual style of the pagination */
  variant: PropTypes.oneOf(['buttons', 'simple', 'input']),
  
  /** Whether to show the page size selector */
  showPageSizeSelector: PropTypes.bool,
  
  /** Options for the page size selector */
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  
  /** Whether to hide pagination when there's only one page */
  hideOnSinglePage: PropTypes.bool,
  
  /** Whether to show first/last page buttons */
  showFirstLast: PropTypes.bool,
  
  /** Whether to show previous/next buttons */
  showPrevNext: PropTypes.bool,
  
  /** Whether to show page numbers */
  showPageNumbers: PropTypes.bool,
  
  /** Whether to show information about current page range */
  showPageInfo: PropTypes.bool,
  
  /** Maximum number of page buttons to display */
  maxDisplayedPages: PropTypes.number,
  
  /** Custom labels for pagination elements */
  labels: PropTypes.shape({
    first: PropTypes.node,
    previous: PropTypes.node,
    next: PropTypes.node,
    last: PropTypes.node,
    pageInfo: PropTypes.string,
    pageSizeSelector: PropTypes.string,
  }),
  
  /** Additional CSS classes for the container */
  className: PropTypes.string,
  
  /** CSS classes for page buttons */
  buttonClassName: PropTypes.string,
  
  /** CSS classes for the active page button */
  activeButtonClassName: PropTypes.string,
  
  /** CSS classes for disabled buttons */
  disabledButtonClassName: PropTypes.string,
  
  /** CSS classes for the page info text */
  pageInfoClassName: PropTypes.string,
  
  /** CSS classes for the page size selector */
  pageSizeSelectorClassName: PropTypes.string,
};

export default Pagination;
