import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

import BaseList from '../BaseList/BaseList';
import BaseListItem from '../BaseListItem/BaseListItem';
import ListConfigurationPanel from '../ListConfigurationPanel/ListConfigurationPanel';

/**
 * ListView component
 * Complete list view that combines BaseList, BaseListItem, and ListConfigurationPanel
 * Provides a fully functional list with configuration capabilities
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <ListView
 *   data={items}
 *   fields={fields}
 *   defaultView="default"
 *   views={savedViews}
 *   onViewCreate={handleViewCreate}
 * />
 * ```
 */
const ListView = ({
  // Data
  data = [],
  fields = [],
  views = [],
  
  // Default settings
  defaultView = null,
  keyField = 'id',
  defaultSortField = null,
  defaultSortDirection = 'asc',
  defaultGroupBy = null,
  defaultFilters = {},
  defaultPageSize = 25,
  defaultSelectedKeys = [],
  
  // Features
  selectable = true,
  multiSelect = true,
  expandable = true,
  draggable = false,
  
  // Callbacks
  onDataChange,
  onSelectionChange,
  onItemClick,
  onViewCreate,
  onViewUpdate,
  onViewDelete,
  
  // Render overrides
  renderItemContent,
  renderEmptyState,
  
  // Layout
  className,
  configPanelWidth = 320,
}) => {
  // State for list configuration
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [activeFields, setActiveFields] = useState(() => {
    // Initialize with fields marked as visible
    return fields.map(field => ({
      ...field,
      visible: field.visible !== undefined ? field.visible : true
    }));
  });
  const [sortConfig, setSortConfig] = useState([
    { field: defaultSortField || (fields[0]?.id || 'id'), direction: defaultSortDirection || 'asc' }
  ]);
  const [groupBy, setGroupBy] = useState(defaultGroupBy);
  const [filters, setFilters] = useState(defaultFilters || {});
  const [selectedKeys, setSelectedKeys] = useState(defaultSelectedKeys || []);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [activeView, setActiveView] = useState(defaultView);
  
  // Derived state
  const visibleColumns = useMemo(() => {
    return activeFields
      .filter(field => field.visible)
      .map(field => ({
        key: field.id,
        header: field.name,
        width: field.width || 1,
      }));
  }, [activeFields]);
  
  // Initialize with default view if specified
  React.useEffect(() => {
    if (defaultView && views.length > 0) {
      const view = views.find(v => v.id === defaultView);
      if (view) {
        applyView(view);
      }
    }
  }, [defaultView, views]);
  
  // Apply a saved view
  const applyView = useCallback((view) => {
    if (view.fields) {
      // Update field visibility based on the view
      setActiveFields(prev => {
        return prev.map(field => {
          const viewField = view.fields.find(f => f.id === field.id);
          return viewField 
            ? { ...field, visible: viewField.visible, width: viewField.width }
            : field;
        });
      });
    }
    
    if (view.sortConfig) {
      setSortConfig(view.sortConfig);
    }
    
    if (view.groupBy !== undefined) {
      setGroupBy(view.groupBy);
    }
    
    if (view.filters) {
      setFilters(view.filters);
    }
    
    setActiveView(view.id);
  }, []);
  
  // Handle field changes from config panel
  const handleFieldsChange = useCallback((updatedFields) => {
    setActiveFields(updatedFields);
  }, []);
  
  // Handle sort changes from config panel
  const handleSortChange = useCallback((updatedSort) => {
    setSortConfig(updatedSort);
  }, []);
  
  // Handle group by changes from config panel
  const handleGroupByChange = useCallback((updatedGroupBy) => {
    setGroupBy(updatedGroupBy);
  }, []);
  
  // Handle filter changes from config panel
  const handleFiltersChange = useCallback((updatedFilters) => {
    setFilters(updatedFilters);
  }, []);
  
  // Handle view creation/update/deletion
  const handleViewCreate = useCallback((newView) => {
    if (onViewCreate) {
      onViewCreate({
        ...newView,
        id: `view-${Date.now()}`
      });
    }
  }, [onViewCreate]);
  
  const handleViewUpdate = useCallback((viewId, updates) => {
    if (onViewUpdate) {
      onViewUpdate(viewId, updates);
    }
  }, [onViewUpdate]);
  
  const handleViewDelete = useCallback((viewId) => {
    if (onViewDelete) {
      onViewDelete(viewId);
    }
    
    if (activeView === viewId) {
      setActiveView(null);
    }
  }, [onViewDelete, activeView]);
  
  // Handle item selection
  const handleSelectionChange = useCallback((keys) => {
    setSelectedKeys(keys);
    
    if (onSelectionChange) {
      const selectedItems = data.filter(item => keys.includes(item[keyField]));
      onSelectionChange(selectedItems, keys);
    }
  }, [data, keyField, onSelectionChange]);
  
  // Handle item expansion
  const handleItemExpand = useCallback((item, expanded) => {
    const itemKey = item[keyField];
    
    setExpandedKeys(prev => 
      expanded 
        ? [...prev, itemKey] 
        : prev.filter(key => key !== itemKey)
    );
  }, [keyField]);
  
  // Configure button in toolbar
  const renderListToolbar = () => (
    <div className="flex justify-between items-center p-3 bg-background-offwhite border-b border-border-light">
      <div className="flex items-center">
        <h2 className="text-lg font-medium">
          {activeView 
            ? views.find(v => v.id === activeView)?.name || 'List View'
            : 'List View'
          }
        </h2>
        
        {selectedKeys.length > 0 && (
          <span className="ml-3 text-sm text-text-secondary">
            {selectedKeys.length} selected
          </span>
        )}
      </div>
      
      <div className="flex items-center">
        <button
          className="px-3 py-1 text-sm bg-background-hover hover:bg-background-skeleton rounded flex items-center"
          onClick={() => setShowConfigPanel(!showConfigPanel)}
        >
          <span className="mr-1">⚙</span>
          Configure
        </button>
      </div>
    </div>
  );
  
  // Custom renderer for list items
  const renderItem = useCallback((item) => {
    const itemKey = item[keyField];
    const selected = selectedKeys.includes(itemKey);
    const expanded = expandedKeys.includes(itemKey);
    
    return (
      <BaseListItem
        item={item}
        itemKey={itemKey}
        selected={selected}
        expanded={expanded}
        selectable={selectable}
        expandable={expandable}
        draggable={draggable}
        onSelect={(_, isSelected) => {
          handleSelectionChange(
            isSelected
              ? [...selectedKeys.filter(k => k !== itemKey), itemKey]
              : selectedKeys.filter(k => k !== itemKey)
          );
        }}
        onExpand={handleItemExpand}
        onClick={() => onItemClick?.(item)}
      >
        {renderItemContent ? (
          renderItemContent(item, { selected, expanded })
        ) : (
          <div>
            {activeFields
              .filter(field => field.visible)
              .map((field, index) => (
                <div key={field.id} className={index > 0 ? 'mt-1' : ''}>
                  <span className="text-text-secondary text-sm mr-2">{field.name}:</span>
                  <span>{item[field.id]}</span>
                </div>
              ))}
          </div>
        )}
      </BaseListItem>
    );
  }, [
    keyField, 
    selectedKeys, 
    expandedKeys, 
    selectable, 
    expandable, 
    draggable, 
    handleSelectionChange, 
    handleItemExpand, 
    onItemClick, 
    renderItemContent, 
    activeFields
  ]);

  return (
    <div className={twMerge('bg-background-offwhite rounded-lg shadow', className)}>
      {/* Toolbar */}
      {renderListToolbar()}
      
      {/* Main List */}
      <BaseList
        data={data}
        columns={visibleColumns}
        keyField={keyField}
        selectable={selectable}
        multiSelect={multiSelect}
        sortField={sortConfig[0]?.field}
        sortDirection={sortConfig[0]?.direction}
        filters={filters}
        groupBy={groupBy}
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        renderItem={renderItem}
        emptyMessage={
          renderEmptyState 
            ? renderEmptyState() 
            : "No items found"
        }
      />
      
      {/* Configuration Panel */}
      <ListConfigurationPanel
        isOpen={showConfigPanel}
        onClose={() => setShowConfigPanel(false)}
        fields={activeFields}
        views={views}
        filters={filters}
        sortConfig={sortConfig}
        groupBy={groupBy}
        onFieldsChange={handleFieldsChange}
        onViewCreate={handleViewCreate}
        onViewUpdate={handleViewUpdate}
        onViewDelete={handleViewDelete}
        onFiltersChange={handleFiltersChange}
        onSortChange={handleSortChange}
        onGroupByChange={handleGroupByChange}
        width={configPanelWidth}
      />
    </div>
  );
};

ListView.propTypes = {
  /** List data items */
  data: PropTypes.array,
  /** Field definitions */
  fields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    width: PropTypes.number,
  })),
  /** Saved views */
  views: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    fields: PropTypes.array,
    filters: PropTypes.object,
    sortConfig: PropTypes.array,
    groupBy: PropTypes.string,
  })),
  /** Default view ID to apply */
  defaultView: PropTypes.string,
  /** Field to use as unique key */
  keyField: PropTypes.string,
  /** Default field to sort by */
  defaultSortField: PropTypes.string,
  /** Default sort direction */
  defaultSortDirection: PropTypes.oneOf(['asc', 'desc']),
  /** Default field to group by */
  defaultGroupBy: PropTypes.string,
  /** Default filters */
  defaultFilters: PropTypes.object,
  /** Default page size */
  defaultPageSize: PropTypes.number,
  /** Default selected keys */
  defaultSelectedKeys: PropTypes.array,
  /** Whether items can be selected */
  selectable: PropTypes.bool,
  /** Whether multiple items can be selected */
  multiSelect: PropTypes.bool,
  /** Whether items can be expanded */
  expandable: PropTypes.bool,
  /** Whether items can be dragged */
  draggable: PropTypes.bool,
  /** Called when data changes (e.g., reordering) */
  onDataChange: PropTypes.func,
  /** Called when selection changes */
  onSelectionChange: PropTypes.func,
  /** Called when an item is clicked */
  onItemClick: PropTypes.func,
  /** Called when a view is created */
  onViewCreate: PropTypes.func,
  /** Called when a view is updated */
  onViewUpdate: PropTypes.func,
  /** Called when a view is deleted */
  onViewDelete: PropTypes.func,
  /** Custom item content renderer */
  renderItemContent: PropTypes.func,
  /** Custom empty state renderer */
  renderEmptyState: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Width of the configuration panel */
  configPanelWidth: PropTypes.number,
};

export default ListView;
