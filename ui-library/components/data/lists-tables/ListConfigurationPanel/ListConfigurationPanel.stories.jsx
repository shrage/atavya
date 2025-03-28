import { useState } from 'react';
import ListConfigurationPanel from './ListConfigurationPanel';

export default {
  title: "Data/Lists & Tables/ListConfigurationPanel",
  component: ListConfigurationPanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Notion-style side panel for configuring list settings including fields, views, filters, sorting, and grouping.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the panel is open',
    },
    width: {
      control: { type: 'range', min: 250, max: 500, step: 10 },
      description: 'Width of the panel in pixels',
    },
  },
};

// Initial sample data
const sampleFields = [
  { id: 'name', name: 'Name', type: 'text', visible: true },
  { id: 'email', name: 'Email', type: 'text', visible: true },
  { id: 'role', name: 'Role', type: 'select', visible: true },
  { id: 'status', name: 'Status', type: 'status', visible: true },
  { id: 'department', name: 'Department', type: 'select', visible: true },
  { id: 'lastActive', name: 'Last Active', type: 'date', visible: false },
  { id: 'notes', name: 'Notes', type: 'richText', visible: false },
];

const sampleViews = [
  { 
    id: 'default', 
    name: 'Default View',
    fields: sampleFields.map(f => ({ id: f.id, visible: f.visible })),
    filters: {},
    sortConfig: [{ field: 'name', direction: 'asc' }],
    groupBy: null
  },
  { 
    id: 'by-department', 
    name: 'By Department',
    fields: sampleFields.map(f => ({ id: f.id, visible: f.visible })),
    filters: { 'status': { field: 'status', operator: 'equals', value: 'Active' } },
    sortConfig: [{ field: 'name', direction: 'asc' }],
    groupBy: 'department'
  },
  { 
    id: 'inactive-users', 
    name: 'Inactive Users',
    fields: sampleFields.map(f => ({ id: f.id, visible: f.visible })),
    filters: { 'status': { field: 'status', operator: 'equals', value: 'Inactive' } },
    sortConfig: [{ field: 'lastActive', direction: 'desc' }],
    groupBy: null
  },
];

const sampleFilters = {
  'filter-1': { field: 'status', operator: 'equals', value: 'Active' }
};

const sampleSortConfig = [
  { field: 'name', direction: 'asc' }
];

// Template with state management for interactive stories
const InteractiveTemplate = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen || false);
  const [fields, setFields] = useState(sampleFields);
  const [views, setViews] = useState(sampleViews);
  const [filters, setFilters] = useState(sampleFilters);
  const [sortConfig, setSortConfig] = useState(sampleSortConfig);
  const [groupBy, setGroupBy] = useState(args.groupBy || null);

  return (
    <div className="h-screen bg-gray-100 p-4">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close Panel' : 'Open Panel'}
      </button>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-lg font-medium mb-2">Panel State (Preview Only)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium">Active Fields:</h3>
            <ul className="list-disc pl-5 mt-2">
              {fields
                .filter(f => f.visible)
                .map(field => (
                  <li key={field.id}>{field.name} ({field.type})</li>
                ))
              }
            </ul>
          </div>
          <div>
            <h3 className="font-medium">Active Filters:</h3>
            <ul className="list-disc pl-5 mt-2">
              {Object.entries(filters).map(([id, filter]) => (
                <li key={id}>
                  {fields.find(f => f.id === filter.field)?.name || filter.field} {filter.operator} {filter.value}
                </li>
              ))}
              {Object.keys(filters).length === 0 && <li className="text-gray-500">No filters applied</li>}
            </ul>
          </div>
          <div>
            <h3 className="font-medium">Sort Configuration:</h3>
            <ul className="list-disc pl-5 mt-2">
              {sortConfig.map((sort, index) => (
                <li key={index}>
                  {fields.find(f => f.id === sort.field)?.name || sort.field} ({sort.direction})
                </li>
              ))}
              {sortConfig.length === 0 && <li className="text-gray-500">No sorting applied</li>}
            </ul>
          </div>
          <div>
            <h3 className="font-medium">Grouping:</h3>
            <p className="mt-2">
              {groupBy ? `Grouped by ${fields.find(f => f.id === groupBy)?.name || groupBy}` : 'No grouping applied'}
            </p>
          </div>
        </div>
      </div>

      <ListConfigurationPanel
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        fields={fields}
        views={views}
        filters={filters}
        sortConfig={sortConfig}
        groupBy={groupBy}
        onFieldsChange={setFields}
        onViewCreate={(newView) => {
          setViews([...views, { ...newView, id: `view-${Date.now()}` }]);
        }}
        onViewUpdate={(viewId, updates) => {
          setViews(views.map(view => 
            view.id === viewId ? { ...view, ...updates } : view
          ));
        }}
        onViewDelete={(viewId) => {
          setViews(views.filter(view => view.id !== viewId));
        }}
        onFiltersChange={setFilters}
        onSortChange={setSortConfig}
        onGroupByChange={setGroupBy}
      />
    </div>
  );
};

export const Default = {
  render: InteractiveTemplate,
  args: {
    isOpen: true,
    width: 320,
    fields: sampleFields,
    views: sampleViews,
    filters: sampleFilters,
    sortConfig: sampleSortConfig,
    groupBy: null,
  },
};

export const FieldsTab = {
  render: InteractiveTemplate,
  args: {
    ...Default.args,
    // The panel will open on the fields tab by default
  },
};

export const ViewsTab = {
  render: (args) => {
    // Force the activeTab to be 'views' initially
    const WithInitialActiveTab = () => {
      const [activeTab, setActiveTab] = useState('views');
      return <InteractiveTemplate {...args} />;
    };
    return <WithInitialActiveTab />;
  },
  args: {
    ...Default.args,
  },
};

export const FiltersTab = {
  render: (args) => {
    // Force the activeTab to be 'filters' initially
    const WithInitialActiveTab = () => {
      const [activeTab, setActiveTab] = useState('filters');
      return <InteractiveTemplate {...args} />;
    };
    return <WithInitialActiveTab />;
  },
  args: {
    ...Default.args,
    filters: {
      'filter-1': { field: 'status', operator: 'equals', value: 'Active' },
      'filter-2': { field: 'department', operator: 'equals', value: 'Engineering' }
    }
  },
};

export const SortTab = {
  render: (args) => {
    // Force the activeTab to be 'sort' initially
    const WithInitialActiveTab = () => {
      const [activeTab, setActiveTab] = useState('sort');
      return <InteractiveTemplate {...args} />;
    };
    return <WithInitialActiveTab />;
  },
  args: {
    ...Default.args,
    sortConfig: [
      { field: 'department', direction: 'asc' },
      { field: 'name', direction: 'asc' }
    ]
  },
};

export const GroupTab = {
  render: (args) => {
    // Force the activeTab to be 'group' initially
    const WithInitialActiveTab = () => {
      const [activeTab, setActiveTab] = useState('group');
      return <InteractiveTemplate {...args} />;
    };
    return <WithInitialActiveTab />;
  },
  args: {
    ...Default.args,
    groupBy: 'department'
  },
};

