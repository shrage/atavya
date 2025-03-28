import BaseList from './BaseList';

// Sample data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', department: 'Engineering' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', department: 'Marketing' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active', department: 'Engineering' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', department: 'Sales' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Inactive', department: 'Marketing' },
  { id: 6, name: 'David Miller', email: 'david@example.com', role: 'User', status: 'Active', department: 'Sales' },
  { id: 7, name: 'Eva Davis', email: 'eva@example.com', role: 'Editor', status: 'Active', department: 'Engineering' },
  { id: 8, name: 'Frank Roberts', email: 'frank@example.com', role: 'User', status: 'Inactive', department: 'Marketing' },
  { id: 9, name: 'Grace Taylor', email: 'grace@example.com', role: 'Admin', status: 'Active', department: 'Sales' },
  { id: 10, name: 'Henry Adams', email: 'henry@example.com', role: 'User', status: 'Active', department: 'Engineering' },
];

// Column definitions
const columns = [
  { key: 'name', header: 'Name', width: 3 },
  { key: 'email', header: 'Email', width: 4 },
  { key: 'role', header: 'Role', width: 2 },
  { key: 'status', header: 'Status', width: 2 },
  { key: 'department', header: 'Department', width: 1 },
];

export default {
  title: "Data/Lists & Tables/BaseList",
  component: BaseList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Foundation component for all list views in the application. Provides core list functionality including sorting, filtering, grouping, and selection.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selectable: {
      control: 'boolean',
      description: 'Whether items can be selected',
    },
    multiSelect: {
      control: 'boolean',
      description: 'Whether multiple items can be selected',
    },
    sortable: {
      control: 'boolean',
      description: 'Whether columns are sortable',
    },
    groupBy: {
      control: 'select',
      options: [null, 'department', 'role', 'status'],
      description: 'Field to group items by',
    },
    paginate: {
      control: 'boolean',
      description: 'Whether to paginate the list',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the list is loading',
    },
  },
};

export const Default = {
  args: {
    data: users,
    columns,
    keyField: 'id',
    defaultSortField: 'name',
    defaultSortDirection: 'asc',
  },
};

export const WithSelection = {
  args: {
    data: users,
    columns,
    keyField: 'id',
    selectable: true,
    multiSelect: true,
    defaultSelectedKeys: [1, 3],
    onSelectionChange: (selectedKeys) => console.log('Selected:', selectedKeys),
  },
};

export const WithGrouping = {
  args: {
    data: users,
    columns,
    keyField: 'id',
    groupBy: 'department',
    defaultGroupsExpanded: true,
  },
};

export const WithFiltering = {
  args: {
    data: users,
    columns,
    keyField: 'id',
    filters: {
      status: { operator: 'equals', value: 'Active' }
    },
    onFilterChange: (field, operator, value) => console.log('Filter changed:', field, operator, value),
  },
};

export const WithPagination = {
  args: {
    data: users,
    columns,
    keyField: 'id',
    paginate: true,
    defaultPageSize: 5,
    defaultPage: 1,
    onPageChange: (page) => console.log('Page changed:', page),
    onPageSizeChange: (size) => console.log('Page size changed:', size),
  },
};

export const CustomItemRenderer = {
  args: {
    data: users,
    columns,
    keyField: 'id',
    renderItem: (item) => (
      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium text-text-primary">{item.name}</div>
          <div className="text-sm text-text-secondary">{item.email}</div>
        </div>
        <div className="flex items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.status === 'Active' ? 'bg-status-success/10 text-status-success' : 'bg-background-light text-text-secondary'
          }`}>
            {item.status}
          </span>
          <span className="ml-2 text-sm text-text-secondary">{item.role}</span>
        </div>
      </div>
    ),
  },
};

export const Loading = {
  args: {
    data: users,
    columns,
    keyField: 'id',
    loading: true,
  },
};

export const Empty = {
  args: {
    data: [],
    columns,
    keyField: 'id',
    emptyMessage: 'No users found',
  },
};

export const CompleteExample = {
  args: {
    data: users,
    columns,
    keyField: 'id',
    defaultSortField: 'name',
    defaultSortDirection: 'asc',
    selectable: true,
    multiSelect: true,
    paginate: true,
    defaultPageSize: 5,
    defaultPage: 1,
    groupBy: 'department',
    defaultGroupsExpanded: true,
    filters: {
      status: { operator: 'equals', value: 'Active' }
    },
    onSelectionChange: (selectedKeys) => console.log('Selected:', selectedKeys),
    onSort: (field, direction) => console.log('Sort:', field, direction),
    onFilterChange: (field, operator, value) => console.log('Filter:', field, operator, value),
    onPageChange: (page) => console.log('Page:', page),
    onPageSizeChange: (size) => console.log('Page size:', size),
    onItemClick: (item) => console.log('Clicked:', item),
  },
};

// Add a real-world example with task management
export const TaskManagement = {
  args: {
    data: [
      { id: 1, title: 'Complete project proposal', priority: 'High', dueDate: '2025-03-28', assignee: 'John Doe', status: 'In Progress' },
      { id: 2, title: 'Review design mockups', priority: 'Medium', dueDate: '2025-03-29', assignee: 'Jane Smith', status: 'Pending' },
      { id: 3, title: 'Fix navigation bug', priority: 'High', dueDate: '2025-03-27', assignee: 'Bob Johnson', status: 'In Progress' },
      { id: 4, title: 'Update documentation', priority: 'Low', dueDate: '2025-04-02', assignee: 'Alice Brown', status: 'Not Started' },
      { id: 5, title: 'Client meeting preparation', priority: 'High', dueDate: '2025-03-28', assignee: 'John Doe', status: 'In Progress' },
      { id: 6, title: 'Implement authentication', priority: 'Medium', dueDate: '2025-03-30', assignee: 'Eva Davis', status: 'Not Started' },
      { id: 7, title: 'Code review for PR #42', priority: 'Medium', dueDate: '2025-03-27', assignee: 'Bob Johnson', status: 'Pending' },
      { id: 8, title: 'Deploy to staging', priority: 'High', dueDate: '2025-03-31', assignee: 'Charlie Wilson', status: 'Not Started' },
    ],
    columns: [
      { key: 'title', header: 'Task', width: 4 },
      { key: 'priority', header: 'Priority', width: 2 },
      { key: 'dueDate', header: 'Due Date', width: 2 },
      { key: 'assignee', header: 'Assignee', width: 2 },
      { key: 'status', header: 'Status', width: 2 },
    ],
    keyField: 'id',
    defaultSortField: 'dueDate',
    defaultSortDirection: 'asc',
    selectable: true,
    multiSelect: true,
    renderItem: (item) => (
      <div className="flex justify-between items-center p-3 border-b border-light">
        <div className="flex-1">
          <div className="font-medium text-text-primary">{item.title}</div>
          <div className="text-sm text-text-secondary mt-1">Due: {item.dueDate} • Assigned to: {item.assignee}</div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.priority === 'High' ? 'bg-status-error/10 text-status-error' : 
            item.priority === 'Medium' ? 'bg-status-warning/10 text-status-warning' : 
            'bg-status-success/10 text-status-success'
          }`}>
            {item.priority}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            item.status === 'In Progress' ? 'bg-status-info/10 text-status-info' : 
            item.status === 'Pending' ? 'bg-status-warning/10 text-status-warning' : 
            item.status === 'Completed' ? 'bg-status-success/10 text-status-success' : 
            'bg-background-light text-text-secondary'
          }`}>
            {item.status}
          </span>
        </div>
      </div>
    ),
    filters: {
      status: { operator: 'not-equals', value: 'Completed' }
    },
    groupBy: 'assignee',
    defaultGroupsExpanded: true,
    paginate: true,
    defaultPageSize: 5,
  },
};
