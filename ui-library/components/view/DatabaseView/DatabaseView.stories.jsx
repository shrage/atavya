import React, { useState } from 'react';
import DatabaseView from './DatabaseView';

export default {
  title: "View/DatabaseView",
  component: DatabaseView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

// Sample data
const columns = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'status', label: 'Status', type: 'select' },
  { id: 'priority', label: 'Priority', type: 'select' },
  { id: 'dueDate', label: 'Due Date', type: 'date' },
  { id: 'assignee', label: 'Assignee', type: 'text' },
  { id: 'progress', label: 'Progress', type: 'number' },
  { id: 'completed', label: 'Completed', type: 'boolean' },
];

const tasks = [
  {
    id: 1,
    name: 'Complete project documentation',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2025-04-10',
    assignee: 'John Smith',
    progress: 65,
    completed: false,
  },
  {
    id: 2,
    name: 'Review design mockups',
    status: 'Not Started',
    priority: 'Medium',
    dueDate: '2025-04-12',
    assignee: 'Sarah Johnson',
    progress: 0,
    completed: false,
  },
  {
    id: 3,
    name: 'Fix authentication bug',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2025-04-05',
    assignee: 'Michael Chen',
    progress: 30,
    completed: false,
  },
  {
    id: 4,
    name: 'Deploy to staging environment',
    status: 'Completed',
    priority: 'High',
    dueDate: '2025-04-02',
    assignee: 'Alex Taylor',
    progress: 100,
    completed: true,
  },
  {
    id: 5,
    name: 'Prepare demo for stakeholders',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2025-04-15',
    assignee: 'John Smith',
    progress: 45,
    completed: false,
  },
  {
    id: 6,
    name: 'Update dependencies',
    status: 'Not Started',
    priority: 'Low',
    dueDate: '2025-04-20',
    assignee: 'Sarah Johnson',
    progress: 0,
    completed: false,
  },
  {
    id: 7,
    name: 'Conduct user testing',
    status: 'Not Started',
    priority: 'High',
    dueDate: '2025-04-18',
    assignee: 'Michael Chen',
    progress: 0,
    completed: false,
  },
];

export const Default = {
  args: {
    columns,
    data: tasks,
  },
};

export const WithSelection = () => {
  const [selectedRowIds, setSelectedRowIds] = useState([2, 4]);
  
  return (
    <DatabaseView
      columns={columns}
      data={tasks}
      selectedRowIds={selectedRowIds}
      onSelectionChange={(newSelectedIds) => {
        setSelectedRowIds(newSelectedIds);
        console.log('Selection changed:', newSelectedIds);
      }}
      onRowClick={(row) => {
        console.log('Row clicked:', row);
      }}
    />
  );
};

export const Sorting = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'dueDate', direction: 'asc' });
  
  return (
    <DatabaseView
      columns={columns}
      data={tasks}
      sortConfig={sortConfig}
      onSortChange={(newSortConfig) => {
        setSortConfig(newSortConfig);
        console.log('Sort changed:', newSortConfig);
      }}
    />
  );
};

export const CustomCellRendering = () => {
  const renderCell = (row, column) => {
    if (column.id === 'status') {
      const statusColors = {
        'Not Started': 'bg-gray-100 text-gray-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        'Completed': 'bg-green-100 text-green-800',
      };
      
      return (
        <span className={`inline-flex items-center rounded-full ${statusColors[row.status]} px-2.5 py-0.5 text-xs font-medium`}>
          {row.status}
        </span>
      );
    }
    
    if (column.id === 'priority') {
      const priorityColors = {
        'Low': 'bg-green-100 text-green-800',
        'Medium': 'bg-yellow-100 text-yellow-800',
        'High': 'bg-red-100 text-red-800',
      };
      
      return (
        <span className={`inline-flex items-center rounded-full ${priorityColors[row.priority]} px-2.5 py-0.5 text-xs font-medium`}>
          {row.priority}
        </span>
      );
    }
    
    if (column.id === 'progress') {
      return (
        <div className="w-full">
          <div className="flex items-center">
            <span className="mr-2 text-sm">{row.progress}%</span>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 rounded-full h-2"
                style={{ width: `${row.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      );
    }
    
    // Default rendering for other columns
    return null;
  };
  
  return (
    <DatabaseView
      columns={columns}
      data={tasks}
      renderCell={renderCell}
    />
  );
};

export const NonSelectableSortable = {
  args: {
    columns,
    data: tasks,
    selectable: false,
    sortable: false,
  },
};

export const ResizableColumns = {
  args: {
    columns,
    data: tasks,
    resizableColumns: true,
  },
};

