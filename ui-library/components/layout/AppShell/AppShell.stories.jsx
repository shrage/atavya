import AppShell from './AppShell';

const SampleSidebar = () => (
  <div className="p-4">
    <div className="h-8 mb-6 bg-primary rounded"></div>
    <div className="space-y-2">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-8 bg-background-light rounded"></div>
      ))}
    </div>
  </div>
);

const SampleHeader = () => (
  <div className="h-full px-6 flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <div className="w-40 h-6 bg-background-light rounded"></div>
      <div className="w-32 h-6 bg-background-light rounded"></div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="w-8 h-8 bg-background-light rounded-full"></div>
      <div className="w-8 h-8 bg-background-light rounded-full"></div>
    </div>
  </div>
);

const SampleContent = () => (
  <div className="space-y-4">
    <div className="h-8 w-64 bg-background-light rounded"></div>
    <div className="grid grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="aspect-video bg-white rounded-lg shadow-sm border border-light"></div>
      ))}
    </div>
  </div>
);

export default {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main application layout component with sidebar and header.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    sidebarOpen: {
      control: 'boolean',
      description: 'Whether the sidebar is open',
    },
  },
};

export const Default = {
  args: {
    sidebar: <SampleSidebar />,
    header: <SampleHeader />,
    children: <SampleContent />,
    sidebarOpen: true,
  },
};

export const WithoutSidebar = {
  args: {
    header: <SampleHeader />,
    children: <SampleContent />,
    sidebarOpen: false,
  },
};

export const CustomContent = {
  args: {
    sidebar: <SampleSidebar />,
    header: <SampleHeader />,
    children: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-light">
            <div className="h-4 w-3/4 bg-background-light rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-background-light rounded"></div>
              <div className="h-3 bg-background-light rounded"></div>
              <div className="h-3 w-2/3 bg-background-light rounded"></div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
};

export const DashboardExample = {
  args: {
    sidebar: (
      <div className="p-4 h-full flex flex-col">
        <div className="h-10 mb-8 bg-primary rounded flex items-center justify-center">
          <span className="text-white font-semibold">Atavya Admin</span>
        </div>
        <nav className="space-y-1 flex-1">
          {[
            { name: 'Dashboard', active: true },
            { name: 'Products', active: false },
            { name: 'Customers', active: false },
            { name: 'Orders', active: false },
            { name: 'Analytics', active: false },
            { name: 'Settings', active: false },
          ].map((item, i) => (
            <div 
              key={i} 
              className={`px-4 py-2 rounded flex items-center ${
                item.active 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-text-secondary hover:bg-background-light'
              }`}
            >
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-light">
          <div className="flex items-center space-x-3 px-4 py-2 text-text-secondary">
            <div className="w-8 h-8 bg-background-light rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-text-primary">Admin User</div>
              <div className="text-xs">admin@atavya.com</div>
            </div>
          </div>
        </div>
      </div>
    ),
    header: (
      <div className="h-full px-6 flex items-center justify-between border-b border-light">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-8 pr-4 py-1 rounded-md border border-light bg-background-light text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <svg className="w-4 h-4 absolute left-2.5 top-2 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-background-light flex items-center justify-center text-text-secondary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <span className="absolute -top-1 -right-1 bg-status-error text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
            AU
          </div>
        </div>
      </div>
    ),
    children: (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-text-primary">Dashboard</h1>
          <button className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium">
            Generate Report
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Sales', value: '$24,780', change: '+12%', status: 'positive' },
            { title: 'New Customers', value: '385', change: '+5%', status: 'positive' },
            { title: 'Pending Orders', value: '12', change: '-2%', status: 'negative' },
            { title: 'Conversion Rate', value: '3.2%', change: '+0.8%', status: 'positive' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-light">
              <div className="text-text-secondary text-sm">{stat.title}</div>
              <div className="text-text-primary text-2xl font-semibold mt-1">{stat.value}</div>
              <div className={`text-sm mt-2 ${stat.status === 'positive' ? 'text-status-success' : 'text-status-error'}`}>
                {stat.change} from last month
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-light">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-text-primary">Recent Orders</h2>
            <button className="text-primary text-sm">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-light">
                  <th className="text-left py-3 px-4 text-text-secondary font-medium text-sm">Order ID</th>
                  <th className="text-left py-3 px-4 text-text-secondary font-medium text-sm">Customer</th>
                  <th className="text-left py-3 px-4 text-text-secondary font-medium text-sm">Date</th>
                  <th className="text-left py-3 px-4 text-text-secondary font-medium text-sm">Amount</th>
                  <th className="text-left py-3 px-4 text-text-secondary font-medium text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'ORD-7892', customer: 'John Smith', date: 'Mar 25, 2025', amount: '$128.50', status: 'Completed' },
                  { id: 'ORD-7891', customer: 'Sarah Johnson', date: 'Mar 24, 2025', amount: '$232.00', status: 'Processing' },
                  { id: 'ORD-7890', customer: 'Michael Brown', date: 'Mar 24, 2025', amount: '$89.99', status: 'Completed' },
                  { id: 'ORD-7889', customer: 'Emily Davis', date: 'Mar 23, 2025', amount: '$145.20', status: 'Shipped' },
                ].map((order, i) => (
                  <tr key={i} className="border-b border-light">
                    <td className="py-3 px-4 text-text-primary">{order.id}</td>
                    <td className="py-3 px-4 text-text-primary">{order.customer}</td>
                    <td className="py-3 px-4 text-text-secondary">{order.date}</td>
                    <td className="py-3 px-4 text-text-primary font-medium">{order.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Completed' ? 'bg-status-success/10 text-status-success' :
                        order.status === 'Processing' ? 'bg-status-warning/10 text-status-warning' :
                        'bg-status-info/10 text-status-info'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    sidebarOpen: true,
  },
};
