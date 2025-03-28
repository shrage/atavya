import { useState } from 'react';
import ListView from './ListView';

export default {
  title: "Data/Lists & Tables/ListView",
  component: ListView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete list view that combines BaseList, BaseListItem, and ListConfigurationPanel. Provides a fully functional list with Notion-inspired configuration capabilities.',
      },
    },
  },
  tags: ['autodocs'],
};

// Sample user data
const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', department: 'Engineering', lastLogin: '2023-10-15T08:30:00Z', permissions: ['read', 'write', 'delete'] },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', department: 'Marketing', lastLogin: '2023-10-10T14:45:00Z', permissions: ['read'] },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active', department: 'Engineering', lastLogin: '2023-10-14T11:20:00Z', permissions: ['read', 'write'] },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', department: 'Sales', lastLogin: '2023-10-13T09:15:00Z', permissions: ['read'] },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Inactive', department: 'Marketing', lastLogin: '2023-10-05T16:30:00Z', permissions: ['read', 'write', 'delete'] },
  { id: 6, name: 'David Miller', email: 'david@example.com', role: 'User', status: 'Active', department: 'Sales', lastLogin: '2023-10-12T10:45:00Z', permissions: ['read'] },
  { id: 7, name: 'Eva Davis', email: 'eva@example.com', role: 'Editor', status: 'Active', department: 'Engineering', lastLogin: '2023-10-11T13:20:00Z', permissions: ['read', 'write'] },
  { id: 8, name: 'Frank Roberts', email: 'frank@example.com', role: 'User', status: 'Inactive', department: 'Marketing', lastLogin: '2023-10-04T15:10:00Z', permissions: ['read'] },
  { id: 9, name: 'Grace Taylor', email: 'grace@example.com', role: 'Admin', status: 'Active', department: 'Sales', lastLogin: '2023-10-09T08:50:00Z', permissions: ['read', 'write', 'delete'] },
  { id: 10, name: 'Henry Adams', email: 'henry@example.com', role: 'User', status: 'Active', department: 'Engineering', lastLogin: '2023-10-08T11:45:00Z', permissions: ['read'] },
];

// Field definitions
const userFields = [
  { id: 'name', name: 'Name', type: 'text', visible: true, width: 2 },
  { id: 'email', name: 'Email', type: 'text', visible: true, width: 3 },
  { id: 'role', name: 'Role', type: 'select', visible: true, width: 1 },
  { id: 'status', name: 'Status', type: 'status', visible: true, width: 1 },
  { id: 'department', name: 'Department', type: 'select', visible: true, width: 2 },
  { id: 'lastLogin', name: 'Last Login', type: 'date', visible: false, width: 2 },
  { id: 'permissions', name: 'Permissions', type: 'multiSelect', visible: false, width: 2 },
];

// Saved views
const userViews = [
  {
    id: 'default',
    name: 'All Users',
    fields: userFields.map(f => ({ id: f.id, visible: f.visible, width: f.width })),
    filters: {},
    sortConfig: [{ field: 'name', direction: 'asc' }],
    groupBy: null,
  },
  {
    id: 'by-department',
    name: 'By Department',
    fields: userFields.map(f => ({ id: f.id, visible: f.id !== 'department' ? f.visible : true, width: f.width })),
    filters: {},
    sortConfig: [{ field: 'name', direction: 'asc' }],
    groupBy: 'department',
  },
  {
    id: 'active-admins',
    name: 'Active Admins',
    fields: userFields.map(f => ({ id: f.id, visible: f.visible, width: f.width })),
    filters: {
      'filter-1': { field: 'status', operator: 'equals', value: 'Active' },
      'filter-2': { field: 'role', operator: 'equals', value: 'Admin' },
    },
    sortConfig: [{ field: 'name', direction: 'asc' }],
    groupBy: null,
  },
];

// Interactive template for the ListView
const Template = (args) => {
  const [data, setData] = useState(args.data || sampleUsers);
  const [views, setViews] = useState(args.views || userViews);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleViewCreate = (newView) => {
    setViews([...views, newView]);
  };

  const handleViewUpdate = (viewId, updates) => {
    setViews(views.map(view => 
      view.id === viewId ? { ...view, ...updates } : view
    ));
  };

  const handleViewDelete = (viewId) => {
    setViews(views.filter(view => view.id !== viewId));
  };

  const handleSelectionChange = (items) => {
    setSelectedItems(items);
  };

  // Custom item renderer for a more polished look
  const renderItemContent = (item, { selected, expanded }) => (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <div className="font-medium text-text-primary">{item.name}</div>
        <div className="text-sm text-text-secondary">{item.email}</div>
      </div>
      <div className="flex items-center space-x-3">
        <span className={`px-2 py-1 text-xs rounded ${
          item.role === 'Admin' 
            ? 'bg-status-info/10 text-status-info' 
            : item.role === 'Editor'
              ? 'bg-primary/10 text-primary'
              : 'bg-background-light text-text-secondary'
        }`}>
          {item.role}
        </span>
        <span className={`px-2 py-1 text-xs rounded ${
          item.status === 'Active' 
            ? 'bg-status-success/10 text-status-success' 
            : 'bg-status-error/10 text-status-error'
        }`}>
          {item.status}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background-light p-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary">User Management</h1>
          <p className="text-text-secondary">
            Example of ListView component with {data.length} users
          </p>
          {selectedItems.length > 0 && (
            <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded">
              <p className="text-primary">
                {selectedItems.length} users selected: {selectedItems.map(item => item.name).join(', ')}
              </p>
            </div>
          )}
        </div>

        <ListView
          {...args}
          data={data}
          fields={userFields}
          views={views}
          onViewCreate={handleViewCreate}
          onViewUpdate={handleViewUpdate}
          onViewDelete={handleViewDelete}
          onSelectionChange={handleSelectionChange}
          renderItemContent={renderItemContent}
          renderEmptyState={() => (
            <div className="p-8 text-center">
              <div className="text-text-secondary text-lg mb-2">👤</div>
              <h3 className="text-lg font-medium text-text-primary">No users found</h3>
              <p className="text-text-secondary">
                Try adjusting your filters or create a new user.
              </p>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export const Default = {
  render: Template,
  args: {
    data: sampleUsers,
    fields: userFields,
    views: userViews,
    defaultView: 'default',
    keyField: 'id',
    selectable: true,
    multiSelect: true,
    expandable: true,
    draggable: false,
  },
};

export const GroupedByDepartment = {
  render: Template,
  args: {
    ...Default.args,
    defaultView: 'by-department',
  },
};

export const FilteredView = {
  render: Template,
  args: {
    ...Default.args,
    defaultView: 'active-admins',
  },
};

export const NonSelectable = {
  render: Template,
  args: {
    ...Default.args,
    selectable: false,
  },
};

export const Expandable = {
  render: Template,
  args: {
    ...Default.args,
    expandable: true,
  },
};

export const Empty = {
  render: Template,
  args: {
    ...Default.args,
    data: [],
  },
};

// Story showing drag-and-drop functionality
export const DraggableItems = {
  render: Template,
  args: {
    ...Default.args,
    draggable: true,
  },
};

// Add a real-world example with project tasks
export const ProjectTaskList = {
  render: () => {
    // Sample project tasks
    const projectTasks = [
      { id: 1, title: 'Design system update', description: 'Update color palette and typography', assignee: 'Alice Brown', priority: 'High', status: 'In Progress', dueDate: '2025-04-05', tags: ['design', 'UI/UX'] },
      { id: 2, title: 'API integration', description: 'Connect to payment gateway API', assignee: 'Bob Johnson', priority: 'High', status: 'Pending', dueDate: '2025-04-10', tags: ['backend', 'integration'] },
      { id: 3, title: 'User testing', description: 'Conduct usability tests with 5 participants', assignee: 'Charlie Wilson', priority: 'Medium', status: 'Not Started', dueDate: '2025-04-15', tags: ['research', 'UX'] },
      { id: 4, title: 'Documentation', description: 'Update technical documentation', assignee: 'David Miller', priority: 'Low', status: 'Not Started', dueDate: '2025-04-20', tags: ['documentation'] },
      { id: 5, title: 'Bug fixes', description: 'Fix reported issues from QA team', assignee: 'Eva Davis', priority: 'Medium', status: 'In Progress', dueDate: '2025-04-08', tags: ['bugs', 'maintenance'] },
      { id: 6, title: 'Performance optimization', description: 'Improve page load time by 30%', assignee: 'Frank Roberts', priority: 'Medium', status: 'Completed', dueDate: '2025-04-02', tags: ['performance', 'frontend'] },
      { id: 7, title: 'Security audit', description: 'Conduct security review of authentication flow', assignee: 'Grace Taylor', priority: 'High', status: 'Pending', dueDate: '2025-04-12', tags: ['security', 'audit'] },
    ];

    // Field definitions for tasks
    const taskFields = [
      { id: 'title', name: 'Task', type: 'text', visible: true, width: 3 },
      { id: 'assignee', name: 'Assignee', type: 'text', visible: true, width: 2 },
      { id: 'priority', name: 'Priority', type: 'select', visible: true, width: 1 },
      { id: 'status', name: 'Status', type: 'status', visible: true, width: 1 },
      { id: 'dueDate', name: 'Due Date', type: 'date', visible: true, width: 1 },
      { id: 'tags', name: 'Tags', type: 'multiSelect', visible: true, width: 2 },
      { id: 'description', name: 'Description', type: 'text', visible: false, width: 3 },
    ];

    // Task views
    const taskViews = [
      {
        id: 'all-tasks',
        name: 'All Tasks',
        fields: taskFields.map(f => ({ id: f.id, visible: f.visible, width: f.width })),
        filters: {},
        sortConfig: [{ field: 'dueDate', direction: 'asc' }],
        groupBy: null,
      },
      {
        id: 'by-status',
        name: 'By Status',
        fields: taskFields.map(f => ({ id: f.id, visible: f.visible, width: f.width })),
        filters: {},
        sortConfig: [{ field: 'priority', direction: 'desc' }],
        groupBy: 'status',
      },
      {
        id: 'high-priority',
        name: 'High Priority',
        fields: taskFields.map(f => ({ id: f.id, visible: f.visible, width: f.width })),
        filters: {
          'filter-1': { field: 'priority', operator: 'equals', value: 'High' },
        },
        sortConfig: [{ field: 'dueDate', direction: 'asc' }],
        groupBy: null,
      },
    ];

    // Custom renderer for task items
    const renderTaskContent = (task) => (
      <div className="flex justify-between items-center p-3">
        <div className="flex-1">
          <div className="font-medium text-text-primary">{task.title}</div>
          <div className="text-sm text-text-secondary mt-1">{task.description}</div>
          <div className="flex flex-wrap gap-1 mt-2">
            {task.tags && task.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-background-light text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2 ml-4">
          <span className={`px-2 py-1 text-xs rounded ${
            task.priority === 'High' 
              ? 'bg-status-error/10 text-status-error' 
              : task.priority === 'Medium'
                ? 'bg-status-warning/10 text-status-warning'
                : 'bg-status-success/10 text-status-success'
          }`}>
            {task.priority}
          </span>
          <span className={`px-2 py-1 text-xs rounded ${
            task.status === 'Completed' 
              ? 'bg-status-success/10 text-status-success' 
              : task.status === 'In Progress'
                ? 'bg-status-info/10 text-status-info'
                : task.status === 'Pending'
                  ? 'bg-status-warning/10 text-status-warning'
                  : 'bg-background-light text-text-secondary'
          }`}>
            {task.status}
          </span>
          <div className="flex items-center text-xs text-text-secondary">
            <span className="mr-2">Due: {task.dueDate}</span>
            <span className="font-medium">{task.assignee}</span>
          </div>
        </div>
      </div>
    );

    return (
      <div className="min-h-screen bg-background-light p-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-text-primary">Project Tasks</h1>
            <p className="text-text-secondary">
              Track and manage project tasks with this interactive list view
            </p>
          </div>

          <ListView
            data={projectTasks}
            fields={taskFields}
            views={taskViews}
            defaultView="all-tasks"
            keyField="id"
            selectable={true}
            multiSelect={true}
            expandable={true}
            draggable={true}
            renderItemContent={renderTaskContent}
          />
        </div>
      </div>
    );
  }
};
