import { useState } from 'react';
import BaseListItem from './BaseListItem';

export default {
  title: "Data/Lists & Tables/BaseListItem",
  component: BaseListItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Standardized item component for use in BaseList. Provides consistent styling and behavior for list items.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Whether the item is selected',
    },
    expanded: {
      control: 'boolean',
      description: 'Whether the item is expanded',
    },
    selectable: {
      control: 'boolean',
      description: 'Whether the item is selectable',
    },
    expandable: {
      control: 'boolean',
      description: 'Whether the item is expandable',
    },
    showCheckbox: {
      control: 'boolean',
      description: 'Whether to show checkbox',
    },
    showDragHandle: {
      control: 'boolean',
      description: 'Whether to show drag handle',
    },
    draggable: {
      control: 'boolean',
      description: 'Whether the item is draggable',
    },
  },
};

// Sample user data
const sampleUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Admin',
  department: 'Engineering',
  status: 'Active',
  lastActive: '2023-09-15T14:30:00Z',
  avatar: 'https://i.pravatar.cc/150?img=1',
};

// Template for interactive stories
const InteractiveTemplate = (args) => {
  const [selected, setSelected] = useState(args.selected || false);
  const [expanded, setExpanded] = useState(args.expanded || false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden max-w-2xl">
      <BaseListItem
        {...args}
        item={args.item || sampleUser}
        itemKey={args.itemKey || args.item?.id || sampleUser.id}
        selected={selected}
        expanded={expanded}
        onSelect={(item, isSelected) => {
          setSelected(isSelected);
          args.onSelect?.(item, isSelected);
        }}
        onExpand={(item, isExpanded) => {
          setExpanded(isExpanded);
          args.onExpand?.(item, isExpanded);
        }}
      >
        {args.children}
      </BaseListItem>
    </div>
  );
};

// Basic item with default rendering
export const Default = {
  render: InteractiveTemplate,
  args: {
    children: (
      <div>
        <div className="font-medium">{sampleUser.name}</div>
        <div className="text-sm text-gray-500">{sampleUser.email}</div>
      </div>
    ),
  },
};

// Selected state
export const Selected = {
  render: InteractiveTemplate,
  args: {
    ...Default.args,
    selected: true,
  },
};

// Expandable item
export const Expandable = {
  render: InteractiveTemplate,
  args: {
    ...Default.args,
    expandable: true,
    renderExpanded: (item) => (
      <div className="p-4 space-y-2">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <div className="text-xs text-gray-500">Department</div>
            <div>{item.department}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Role</div>
            <div>{item.role}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Status</div>
            <div>{item.status}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Last Active</div>
            <div>{new Date(item.lastActive).toLocaleString()}</div>
          </div>
        </div>
      </div>
    ),
  },
};

// With custom render functions
export const CustomRender = {
  render: InteractiveTemplate,
  args: {
    ...Default.args,
    selectable: true,
    children: (
      <div className="flex flex-col">
        <div className="font-medium">{sampleUser.name}</div>
        <div className="text-sm text-gray-500">{sampleUser.email}</div>
      </div>
    ),
    renderBefore: (item) => (
      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
        {item.avatar ? (
          <img src={item.avatar} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-lg font-medium text-gray-600">
            {item.name.charAt(0)}
          </span>
        )}
      </div>
    ),
    renderAfter: (item, { selected }) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {item.status}
      </span>
    ),
  },
};

// Draggable item
export const Draggable = {
  render: InteractiveTemplate,
  args: {
    ...Default.args,
    draggable: true,
    showDragHandle: true,
    onDragStart: (e, item) => {
      e.dataTransfer.setData('text/plain', JSON.stringify(item));
      e.dataTransfer.effectAllowed = 'move';
    },
  },
};

// Multiple items to show a list
export const ItemList = () => {
  const users = [
    { ...sampleUser, id: 1 },
    { ...sampleUser, id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?img=5' },
    { ...sampleUser, id: 3, name: 'Bob Johnson', email: 'bob@example.com', department: 'Marketing', avatar: 'https://i.pravatar.cc/150?img=8' },
    { ...sampleUser, id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', avatar: 'https://i.pravatar.cc/150?img=9' },
  ];

  const [selectedIds, setSelectedIds] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

  const handleSelect = (item, selected) => {
    setSelectedIds(prev => 
      selected 
        ? [...prev, item.id] 
        : prev.filter(id => id !== item.id)
    );
  };

  const handleExpand = (item, expanded) => {
    setExpandedIds(prev => 
      expanded 
        ? [...prev, item.id] 
        : prev.filter(id => id !== item.id)
    );
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden max-w-2xl">
      {users.map(user => (
        <BaseListItem
          key={user.id}
          item={user}
          itemKey={user.id}
          selected={selectedIds.includes(user.id)}
          expanded={expandedIds.includes(user.id)}
          selectable={true}
          expandable={true}
          onSelect={handleSelect}
          onExpand={handleExpand}
          renderBefore={(item) => (
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              {item.avatar ? (
                <img src={item.avatar} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-lg font-medium text-gray-600">
                  {item.name.charAt(0)}
                </span>
              )}
            </div>
          )}
          renderExpanded={(item) => (
            <div className="p-4 space-y-2">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <div className="text-xs text-gray-500">Department</div>
                  <div>{item.department}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Role</div>
                  <div>{item.role}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Status</div>
                  <div>{item.status}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Last Active</div>
                  <div>{new Date(item.lastActive).toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}
        >
          <div className="flex flex-col">
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </BaseListItem>
      ))}
    </div>
  );
};

// Complete example with all features
export const CompleteExample = {
  render: InteractiveTemplate,
  args: {
    selectable: true,
    expandable: true,
    draggable: true,
    showDragHandle: true,
    showCheckbox: true,
    children: (
      <div className="flex flex-col">
        <div className="font-medium">{sampleUser.name}</div>
        <div className="text-sm text-gray-500">{sampleUser.email}</div>
      </div>
    ),
    renderBefore: (item) => (
      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
        {item.avatar ? (
          <img src={item.avatar} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-lg font-medium text-gray-600">
            {item.name.charAt(0)}
          </span>
        )}
      </div>
    ),
    renderAfter: (item) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {item.status}
      </span>
    ),
    renderExpanded: (item) => (
      <div className="p-4 space-y-2">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <div className="text-xs text-gray-500">Department</div>
            <div>{item.department}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Role</div>
            <div>{item.role}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Status</div>
            <div>{item.status}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Last Active</div>
            <div>{new Date(item.lastActive).toLocaleString()}</div>
          </div>
        </div>
      </div>
    ),
  },
};

