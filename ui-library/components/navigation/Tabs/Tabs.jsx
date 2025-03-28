import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Tab component
 * Individual tab item used within the Tabs component
 */
export const Tab = ({ id, label, icon, disabled, className, count }) => {
  return null; // Rendering is handled by the parent Tabs component
};

Tab.propTypes = {
  /** Unique ID for the tab */
  id: PropTypes.string.isRequired,
  /** Display label for the tab */
  label: PropTypes.node.isRequired,
  /** Optional icon to display with the tab label */
  icon: PropTypes.node,
  /** Whether the tab is disabled */
  disabled: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Optional count/badge to display with the tab */
  count: PropTypes.number,
};

/**
 * TabPanel component
 * Content container for each tab
 */
export const TabPanel = ({ id, children, className }) => {
  return null; // Rendering is handled by the parent Tabs component
};

TabPanel.propTypes = {
  /** Unique ID for the tab panel, must match the corresponding Tab id */
  id: PropTypes.string.isRequired,
  /** Content to display in the tab panel */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
};

/**
 * Tabs component
 * A tabbed interface for organizing and displaying content in separate sections
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <Tabs
 *   defaultActiveTab="tab1"
 *   onChange={(tabId) => console.log(`Tab changed to ${tabId}`)}
 * >
 *   <Tab id="tab1" label="First Tab">
 *     <TabPanel id="tab1">
 *       Content for the first tab
 *     </TabPanel>
 *   </Tab>
 *   <Tab id="tab2" label="Second Tab">
 *     <TabPanel id="tab2">
 *       Content for the second tab
 *     </TabPanel>
 *   </Tab>
 * </Tabs>
 * ```
 */
const Tabs = ({
  // Content & Structure
  children,
  
  // State
  activeTab,
  defaultActiveTab,
  onChange,
  
  // Display
  variant = 'line',
  orientation = 'horizontal',
  fullWidth = false,
  
  // Style
  className,
  tabsClassName,
  tabClassName,
  activeTabClassName,
  disabledTabClassName,
  panelClassName,
}) => {
  // Extract tabs and panels from children
  const tabs = React.Children.toArray(children).filter(
    (child) => child.type === Tab
  );
  
  // Find all tab panels
  const allPanels = React.Children.toArray(children).filter(
    (child) => child.type === TabPanel
  );
  
  // Setup state for the active tab
  const [internalActiveTab, setInternalActiveTab] = useState(
    activeTab || defaultActiveTab || (tabs.length > 0 ? tabs[0].props.id : '')
  );
  
  // Update internal state when activeTab prop changes
  useEffect(() => {
    if (activeTab !== undefined) {
      setInternalActiveTab(activeTab);
    }
  }, [activeTab]);
  
  // Handle tab click
  const handleTabClick = (tabId, disabled) => {
    if (disabled) {
      return;
    }
    
    if (activeTab === undefined) {
      setInternalActiveTab(tabId);
    }
    
    if (onChange) {
      onChange(tabId);
    }
  };
  
  // Determine variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'line':
        return 'border-b border-border-light';
      case 'enclosed':
        return 'border-b border-border-light';
      case 'pills':
        return '';
      case 'solid':
        return 'bg-background-offwhite p-1 rounded';
      default:
        return 'border-b border-border-light';
    }
  };
  
  // Determine tab item classes based on variant and state
  const getTabItemClasses = (id, disabled) => {
    const isActive = id === internalActiveTab;
    
    // Base classes
    let baseClasses = twMerge(
      'flex items-center px-4 py-2 font-medium text-sm focus:outline-none transition',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      tabClassName
    );
    
    // Variant-specific classes
    let variantClasses = '';
    
    switch (variant) {
      case 'line':
        variantClasses = twMerge(
          'hover:text-text-hover border-b-2 border-transparent',
          isActive ? 'text-primary border-primary' : 'text-text-secondary'
        );
        break;
        
      case 'enclosed':
        variantClasses = twMerge(
          'border-b rounded-t-lg',
          isActive
            ? 'text-primary border-t border-l border-r border-border-light border-b-transparent bg-white'
            : 'text-text-secondary border-transparent hover:text-text-hover hover:border-border-medium'
        );
        break;
        
      case 'pills':
        variantClasses = twMerge(
          'rounded-full',
          isActive
            ? 'bg-primary text-white'
            : 'text-text-secondary hover:text-text-hover hover:bg-background-hover'
        );
        break;
        
      case 'solid':
        variantClasses = twMerge(
          'rounded',
          isActive
            ? 'bg-white text-text-primary shadow-sm'
            : 'text-text-secondary hover:text-text-hover hover:bg-background-hover'
        );
        break;
    }
    
    // Active and disabled classes
    const stateClasses = isActive 
      ? activeTabClassName 
      : (disabled ? disabledTabClassName : '');
    
    return twMerge(baseClasses, variantClasses, stateClasses);
  };
  
  // Render the tab items
  const renderTabs = () => {
    return (
      <div
        className={twMerge(
          'flex',
          orientation === 'vertical' ? 'flex-col' : '',
          getVariantClasses(),
          tabsClassName
        )}
        role="tablist"
      >
        {tabs.map((tab) => {
          const { id, label, icon, disabled, className: tabItemClassName, count } = tab.props;
          const isActive = id === internalActiveTab;
          
          return (
            <div
              key={id}
              role="tab"
              id={`tab-${id}`}
              tabIndex={isActive && !disabled ? 0 : -1}
              aria-selected={isActive}
              aria-controls={`panel-${id}`}
              aria-disabled={disabled}
              className={twMerge(
                getTabItemClasses(id, disabled),
                fullWidth && orientation !== 'vertical' ? 'flex-1 justify-center' : '',
                tabItemClassName
              )}
              onClick={() => handleTabClick(id, disabled)}
            >
              {icon && <span className="mr-2">{icon}</span>}
              <span>{label}</span>
              {count !== undefined && (
                <span className="ml-2 bg-background-hover text-text-primary text-xs rounded-full px-2 py-0.5">
                  {count}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render the active tab panel
  const renderActivePanel = () => {
    const activePanel = allPanels.find(
      (panel) => panel.props.id === internalActiveTab
    );
    
    if (!activePanel) {
      return null;
    }
    
    return (
      <div
        role="tabpanel"
        id={`panel-${activePanel.props.id}`}
        aria-labelledby={`tab-${activePanel.props.id}`}
        className={twMerge(
          'py-4',
          panelClassName,
          activePanel.props.className
        )}
      >
        {activePanel.props.children}
      </div>
    );
  };
  
  return (
    <div
      className={twMerge(
        'flex',
        orientation === 'vertical' ? 'flex-row' : 'flex-col',
        className
      )}
    >
      {renderTabs()}
      {renderActivePanel()}
    </div>
  );
};

Tabs.propTypes = {
  /** Tab components */
  children: PropTypes.node.isRequired,
  
  /** Controlled active tab ID */
  activeTab: PropTypes.string,
  
  /** Default active tab ID (uncontrolled) */
  defaultActiveTab: PropTypes.string,
  
  /** Called when the active tab changes */
  onChange: PropTypes.func,
  
  /** Tab style variant */
  variant: PropTypes.oneOf(['line', 'enclosed', 'pills', 'solid']),
  
  /** Tab orientation */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  
  /** Whether tabs should take full width */
  fullWidth: PropTypes.bool,
  
  /** Additional CSS classes for the container */
  className: PropTypes.string,
  
  /** Additional CSS classes for the tabs container */
  tabsClassName: PropTypes.string,
  
  /** Additional CSS classes for all tabs */
  tabClassName: PropTypes.string,
  
  /** Additional CSS classes for the active tab */
  activeTabClassName: PropTypes.string,
  
  /** Additional CSS classes for disabled tabs */
  disabledTabClassName: PropTypes.string,
  
  /** Additional CSS classes for the tab panel */
  panelClassName: PropTypes.string,
};

export default Tabs;
