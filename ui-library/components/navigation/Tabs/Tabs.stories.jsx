import React, { useState } from 'react';
import Tabs, { Tab, TabPanel } from './Tabs';

export default {
  title: "Navigation/Tabs",
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  subcomponents: { Tab, TabPanel },
};

export const Default = () => (
  <Tabs defaultActiveTab="tab1">
    <Tab id="tab1" label="Dashboard">
      <TabPanel id="tab1">
        <div className="p-4 bg-background-light rounded">
          <h3 className="text-lg font-medium text-text-primary mb-2">Dashboard Content</h3>
          <p className="text-text-secondary">This is the content for the Dashboard tab.</p>
        </div>
      </TabPanel>
    </Tab>
    <Tab id="tab2" label="Projects">
      <TabPanel id="tab2">
        <div className="p-4 bg-background-light rounded">
          <h3 className="text-lg font-medium text-text-primary mb-2">Projects Content</h3>
          <p className="text-text-secondary">This is the content for the Projects tab.</p>
        </div>
      </TabPanel>
    </Tab>
    <Tab id="tab3" label="Reports">
      <TabPanel id="tab3">
        <div className="p-4 bg-background-light rounded">
          <h3 className="text-lg font-medium text-text-primary mb-2">Reports Content</h3>
          <p className="text-text-secondary">This is the content for the Reports tab.</p>
        </div>
      </TabPanel>
    </Tab>
  </Tabs>
);

export const TabVariants = () => {
  const variants = ['line', 'enclosed', 'pills', 'solid'];
  
  return (
    <div className="space-y-8">
      {variants.map((variant) => (
        <div key={variant}>
          <h3 className="text-lg font-medium text-text-primary mb-2 capitalize">{variant} Variant</h3>
          <Tabs defaultActiveTab="tab1" variant={variant}>
            <Tab id="tab1" label="First Tab">
              <TabPanel id="tab1">
                <div className="p-4 bg-background-light rounded">
                  <p className="text-text-secondary">Content for the first tab with <strong className="text-text-primary">{variant}</strong> variant.</p>
                </div>
              </TabPanel>
            </Tab>
            <Tab id="tab2" label="Second Tab">
              <TabPanel id="tab2">
                <div className="p-4 bg-background-light rounded">
                  <p className="text-text-secondary">Content for the second tab with <strong className="text-text-primary">{variant}</strong> variant.</p>
                </div>
              </TabPanel>
            </Tab>
            <Tab id="tab3" label="Third Tab">
              <TabPanel id="tab3">
                <div className="p-4 bg-background-light rounded">
                  <p className="text-text-secondary">Content for the third tab with <strong className="text-text-primary">{variant}</strong> variant.</p>
                </div>
              </TabPanel>
            </Tab>
          </Tabs>
        </div>
      ))}
    </div>
  );
};

export const WithIcons = () => (
  <Tabs defaultActiveTab="tab1">
    <Tab 
      id="tab1" 
      label="Dashboard" 
      icon={
        <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      }
    >
      <TabPanel id="tab1">
        <div className="p-4 bg-background-light rounded">
          <h3 className="text-lg font-medium text-text-primary mb-2">Dashboard Content</h3>
          <p className="text-text-secondary">This is the content for the Dashboard tab.</p>
        </div>
      </TabPanel>
    </Tab>
    <Tab 
      id="tab2" 
      label="Projects" 
      icon={
        <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      }
    >
      <TabPanel id="tab2">
        <div className="p-4 bg-background-light rounded">
          <h3 className="text-lg font-medium text-text-primary mb-2">Projects Content</h3>
          <p className="text-text-secondary">This is the content for the Projects tab.</p>
        </div>
      </TabPanel>
    </Tab>
    <Tab 
      id="tab3" 
      label="Settings" 
      icon={
        <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      }
    >
      <TabPanel id="tab3">
        <div className="p-4 bg-background-light rounded">
          <h3 className="text-lg font-medium text-text-primary mb-2">Settings Content</h3>
          <p className="text-text-secondary">This is the content for the Settings tab.</p>
        </div>
      </TabPanel>
    </Tab>
  </Tabs>
);

export const WithCounts = () => (
  <Tabs defaultActiveTab="tab1" variant="enclosed">
    <Tab id="tab1" label="Inbox" count={5}>
      <TabPanel id="tab1">
        <div className="p-4 bg-background-light rounded">
          <h3 className="text-lg font-medium text-text-primary mb-2">Inbox</h3>
          <p className="text-text-secondary">You have 5 unread messages.</p>
        </div>
      </TabPanel>
    </Tab>
    <Tab id="tab2" label="Sent" count={0}>
      <TabPanel id="tab2">
        <div className="p-4 bg-background-light rounded">
          <h3 className="text-lg font-medium text-text-primary mb-2">Sent</h3>
          <p className="text-text-secondary">No new sent items.</p>
        </div>
      </TabPanel>
    </Tab>
    <Tab id="tab3" label="Drafts" count={3}>
      <TabPanel id="tab3">
        <div className="p-4 bg-background-light rounded">
          <h3 className="text-lg font-medium text-text-primary mb-2">Drafts</h3>
          <p className="text-text-secondary">You have 3 draft messages.</p>
        </div>
      </TabPanel>
    </Tab>
  </Tabs>
);

export const FullWidth = () => (
  <Tabs defaultActiveTab="tab1" fullWidth>
    <Tab id="tab1" label="First Tab">
      <TabPanel id="tab1">
        <div className="p-4 bg-background-light rounded">
          <p className="text-text-secondary">Content for the first tab. The tabs above take up the full width of the container.</p>
        </div>
      </TabPanel>
    </Tab>
    <Tab id="tab2" label="Second Tab">
      <TabPanel id="tab2">
        <div className="p-4 bg-background-light rounded">
          <p className="text-text-secondary">Content for the second tab. The tabs above take up the full width of the container.</p>
        </div>
      </TabPanel>
    </Tab>
    <Tab id="tab3" label="Third Tab">
      <TabPanel id="tab3">
        <div className="p-4 bg-background-light rounded">
          <p className="text-text-secondary">Content for the third tab. The tabs above take up the full width of the container.</p>
        </div>
      </TabPanel>
    </Tab>
  </Tabs>
);

export const VerticalOrientation = () => (
  <Tabs defaultActiveTab="tab1" orientation="vertical" variant="pills">
    <Tab id="tab1" label="First Tab">
      <TabPanel id="tab1">
        <div className="p-4 bg-background-light rounded">
          <h3 className="text-lg font-medium text-text-primary mb-2">First Tab Content</h3>
          <p className="text-text-secondary">This is the content for the first tab. The tabs are displayed vertically on the left.</p>
        </div>
      </TabPanel>
    </Tab>
    <Tab id="tab2" label="Second Tab">
      <TabPanel id="tab2">
        <div className="p-4 bg-background-light rounded">
          <h3 className="text-lg font-medium text-text-primary mb-2">Second Tab Content</h3>
          <p className="text-text-secondary">This is the content for the second tab. The tabs are displayed vertically on the left.</p>
        </div>
      </TabPanel>
    </Tab>
    <Tab id="tab3" label="Third Tab">
      <TabPanel id="tab3">
        <div className="p-4 bg-background-light rounded">
          <h3 className="text-lg font-medium text-text-primary mb-2">Third Tab Content</h3>
          <p className="text-text-secondary">This is the content for the third tab. The tabs are displayed vertically on the left.</p>
        </div>
      </TabPanel>
    </Tab>
  </Tabs>
);

export const ControlledTabs = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-text-primary mb-2">External Controls</h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded ${activeTab === 'tab1' ? 'bg-primary text-white' : 'bg-background-light text-text-secondary'}`}
            onClick={() => setActiveTab('tab1')}
          >
            Show Tab 1
          </button>
          <button
            className={`px-3 py-1 rounded ${activeTab === 'tab2' ? 'bg-primary text-white' : 'bg-background-light text-text-secondary'}`}
            onClick={() => setActiveTab('tab2')}
          >
            Show Tab 2
          </button>
          <button
            className={`px-3 py-1 rounded ${activeTab === 'tab3' ? 'bg-primary text-white' : 'bg-background-light text-text-secondary'}`}
            onClick={() => setActiveTab('tab3')}
          >
            Show Tab 3
          </button>
        </div>
      </div>
      
      <Tabs
        activeTab={activeTab}
        onChange={(tabId) => {
          setActiveTab(tabId);
          console.log(`Tab changed to ${tabId}`);
        }}
      >
        <Tab id="tab1" label="First Tab">
          <TabPanel id="tab1">
            <div className="p-4 bg-background-light rounded">
              <h3 className="text-lg font-medium text-text-primary mb-2">First Tab Content</h3>
              <p className="text-text-secondary">This tab is controlled by the buttons above.</p>
            </div>
          </TabPanel>
        </Tab>
        <Tab id="tab2" label="Second Tab">
          <TabPanel id="tab2">
            <div className="p-4 bg-background-light rounded">
              <h3 className="text-lg font-medium text-text-primary mb-2">Second Tab Content</h3>
              <p className="text-text-secondary">This tab is controlled by the buttons above.</p>
            </div>
          </TabPanel>
        </Tab>
        <Tab id="tab3" label="Third Tab">
          <TabPanel id="tab3">
            <div className="p-4 bg-background-light rounded">
              <h3 className="text-lg font-medium text-text-primary mb-2">Third Tab Content</h3>
              <p className="text-text-secondary">This tab is controlled by the buttons above.</p>
            </div>
          </TabPanel>
        </Tab>
      </Tabs>
    </div>
  );
};

export const WithDisabledTabs = () => (
  <Tabs defaultActiveTab="tab1">
    <Tab id="tab1" label="Active Tab">
      <TabPanel id="tab1">
        <div className="p-4 bg-background-light rounded">
          <h3 className="text-lg font-medium text-text-primary mb-2">Active Tab Content</h3>
          <p className="text-text-secondary">This is the content for the active tab.</p>
        </div>
      </TabPanel>
    </Tab>
    <Tab id="tab2" label="Disabled Tab" disabled>
      <TabPanel id="tab2">
        <div className="p-4 bg-background-light rounded">
          <h3 className="text-lg font-medium text-text-primary mb-2">Disabled Tab Content</h3>
          <p className="text-text-secondary">This content won't be shown because the tab is disabled.</p>
        </div>
      </TabPanel>
    </Tab>
    <Tab id="tab3" label="Another Tab">
      <TabPanel id="tab3">
        <div className="p-4 bg-background-light rounded">
          <h3 className="text-lg font-medium text-text-primary mb-2">Another Tab Content</h3>
          <p className="text-text-secondary">This is the content for another active tab.</p>
        </div>
      </TabPanel>
    </Tab>
  </Tabs>
);

export const CustomStyling = () => (
  <Tabs
    defaultActiveTab="tab1"
    className="border border-light rounded-lg p-4 bg-white shadow-sm"
    tabsClassName="bg-background-light rounded-lg p-1"
    tabClassName="mx-1 font-bold"
    activeTabClassName="text-white bg-primary shadow-md"
    panelClassName="p-6 bg-white rounded-lg mt-4 border border-light"
    variant="solid"
  >
    <Tab id="tab1" label="First Tab">
      <TabPanel id="tab1">
        <h3 className="text-lg font-medium text-text-primary mb-2">First Tab Content</h3>
        <p className="text-text-secondary">This tab has custom styling applied to all elements.</p>
      </TabPanel>
    </Tab>
    <Tab id="tab2" label="Second Tab">
      <TabPanel id="tab2">
        <h3 className="text-lg font-medium text-text-primary mb-2">Second Tab Content</h3>
        <p className="text-text-secondary">This tab has custom styling applied to all elements.</p>
      </TabPanel>
    </Tab>
    <Tab id="tab3" label="Third Tab">
      <TabPanel id="tab3">
        <h3 className="text-lg font-medium text-text-primary mb-2">Third Tab Content</h3>
        <p className="text-text-secondary">This tab has custom styling applied to all elements.</p>
      </TabPanel>
    </Tab>
  </Tabs>
);

export const ProductDetailsTabs = () => (
  <div className="max-w-4xl mx-auto border border-light rounded-lg shadow-sm">
    <div className="p-4 border-b border-light">
      <h2 className="text-xl font-semibold text-text-primary">Ergonomic Office Chair</h2>
      <p className="text-text-secondary">Premium ergonomic office chair with adjustable features</p>
    </div>
    
    <Tabs defaultActiveTab="details" variant="enclosed" className="p-4">
      <Tab id="details" label="Product Details">
        <TabPanel id="details">
          <div className="p-4 bg-background-light rounded">
            <h3 className="text-lg font-medium text-text-primary mb-3">Product Specifications</h3>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start">
                <span className="font-medium text-text-primary w-32">Dimensions:</span>
                <span>26"W x 26"D x 38-42"H</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium text-text-primary w-32">Weight:</span>
                <span>35 lbs</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium text-text-primary w-32">Material:</span>
                <span>Mesh back, fabric seat, aluminum base</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium text-text-primary w-32">Color:</span>
                <span>Black / Gray</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium text-text-primary w-32">Adjustability:</span>
                <span>Height, armrests, tilt, lumbar support</span>
              </li>
            </ul>
          </div>
        </TabPanel>
      </Tab>
      <Tab id="reviews" label="Reviews" count={24}>
        <TabPanel id="reviews">
          <div className="p-4 bg-background-light rounded">
            <div className="flex items-center mb-4">
              <div className="flex text-status-warning">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="ml-2 text-text-primary font-medium">4.0 out of 5</span>
              <span className="ml-2 text-text-secondary">(24 reviews)</span>
            </div>
            
            <div className="border-t border-light pt-4">
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <span className="font-medium text-text-primary">Sarah J.</span>
                  <span className="ml-2 text-text-secondary text-sm">Verified Purchase</span>
                </div>
                <div className="flex text-status-warning mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-text-secondary">Extremely comfortable and easy to adjust. The lumbar support is excellent and has helped with my back pain.</p>
              </div>
              
              <button className="text-primary font-medium hover:text-primary-dark">View all 24 reviews</button>
            </div>
          </div>
        </TabPanel>
      </Tab>
      <Tab id="shipping" label="Shipping & Returns">
        <TabPanel id="shipping">
          <div className="p-4 bg-background-light rounded">
            <h3 className="text-lg font-medium text-text-primary mb-3">Shipping Information</h3>
            <div className="space-y-4 text-text-secondary">
              <div>
                <h4 className="font-medium text-text-primary mb-1">Delivery Options</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Standard Shipping (3-5 business days): Free</li>
                  <li>Express Shipping (1-2 business days): $15.00</li>
                  <li>Same Day Delivery (select areas): $25.00</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-text-primary mb-1">Return Policy</h4>
                <p>Returns accepted within 30 days of delivery. Item must be in original condition with all packaging.</p>
                <div className="mt-2 p-3 bg-status-info/10 rounded text-text-primary">
                  <span className="font-medium">Note:</span> Assembly service fees are non-refundable.
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tab>
    </Tabs>
  </div>
);
