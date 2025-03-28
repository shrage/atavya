import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * ListConfigurationPanel component
 * Side panel for configuring list settings similar to Notion
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <ListConfigurationPanel
 *   isOpen={isConfigPanelOpen}
 *   onClose={() => setConfigPanelOpen(false)}
 *   fields={fields}
 *   onFieldsChange={handleFieldsChange}
 *   onViewSave={handleViewSave}
 * />
 * ```
 */
const ListConfigurationPanel = ({
  isOpen = false,
  onClose,
  
  // Data
  fields = [],
  views = [],
  filters = {},
  sortConfig = [],
  groupBy = null,
  
  // Callbacks
  onFieldsChange,
  onViewCreate,
  onViewUpdate,
  onViewDelete,
  onFiltersChange,
  onSortChange,
  onGroupByChange,
  
  // Display options
  width = 320,
  className,
}) => {
  const [activeTab, setActiveTab] = useState('fields');
  const [editingField, setEditingField] = useState(null);
  const [editingView, setEditingView] = useState(null);
  const [newViewName, setNewViewName] = useState('');
  const [selectedView, setSelectedView] = useState(null);

  if (!isOpen) return null;

  const handleFieldVisibilityToggle = (fieldId) => {
    if (!onFieldsChange) return;
    
    const updatedFields = fields.map(field => 
      field.id === fieldId 
        ? { ...field, visible: !field.visible } 
        : field
    );
    
    onFieldsChange(updatedFields);
  };

  const handleFieldReorder = (fieldId, direction) => {
    if (!onFieldsChange) return;
    
    const index = fields.findIndex(field => field.id === fieldId);
    if (index === -1) return;
    
    if (direction === 'up' && index > 0) {
      const updatedFields = [...fields];
      [updatedFields[index], updatedFields[index - 1]] = 
        [updatedFields[index - 1], updatedFields[index]];
      
      onFieldsChange(updatedFields);
    } else if (direction === 'down' && index < fields.length - 1) {
      const updatedFields = [...fields];
      [updatedFields[index], updatedFields[index + 1]] = 
        [updatedFields[index + 1], updatedFields[index]];
      
      onFieldsChange(updatedFields);
    }
  };

  const handleSaveView = () => {
    if (!newViewName.trim() || !onViewCreate) return;
    
    onViewCreate({
      name: newViewName,
      fields: fields.map(f => ({ id: f.id, visible: f.visible, width: f.width })),
      filters,
      sortConfig,
      groupBy,
    });
    
    setNewViewName('');
  };

  const handleUpdateView = () => {
    if (!selectedView || !onViewUpdate) return;
    
    const view = views.find(v => v.id === selectedView);
    if (!view) return;
    
    onViewUpdate(selectedView, {
      fields: fields.map(f => ({ id: f.id, visible: f.visible, width: f.width })),
      filters,
      sortConfig,
      groupBy,
    });
  };

  const handleDeleteView = () => {
    if (!selectedView || !onViewDelete) return;
    
    onViewDelete(selectedView);
    setSelectedView(null);
  };

  const renderFieldsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Fields</h3>
        <button 
          className="text-primary hover:text-primary-dark text-sm"
          onClick={() => setEditingField({
            id: 'new',
            name: '',
            type: 'text',
            visible: true,
          })}
        >
          + Add field
        </button>
      </div>
      
      <div className="space-y-2">
        {fields.map(field => (
          <div 
            key={field.id} 
            className="flex items-center justify-between p-2 rounded hover:bg-background-hover"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={field.visible}
                onChange={() => handleFieldVisibilityToggle(field.id)}
                className="mr-3"
              />
              <span>{field.name}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <button 
                className="p-1 text-text-secondary hover:text-text-primary"
                onClick={() => handleFieldReorder(field.id, 'up')}
              >
                ↑
              </button>
              <button 
                className="p-1 text-text-secondary hover:text-text-primary"
                onClick={() => handleFieldReorder(field.id, 'down')}
              >
                ↓
              </button>
              <button 
                className="p-1 text-text-secondary hover:text-text-primary"
                onClick={() => setEditingField(field)}
              >
                ✎
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {editingField && (
        <div className="fixed inset-0 bg-background-dark bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background-offwhite rounded-lg p-4 shadow-lg w-96">
            <h3 className="font-medium mb-4">
              {editingField.id === 'new' ? 'Add Field' : 'Edit Field'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Field Name
                </label>
                <input
                  type="text"
                  value={editingField.name}
                  onChange={(e) => setEditingField({...editingField, name: e.target.value})}
                  className="w-full p-2 border border-border-light rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Field Type
                </label>
                <select
                  value={editingField.type}
                  onChange={(e) => setEditingField({...editingField, type: e.target.value})}
                  className="w-full p-2 border border-border-light rounded"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="select">Select</option>
                  <option value="multiSelect">Multi-Select</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="richText">Rich Text</option>
                  <option value="lookup">Lookup</option>
                  <option value="formula">Formula</option>
                  <option value="status">Status</option>
                  <option value="file">File</option>
                </select>
              </div>
              
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 bg-background-hover text-text-primary rounded hover:bg-background-skeleton"
                  onClick={() => setEditingField(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                  onClick={() => {
                    if (!editingField.name.trim()) return;
                    
                    if (editingField.id === 'new') {
                      onFieldsChange?.([
                        ...fields, 
                        {
                          ...editingField,
                          id: `field-${Date.now()}`,
                        }
                      ]);
                    } else {
                      onFieldsChange?.(
                        fields.map(f => 
                          f.id === editingField.id ? editingField : f
                        )
                      );
                    }
                    
                    setEditingField(null);
                  }}
                >
                  {editingField.id === 'new' ? 'Add' : 'Update'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderViewsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Saved Views</h3>
      </div>
      
      {views.length === 0 ? (
        <div className="text-center text-text-secondary p-4">
          No saved views
        </div>
      ) : (
        <div className="space-y-2">
          {views.map(view => (
            <div 
              key={view.id} 
              className={twMerge(
                'p-3 rounded-lg border',
                selectedView === view.id 
                  ? 'border-primary bg-primary-light bg-opacity-10' 
                  : 'border-border-light hover:bg-background-hover'
              )}
              onClick={() => setSelectedView(view.id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{view.name}</span>
                
                <div className="flex space-x-2">
                  <button 
                    className="text-text-secondary hover:text-text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingView(view);
                    }}
                  >
                    ✎
                  </button>
                  <button 
                    className="text-status-copywriting hover:text-status-copywriting"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Delete view "${view.name}"?`)) {
                        handleDeleteView();
                      }
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="pt-4 border-t border-border-light">
        <h4 className="font-medium mb-2">Create New View</h4>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newViewName}
            onChange={(e) => setNewViewName(e.target.value)}
            placeholder="View name"
            className="flex-1 p-2 border border-border-light rounded"
          />
          <button
            className="px-3 py-2 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50"
            disabled={!newViewName.trim()}
            onClick={handleSaveView}
          >
            Save
          </button>
        </div>
      </div>
      
      {selectedView && (
        <div className="pt-4 border-t border-border-light">
          <h4 className="font-medium mb-2">Selected View</h4>
          <div className="flex space-x-2">
            <button
              className="flex-1 px-3 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              onClick={handleUpdateView}
            >
              Update with Current Settings
            </button>
          </div>
        </div>
      )}
      
      {editingView && (
        <div className="fixed inset-0 bg-background-dark bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background-offwhite rounded-lg p-4 shadow-lg w-96">
            <h3 className="font-medium mb-4">Edit View</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  View Name
                </label>
                <input
                  type="text"
                  value={editingView.name}
                  onChange={(e) => setEditingView({...editingView, name: e.target.value})}
                  className="w-full p-2 border border-border-light rounded"
                />
              </div>
              
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 bg-background-hover text-text-primary rounded hover:bg-background-skeleton"
                  onClick={() => setEditingView(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                  onClick={() => {
                    if (!editingView.name.trim()) return;
                    
                    onViewUpdate?.(editingView.id, { name: editingView.name });
                    setEditingView(null);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderFiltersTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Filters</h3>
        <button 
          className="text-primary hover:text-primary-dark text-sm"
          onClick={() => {
            // Add empty filter
            onFiltersChange?.({
              ...filters,
              [`filter-${Date.now()}`]: { field: '', operator: 'equals', value: '' }
            });
          }}
        >
          + Add filter
        </button>
      </div>
      
      {Object.keys(filters).length === 0 ? (
        <div className="text-center text-text-secondary p-4">
          No filters applied
        </div>
      ) : (
        <div className="space-y-3">
          {Object.entries(filters).map(([filterId, filter]) => (
            <div key={filterId} className="p-3 border border-border-light rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Filter</span>
                <button 
                  className="text-status-copywriting hover:text-status-copywriting"
                  onClick={() => {
                    const newFilters = {...filters};
                    delete newFilters[filterId];
                    onFiltersChange?.(newFilters);
                  }}
                >
                  Remove
                </button>
              </div>
              
              <div className="space-y-2">
                <select
                  value={filter.field}
                  onChange={(e) => {
                    onFiltersChange?.({
                      ...filters,
                      [filterId]: { ...filter, field: e.target.value }
                    });
                  }}
                  className="w-full p-2 border border-border-light rounded"
                >
                  <option value="">Select field</option>
                  {fields.map(field => (
                    <option key={field.id} value={field.id}>{field.name}</option>
                  ))}
                </select>
                
                <select
                  value={filter.operator}
                  onChange={(e) => {
                    onFiltersChange?.({
                      ...filters,
                      [filterId]: { ...filter, operator: e.target.value }
                    });
                  }}
                  className="w-full p-2 border border-border-light rounded"
                >
                  <option value="equals">Equals</option>
                  <option value="contains">Contains</option>
                  <option value="startsWith">Starts with</option>
                  <option value="endsWith">Ends with</option>
                  <option value="greaterThan">Greater than</option>
                  <option value="lessThan">Less than</option>
                </select>
                
                <input
                  type="text"
                  value={filter.value}
                  onChange={(e) => {
                    onFiltersChange?.({
                      ...filters,
                      [filterId]: { ...filter, value: e.target.value }
                    });
                  }}
                  placeholder="Value"
                  className="w-full p-2 border border-border-light rounded"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSortTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Sort</h3>
        <button 
          className="text-primary hover:text-primary-dark text-sm"
          onClick={() => {
            onSortChange?.([
              ...sortConfig,
              { field: '', direction: 'asc' }
            ]);
          }}
        >
          + Add sort
        </button>
      </div>
      
      {sortConfig.length === 0 ? (
        <div className="text-center text-text-secondary p-4">
          No sorting applied
        </div>
      ) : (
        <div className="space-y-3">
          {sortConfig.map((sort, index) => (
            <div key={index} className="p-3 border border-border-light rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">
                  {index === 0 ? 'Primary sort' : `Sort ${index + 1}`}
                </span>
                <button 
                  className="text-status-copywriting hover:text-status-copywriting"
                  onClick={() => {
                    const newSortConfig = [...sortConfig];
                    newSortConfig.splice(index, 1);
                    onSortChange?.(newSortConfig);
                  }}
                >
                  Remove
                </button>
              </div>
              
              <div className="space-y-2">
                <select
                  value={sort.field}
                  onChange={(e) => {
                    const newSortConfig = [...sortConfig];
                    newSortConfig[index] = { ...sort, field: e.target.value };
                    onSortChange?.(newSortConfig);
                  }}
                  className="w-full p-2 border border-border-light rounded"
                >
                  <option value="">Select field</option>
                  {fields.map(field => (
                    <option key={field.id} value={field.id}>{field.name}</option>
                  ))}
                </select>
                
                <div className="flex space-x-2">
                  <button
                    className={twMerge(
                      'flex-1 py-2 px-3 rounded',
                      sort.direction === 'asc' 
                        ? 'bg-primary text-white' 
                        : 'bg-background-hover text-text-primary'
                    )}
                    onClick={() => {
                      const newSortConfig = [...sortConfig];
                      newSortConfig[index] = { ...sort, direction: 'asc' };
                      onSortChange?.(newSortConfig);
                    }}
                  >
                    Ascending
                  </button>
                  <button
                    className={twMerge(
                      'flex-1 py-2 px-3 rounded',
                      sort.direction === 'desc' 
                        ? 'bg-primary text-white' 
                        : 'bg-background-hover text-text-primary'
                    )}
                    onClick={() => {
                      const newSortConfig = [...sortConfig];
                      newSortConfig[index] = { ...sort, direction: 'desc' };
                      onSortChange?.(newSortConfig);
                    }}
                  >
                    Descending
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderGroupTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Group By</h3>
      </div>
      
      <div className="space-y-2">
        <select
          value={groupBy || ''}
          onChange={(e) => {
            onGroupByChange?.(e.target.value || null);
          }}
          className="w-full p-2 border border-border-light rounded"
        >
          <option value="">No grouping</option>
          {fields.map(field => (
            <option key={field.id} value={field.id}>{field.name}</option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div 
      className={twMerge(
        'fixed inset-y-0 right-0 bg-background-offwhite shadow-lg z-40',
        className
      )}
      style={{ width: `${width}px` }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border-light">
          <h2 className="font-medium text-lg">List Settings</h2>
          <button 
            className="p-2 text-text-secondary hover:text-text-primary"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-border-light">
          {['fields', 'views', 'filters', 'sort', 'group'].map(tab => (
            <button
              key={tab}
              className={twMerge(
                'flex-1 py-2 px-4 text-center',
                activeTab === tab 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-text-secondary hover:text-text-primary'
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'fields' && renderFieldsTab()}
          {activeTab === 'views' && renderViewsTab()}
          {activeTab === 'filters' && renderFiltersTab()}
          {activeTab === 'sort' && renderSortTab()}
          {activeTab === 'group' && renderGroupTab()}
        </div>
      </div>
    </div>
  );
};

ListConfigurationPanel.propTypes = {
  /** Whether the panel is open */
  isOpen: PropTypes.bool,
  /** Close handler */
  onClose: PropTypes.func,
  /** Field definitions */
  fields: PropTypes.array,
  /** Saved views */
  views: PropTypes.array,
  /** Current filters */
  filters: PropTypes.object,
  /** Current sort configuration */
  sortConfig: PropTypes.array,
  /** Current group by field */
  groupBy: PropTypes.string,
  /** Called when fields change */
  onFieldsChange: PropTypes.func,
  /** Called when a view is created */
  onViewCreate: PropTypes.func,
  /** Called when a view is updated */
  onViewUpdate: PropTypes.func,
  /** Called when a view is deleted */
  onViewDelete: PropTypes.func,
  /** Called when filters change */
  onFiltersChange: PropTypes.func,
  /** Called when sort configuration changes */
  onSortChange: PropTypes.func,
  /** Called when group by field changes */
  onGroupByChange: PropTypes.func,
  /** Width of the panel in pixels */
  width: PropTypes.number,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default ListConfigurationPanel;
