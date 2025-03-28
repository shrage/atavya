import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Stack component
 * 
 * A layout component that arranges its children in a vertical or horizontal stack with consistent spacing.
 * Uses Tailwind CSS for responsive breakpoints and styling.
 * 
 * @component
 * @example
 * ```jsx
 * <Stack spacing={4}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * ```
 */
const Stack = ({
  children,
  direction = 'vertical',
  spacing = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  divider,
  responsive = false,
  className,
  ...props
}) => {
  // Spacing sizes (in rem)
  const spacingSizes = {
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
  
  // Convert numeric spacing to rem values or use string directly
  const getSpacingValue = (value) => {
    if (value === undefined) return undefined;
    return spacingSizes[value] || value;
  };
  
  // Direction classes
  const getDirectionClasses = () => {
    if (!responsive) {
      return direction === 'horizontal' ? 'flex-row' : 'flex-col';
    }
    
    // Responsive direction configuration
    if (direction === 'horizontal') {
      return 'flex-col sm:flex-row';
    }
    
    return 'flex-col';
  };
  
  // Alignment classes
  const alignClasses = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    baseline: 'items-baseline',
    stretch: 'items-stretch'
  };
  
  // Justify classes
  const justifyClasses = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };
  
  // Wrap classes
  const wrapClasses = wrap ? 'flex-wrap' : 'flex-nowrap';
  
  // Spacing styles
  const getSpacingStyles = () => {
    const spacingValue = getSpacingValue(spacing);
    
    if (direction === 'horizontal') {
      return {
        '& > *:not(:last-child)': {
          marginRight: spacingValue
        }
      };
    }
    
    return {
      '& > *:not(:last-child)': {
        marginBottom: spacingValue
      }
    };
  };
  
  // Handle children with dividers
  const renderChildrenWithDividers = () => {
    if (!divider || !React.Children.count(children)) {
      return children;
    }
    
    const childrenArray = React.Children.toArray(children);
    const result = [];
    
    childrenArray.forEach((child, index) => {
      result.push(child);
      
      if (index < childrenArray.length - 1) {
        result.push(
          React.cloneElement(divider, {
            key: `divider-${index}`,
            className: twMerge(
              direction === 'horizontal' ? 'mx-2' : 'my-2',
              divider.props.className
            )
          })
        );
      }
    });
    
    return result;
  };
  
  return (
    <div 
      className={twMerge(
        'flex',
        getDirectionClasses(),
        alignClasses[align],
        justifyClasses[justify],
        wrapClasses,
        className
      )}
      style={{
        gap: getSpacingValue(spacing)
      }}
      {...props}
    >
      {renderChildrenWithDividers()}
    </div>
  );
};

Stack.propTypes = {
  /** Stack children */
  children: PropTypes.node,
  /** Direction of the stack */
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  /** Spacing between items (in rem or Tailwind spacing units) */
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Alignment of items */
  align: PropTypes.oneOf(['start', 'end', 'center', 'baseline', 'stretch']),
  /** Justification of items */
  justify: PropTypes.oneOf(['start', 'end', 'center', 'between', 'around', 'evenly']),
  /** Whether items should wrap */
  wrap: PropTypes.bool,
  /** Optional divider element to display between items */
  divider: PropTypes.element,
  /** Whether to use responsive direction (vertical on small screens, horizontal on larger screens) */
  responsive: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Stack;
