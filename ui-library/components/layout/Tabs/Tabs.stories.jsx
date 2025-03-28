import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './index';

export default {
  title: 'Layout/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tabs component for organizing content into tabbed sections.'
      }
    }
  },
  subcomponents: { TabList, Tab, TabPanels, TabPanel }
};

// Basic tabs
export const Basic = () => (
  <Tabs>
    <TabList>
      <Tab>Account</Tab>
      <Tab>Settings</Tab>
      <Tab>Billing</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium mb-4">Account Information</h3>
          <p className="text-text-secondary">
            This is the account tab content. Here you would typically see account details, profile information, etc.
          </p>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium mb-4">Settings</h3>
          <p className="text-text-secondary">
            This is the settings tab content. Here you would typically see application settings, preferences, etc.
          </p>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium mb-4">Billing</h3>
          <p className="text-text-secondary">
            This is the billing tab content. Here you would typically see payment methods, billing history, etc.
          </p>
        </div>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

// Tab variants
export const Variants = () => (
  <div className="space-y-12">
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Line (Default)</h3>
      <Tabs variant="line">
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
          <TabPanel>Content for Tab 2</TabPanel>
          <TabPanel>Content for Tab 3</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Enclosed</h3>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
          <TabPanel>Content for Tab 2</TabPanel>
          <TabPanel>Content for Tab 3</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Soft Rounded</h3>
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
          <TabPanel>Content for Tab 2</TabPanel>
          <TabPanel>Content for Tab 3</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Solid Rounded</h3>
      <Tabs variant="solid-rounded">
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
          <TabPanel>Content for Tab 2</TabPanel>
          <TabPanel>Content for Tab 3</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Unstyled</h3>
      <Tabs variant="unstyled">
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
          <TabPanel>Content for Tab 2</TabPanel>
          <TabPanel>Content for Tab 3</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
);

// Tab sizes
export const Sizes = () => (
  <div className="space-y-12">
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Small</h3>
      <Tabs size="sm">
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
          <TabPanel>Content for Tab 2</TabPanel>
          <TabPanel>Content for Tab 3</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Medium (Default)</h3>
      <Tabs size="md">
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
          <TabPanel>Content for Tab 2</TabPanel>
          <TabPanel>Content for Tab 3</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Large</h3>
      <Tabs size="lg">
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
          <TabPanel>Content for Tab 2</TabPanel>
          <TabPanel>Content for Tab 3</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
);

// Vertical tabs
export const VerticalTabs = () => (
  <Tabs orientation="vertical" height="300px">
    <TabList>
      <Tab>User Profile</Tab>
      <Tab>Account Settings</Tab>
      <Tab>Notifications</Tab>
      <Tab>Billing</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium mb-4">User Profile</h3>
          <p className="text-text-secondary">
            This is the user profile tab content. Here you would typically see profile information, avatar, etc.
          </p>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium mb-4">Account Settings</h3>
          <p className="text-text-secondary">
            This is the account settings tab content. Here you would typically see account preferences, security settings, etc.
          </p>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium mb-4">Notifications</h3>
          <p className="text-text-secondary">
            This is the notifications tab content. Here you would typically see notification preferences, history, etc.
          </p>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium mb-4">Billing</h3>
          <p className="text-text-secondary">
            This is the billing tab content. Here you would typically see payment methods, billing history, etc.
          </p>
        </div>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

// Fitted tabs
export const FittedTabs = () => (
  <Tabs isFitted>
    <TabList>
      <Tab>Tab 1</Tab>
      <Tab>Tab 2</Tab>
      <Tab>Tab 3</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Content for Tab 1</TabPanel>
      <TabPanel>Content for Tab 2</TabPanel>
      <TabPanel>Content for Tab 3</TabPanel>
    </TabPanels>
  </Tabs>
);

// Tabs with icons
export const WithIcons = () => (
  <Tabs>
    <TabList>
      <Tab icon={<span className="material-icons text-base">person</span>}>Profile</Tab>
      <Tab icon={<span className="material-icons text-base">settings</span>}>Settings</Tab>
      <Tab icon={<span className="material-icons text-base">notifications</span>}>Notifications</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Profile content</TabPanel>
      <TabPanel>Settings content</TabPanel>
      <TabPanel>Notifications content</TabPanel>
    </TabPanels>
  </Tabs>
);

// Disabled tab
export const DisabledTab = () => (
  <Tabs>
    <TabList>
      <Tab>Active Tab</Tab>
      <Tab disabled>Disabled Tab</Tab>
      <Tab>Active Tab</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Content for Active Tab 1</TabPanel>
      <TabPanel>This content won't be accessible</TabPanel>
      <TabPanel>Content for Active Tab 2</TabPanel>
    </TabPanels>
  </Tabs>
);

// Controlled tabs
export const ControlledTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  
  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-text-secondary mb-2">External controls:</p>
        <div className="flex space-x-2">
          <button 
            onClick={() => setTabIndex(0)}
            className={`px-3 py-1 rounded ${tabIndex === 0 ? 'bg-primary text-white' : 'bg-gray-100'}`}
          >
            Show Tab 1
          </button>
          <button 
            onClick={() => setTabIndex(1)}
            className={`px-3 py-1 rounded ${tabIndex === 1 ? 'bg-primary text-white' : 'bg-gray-100'}`}
          >
            Show Tab 2
          </button>
          <button 
            onClick={() => setTabIndex(2)}
            className={`px-3 py-1 rounded ${tabIndex === 2 ? 'bg-primary text-white' : 'bg-gray-100'}`}
          >
            Show Tab 3
          </button>
        </div>
      </div>
      
      <Tabs selectedIndex={tabIndex} onChange={setTabIndex}>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content for Tab 1</TabPanel>
          <TabPanel>Content for Tab 2</TabPanel>
          <TabPanel>Content for Tab 3</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

// Lazy loading tabs
export const LazyTabs = () => (
  <Tabs isLazy>
    <TabList>
      <Tab>Tab 1</Tab>
      <Tab>Tab 2 (Lazy)</Tab>
      <Tab>Tab 3 (Lazy)</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-text-secondary">
            This content is loaded immediately.
          </p>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-text-secondary">
            This content is only loaded when this tab is selected for the first time.
            <br />
            (Check your browser's network tab or console to verify.)
          </p>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-text-secondary">
            This content is also lazy loaded.
            <br />
            (Check your browser's network tab or console to verify.)
          </p>
        </div>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

// Real-world example
export const ProductPage = () => (
  <div className="max-w-3xl border border-border-light rounded-lg overflow-hidden">
    <div className="p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Product Details</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
            Edit
          </button>
          <button className="px-4 py-2 border border-border-medium text-text-primary rounded-md hover:bg-gray-50">
            Back
          </button>
        </div>
      </div>
      
      <Tabs>
        <TabList>
          <Tab icon={<span className="material-icons text-base">info</span>}>Overview</Tab>
          <Tab icon={<span className="material-icons text-base">inventory</span>}>Inventory</Tab>
          <Tab icon={<span className="material-icons text-base">attach_money</span>}>Pricing</Tab>
          <Tab icon={<span className="material-icons text-base">description</span>}>Documents</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Product Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                      <div className="text-text-primary">Premium Ergonomic Office Chair</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">SKU</label>
                      <div className="text-text-primary">CH-ERG-001</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Category</label>
                      <div className="text-text-primary">Office Furniture</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                      <div className="text-text-primary">
                        High-quality ergonomic office chair with adjustable lumbar support, 
                        height adjustment, and 360-degree swivel capabilities.
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Specifications</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Dimensions</label>
                      <div className="text-text-primary">26"W x 26"D x 38-42"H</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Weight</label>
                      <div className="text-text-primary">35 lbs</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Material</label>
                      <div className="text-text-primary">Mesh, Metal, Plastic</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Color Options</label>
                      <div className="flex space-x-2 mt-1">
                        <div className="w-6 h-6 rounded-full bg-black"></div>
                        <div className="w-6 h-6 rounded-full bg-gray-500"></div>
                        <div className="w-6 h-6 rounded-full bg-blue-600"></div>
                        <div className="w-6 h-6 rounded-full bg-red-600"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="py-4">
              <h3 className="text-lg font-medium mb-4">Inventory Status</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-md border border-border-light">
                    <div className="text-sm text-text-secondary">In Stock</div>
                    <div className="text-2xl font-semibold text-text-primary mt-1">142</div>
                  </div>
                  <div className="bg-white p-4 rounded-md border border-border-light">
                    <div className="text-sm text-text-secondary">Reserved</div>
                    <div className="text-2xl font-semibold text-text-primary mt-1">28</div>
                  </div>
                  <div className="bg-white p-4 rounded-md border border-border-light">
                    <div className="text-sm text-text-secondary">On Order</div>
                    <div className="text-2xl font-semibold text-text-primary mt-1">50</div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-4">Warehouse Distribution</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border-light">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider bg-gray-50">
                        Location
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider bg-gray-50">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider bg-gray-50">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-border-light">
                    <tr>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        East Warehouse
                      </td>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        78
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 text-xs rounded-full bg-status-success/10 text-status-success">
                          Good
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        West Warehouse
                      </td>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        42
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 text-xs rounded-full bg-status-success/10 text-status-success">
                          Good
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        South Warehouse
                      </td>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        22
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 text-xs rounded-full bg-status-warning/10 text-status-warning">
                          Low
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="py-4">
              <h3 className="text-lg font-medium mb-4">Pricing Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Base Price</label>
                      <div className="text-xl font-semibold text-text-primary">$299.99</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Cost</label>
                      <div className="text-text-primary">$175.50</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Margin</label>
                      <div className="text-text-primary">41.5%</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Discount</label>
                      <div className="text-text-primary">10% (Limited Time)</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Sale Price</label>
                      <div className="text-xl font-semibold text-status-success">$269.99</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">Tax Rate</label>
                      <div className="text-text-primary">8.25%</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mt-8 mb-4">Volume Pricing</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border-light">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider bg-gray-50">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider bg-gray-50">
                        Price Per Unit
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider bg-gray-50">
                        Discount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-border-light">
                    <tr>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        1-9
                      </td>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        $269.99
                      </td>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        10%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        10-24
                      </td>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        $249.99
                      </td>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        17%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        25+
                      </td>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        $229.99
                      </td>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        23%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="py-4">
              <h3 className="text-lg font-medium mb-4">Product Documents</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="material-icons text-text-secondary mr-3">description</span>
                    <div>
                      <div className="text-text-primary font-medium">Product Specification Sheet</div>
                      <div className="text-xs text-text-secondary">PDF • 2.4 MB • Updated 3 months ago</div>
                    </div>
                  </div>
                  <button className="text-primary hover:text-primary-dark">
                    <span className="material-icons">download</span>
                  </button>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="material-icons text-text-secondary mr-3">description</span>
                    <div>
                      <div className="text-text-primary font-medium">Assembly Instructions</div>
                      <div className="text-xs text-text-secondary">PDF • 1.8 MB • Updated 3 months ago</div>
                    </div>
                  </div>
                  <button className="text-primary hover:text-primary-dark">
                    <span className="material-icons">download</span>
                  </button>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="material-icons text-text-secondary mr-3">image</span>
                    <div>
                      <div className="text-text-primary font-medium">Product Images (High Resolution)</div>
                      <div className="text-xs text-text-secondary">ZIP • 15.2 MB • Updated 2 months ago</div>
                    </div>
                  </div>
                  <button className="text-primary hover:text-primary-dark">
                    <span className="material-icons">download</span>
                  </button>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="material-icons text-text-secondary mr-3">videocam</span>
                    <div>
                      <div className="text-text-primary font-medium">Product Demo Video</div>
                      <div className="text-xs text-text-secondary">MP4 • 45.6 MB • Updated 1 month ago</div>
                    </div>
                  </div>
                  <button className="text-primary hover:text-primary-dark">
                    <span className="material-icons">download</span>
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
);
