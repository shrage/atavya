import DataTable from './DataTable';

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Inactive' },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'Active'
            ? 'bg-status-success/10 text-status-success'
            : 'bg-background-light text-text-secondary'
        }`}
      >
        {value}
      </span>
    ),
  },
];

export default {
  title: "Data/Lists & Tables/DataTable",
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible data table component with sorting, hover effects, and customizable styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    sortable: {
      control: 'boolean',
      description: 'Whether the table is sortable',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether rows should have hover effect',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether to show borders',
    },
    striped: {
      control: 'boolean',
      description: 'Whether to stripe rows',
    },
    compact: {
      control: 'boolean',
      description: 'Whether to use compact padding',
    },
  },
};

export const Default = {
  args: {
    columns,
    data: sampleData,
  },
};

export const WithBorders = {
  args: {
    columns,
    data: sampleData,
    bordered: true,
  },
};

export const Compact = {
  args: {
    columns,
    data: sampleData,
    compact: true,
  },
};

export const NonSortable = {
  args: {
    columns,
    data: sampleData,
    sortable: false,
  },
};

export const NonHoverable = {
  args: {
    columns,
    data: sampleData,
    hoverable: false,
  },
};

export const NonStriped = {
  args: {
    columns,
    data: sampleData,
    striped: false,
  },
};

export const WithRowClick = {
  args: {
    columns,
    data: sampleData,
    onRowClick: (row) => alert(`Clicked row with ID: ${row.id}`),
  },
};

export const CustomRendering = {
  args: {
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      {
        key: 'role',
        label: 'Role',
        render: (value) => (
          <span className="font-medium text-primary">{value}</span>
        ),
      },
      {
        key: 'status',
        label: 'Status',
        render: (value) => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              value === 'Active'
                ? 'bg-status-success/10 text-status-success'
                : 'bg-status-error/10 text-status-error'
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, row) => (
          <div className="flex items-center space-x-2">
            <button className="text-primary hover:text-primary-dark">Edit</button>
            <button className="text-status-error hover:text-status-error-dark">Delete</button>
          </div>
        ),
      },
    ],
    data: sampleData,
  },
};

// Add a real-world example with product inventory
export const ProductInventory = {
  args: {
    columns: [
      { 
        key: 'product', 
        label: 'Product',
        render: (_, row) => (
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-md mr-3 ${row.inStock ? 'bg-primary/10' : 'bg-background-light'}`}></div>
            <div>
              <div className="font-medium text-text-primary">{row.name}</div>
              <div className="text-xs text-text-secondary">SKU: {row.sku}</div>
            </div>
          </div>
        )
      },
      { 
        key: 'category', 
        label: 'Category',
        render: (value) => (
          <span className="text-text-secondary">{value}</span>
        )
      },
      { 
        key: 'price', 
        label: 'Price',
        render: (value) => (
          <span className="font-medium text-text-primary">${value.toFixed(2)}</span>
        )
      },
      { 
        key: 'stock', 
        label: 'Stock',
        render: (value) => (
          <span className={`font-medium ${
            value === 0 ? 'text-status-error' : 
            value < 10 ? 'text-status-warning' : 
            'text-status-success'
          }`}>
            {value}
          </span>
        )
      },
      {
        key: 'status',
        label: 'Status',
        render: (_, row) => (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              row.inStock
                ? 'bg-status-success/10 text-status-success'
                : 'bg-status-error/10 text-status-error'
            }`}
          >
            {row.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        ),
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (_, row) => (
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 text-xs bg-primary text-white rounded hover:bg-primary-dark">
              Edit
            </button>
            <button className="px-2 py-1 text-xs border border-light text-text-primary rounded hover:bg-background-light">
              View
            </button>
          </div>
        ),
      },
    ],
    data: [
      { id: 1, name: 'Ergonomic Chair', sku: 'EC-1001', category: 'Furniture', price: 249.99, stock: 24, inStock: true },
      { id: 2, name: 'Standing Desk', sku: 'SD-2002', category: 'Furniture', price: 399.99, stock: 8, inStock: true },
      { id: 3, name: 'Wireless Keyboard', sku: 'WK-3003', category: 'Electronics', price: 79.99, stock: 0, inStock: false },
      { id: 4, name: 'Monitor Stand', sku: 'MS-4004', category: 'Accessories', price: 49.99, stock: 15, inStock: true },
      { id: 5, name: 'Laptop Dock', sku: 'LD-5005', category: 'Electronics', price: 129.99, stock: 3, inStock: true },
      { id: 6, name: 'Desk Lamp', sku: 'DL-6006', category: 'Accessories', price: 39.99, stock: 0, inStock: false },
    ],
    bordered: true,
    hoverable: true,
  },
};
