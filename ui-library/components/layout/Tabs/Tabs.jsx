import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Tabs component
 * 
 * A component for organizing content into tabbed sections.
 * Uses Tailwind theme colors for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <Tabs>
 *   <TabList>
 *     <Tab>Tab 1</Tab>
 *     <Tab>Tab 2</Tab>
 *   </TabList>
 *   <TabPanels>
 *     <TabPanel>Content 1</TabPanel>
 *     <TabPanel>Content 2</TabPanel>
 *   </TabPanels>
 * </Tabs>
 * ```
 */
const TabsContext = React.createContext({
  selectedIndex: 0,
  setSelectedIndex: () => {},
  variant: 'line',
  size: 'md',
  orientation: 'horizontal',
  isFitted: false,
  isManual: false,
  isLazy: false,
});

const Tabs = ({
  children,
  defaultIndex = 0,
  selectedIndex: controlledIndex,
  onChange,
  variant = 'line',
  size = 'md',
  orientation = 'horizontal',
  isFitted = false,
  isManual = false,
  isLazy = false,
  className,
  ...props
}) => {
  const isControlled = controlledIndex !== undefined;
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const actualIndex = isControlled ? controlledIndex : selectedIndex;
  
  const handleTabChange = (index) => {
    if (!isControlled) {
      setSelectedIndex(index);
    }
    
    if (onChange) {
      onChange(index);
    }
  };
  
  const contextValue = {
    selectedIndex: actualIndex,
    setSelectedIndex: handleTabChange,
    variant,
    size,
    orientation,
    isFitted,
    isManual,
    isLazy,
  };
  
  return (
    <TabsContext.Provider value={contextValue}>
      <div 
        className={twMerge(
          'w-full',
          orientation === 'vertical' ? 'flex' : '',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

/**
 * TabList component
 * 
 * Container for Tab components.
 * 
 * @component
 */
const TabList = ({ children, className, ...props }) => {
  const { orientation, variant, size, isFitted } = React.useContext(TabsContext);
  
  // Size variants
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
  
  // Variant classes
  const variantClasses = {
    line: 'border-b border-border-light',
    enclosed: 'border-b border-border-light',
    'soft-rounded': '',
    'solid-rounded': '',
    unstyled: ''
  };
  
  return (
    <div 
      role="tablist"
      className={twMerge(
        'flex',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        variantClasses[variant],
        sizeClasses[size],
        orientation === 'vertical' ? 'border-b-0 border-r border-border-light' : '',
        orientation === 'vertical' ? 'min-w-[200px]' : 'w-full',
        className
      )}
      aria-orientation={orientation}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;
        
        return React.cloneElement(child, {
          index,
          ...child.props,
          className: twMerge(
            isFitted && orientation !== 'vertical' ? 'flex-1' : '',
            child.props.className
          )
        });
      })}
    </div>
  );
};

/**
 * Tab component
 * 
 * Individual tab button.
 * 
 * @component
 */
const Tab = ({
  children,
  index,
  disabled = false,
  icon,
  className,
  ...props
}) => {
  const { 
    selectedIndex, 
    setSelectedIndex, 
    variant, 
    size,
    orientation,
    isManual
  } = React.useContext(TabsContext);
  
  const isSelected = index === selectedIndex;
  
  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-6 py-3'
  };
  
  // Variant styles
  const getVariantClasses = () => {
    switch (variant) {
      case 'line':
        return twMerge(
          'border-b-2 border-transparent',
          isSelected 
            ? 'border-primary text-primary' 
            : 'text-text-secondary hover:text-text-primary hover:border-border-medium',
          orientation === 'vertical' && 'border-b-0 border-r-2'
        );
      case 'enclosed':
        return twMerge(
          'border-t border-l border-r border-transparent rounded-t-md -mb-px',
          isSelected 
            ? 'border-border-light border-b-white bg-white' 
            : 'text-text-secondary hover:text-text-primary',
          orientation === 'vertical' && 'border-t border-b border-l border-r-0 rounded-t-none rounded-l-md -mr-px'
        );
      case 'soft-rounded':
        return twMerge(
          'rounded-full',
          isSelected 
            ? 'bg-primary/10 text-primary' 
            : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
        );
      case 'solid-rounded':
        return twMerge(
          'rounded-full',
          isSelected 
            ? 'bg-primary text-white' 
            : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
        );
      case 'unstyled':
        return twMerge(
          isSelected 
            ? 'text-primary' 
            : 'text-text-secondary hover:text-text-primary'
        );
      default:
        return '';
    }
  };
  
  const handleClick = () => {
    if (!disabled && !isManual) {
      setSelectedIndex(index);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled && !isManual) {
        setSelectedIndex(index);
      }
    }
  };
  
  return (
    <button
      role="tab"
      tabIndex={disabled ? -1 : 0}
      aria-selected={isSelected}
      aria-disabled={disabled}
      disabled={disabled}
      className={twMerge(
        'font-medium outline-none focus:outline-none transition-colors duration-200',
        sizeClasses[size],
        getVariantClasses(),
        disabled && 'opacity-40 cursor-not-allowed',
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {icon && (
        <span className={twMerge(
          'inline-block',
          children ? 'mr-2' : ''
        )}>
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};

/**
 * TabPanels component
 * 
 * Container for TabPanel components.
 * 
 * @component
 */
const TabPanels = ({ children, className, ...props }) => {
  const { orientation } = React.useContext(TabsContext);
  
  return (
    <div 
      className={twMerge(
        'flex-1',
        orientation === 'vertical' ? 'ml-4' : 'mt-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * TabPanel component
 * 
 * Individual tab content panel.
 * 
 * @component
 */
const TabPanel = ({ children, index, className, ...props }) => {
  const { selectedIndex, isLazy } = React.useContext(TabsContext);
  const isSelected = index === selectedIndex;
  
  // If lazy loading is enabled, only render the panel when it's selected or has been selected before
  const [hasBeenSelected, setHasBeenSelected] = useState(isSelected);
  
  useEffect(() => {
    if (isSelected && !hasBeenSelected) {
      setHasBeenSelected(true);
    }
  }, [isSelected, hasBeenSelected]);
  
  if (isLazy && !hasBeenSelected) {
    return null;
  }
  
  return (
    <div
      role="tabpanel"
      hidden={!isSelected}
      className={twMerge(
        isSelected ? 'block' : 'hidden',
        className
      )}
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
};

Tabs.propTypes = {
  /** Tab components */
  children: PropTypes.node,
  /** Default selected tab index (uncontrolled) */
  defaultIndex: PropTypes.number,
  /** Selected tab index (controlled) */
  selectedIndex: PropTypes.number,
  /** Change handler */
  onChange: PropTypes.func,
  /** Visual style variant */
  variant: PropTypes.oneOf(['line', 'enclosed', 'soft-rounded', 'solid-rounded', 'unstyled']),
  /** Size of the tabs */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Orientation of the tabs */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Whether tabs should take up equal space */
  isFitted: PropTypes.bool,
  /** Whether tab selection is manual (requires explicit onChange handling) */
  isManual: PropTypes.bool,
  /** Whether tab panels should be lazily mounted */
  isLazy: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

TabList.propTypes = {
  /** Tab components */
  children: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
};

Tab.propTypes = {
  /** Tab content */
  children: PropTypes.node,
  /** Tab index (automatically injected) */
  index: PropTypes.number,
  /** Whether the tab is disabled */
  disabled: PropTypes.bool,
  /** Optional icon */
  icon: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
};

TabPanels.propTypes = {
  /** TabPanel components */
  children: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
};

TabPanel.propTypes = {
  /** Panel content */
  children: PropTypes.node,
  /** Panel index (automatically injected) */
  index: PropTypes.number,
  /** Additional CSS classes */
  className: PropTypes.string,
};

// Export all components
export { Tabs, TabList, Tab, TabPanels, TabPanel };
