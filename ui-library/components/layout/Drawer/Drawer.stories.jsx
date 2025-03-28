import React, { useState } from 'react';
import { Drawer } from './index';

export default {
  title: 'Layout/Drawer',
  component: Drawer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Drawer component for displaying slide-in panels from any edge of the screen.'
      }
    }
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the drawer is open'
    },
    onClose: {
      action: 'closed',
      description: 'Function called when the drawer is closed'
    },
    placement: {
      control: { type: 'select', options: ['left', 'right', 'top', 'bottom'] },
      description: 'Placement of the drawer'
    },
    size: {
      control: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'] },
      description: 'Size of the drawer'
    },
    isModal: {
      control: 'boolean',
      description: 'Whether the drawer has an overlay'
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Whether the drawer closes on ESC key press'
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Whether the drawer closes when clicking the overlay'
    }
  }
};

// Template for interactive examples
const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
      >
        Open Drawer
      </button>
      
      <Drawer 
        {...args} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
      >
        <div className="p-6">
          <h3 className="text-lg font-medium text-text-primary mb-4">Drawer Content</h3>
          <p className="text-text-secondary mb-4">
            This is the content of the drawer. You can put any content here, such as forms, navigation, or additional information.
          </p>
          <button 
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Close Drawer
          </button>
        </div>
      </Drawer>
    </div>
  );
};

// Basic drawer from the right (default)
export const Basic = Template.bind({});
Basic.args = {
  placement: 'right',
  size: 'md',
  isModal: true,
  closeOnEsc: true,
  closeOnOverlayClick: true
};

// Drawer from the left
export const LeftDrawer = Template.bind({});
LeftDrawer.args = {
  placement: 'left',
  size: 'md',
  isModal: true,
  closeOnEsc: true,
  closeOnOverlayClick: true
};

// Drawer from the top
export const TopDrawer = Template.bind({});
TopDrawer.args = {
  placement: 'top',
  size: 'md',
  isModal: true,
  closeOnEsc: true,
  closeOnOverlayClick: true
};

// Drawer from the bottom
export const BottomDrawer = Template.bind({});
BottomDrawer.args = {
  placement: 'bottom',
  size: 'md',
  isModal: true,
  closeOnEsc: true,
  closeOnOverlayClick: true
};

// Different sizes
export const Sizes = () => {
  const [isOpenXS, setIsOpenXS] = useState(false);
  const [isOpenSM, setIsOpenSM] = useState(false);
  const [isOpenMD, setIsOpenMD] = useState(false);
  const [isOpenLG, setIsOpenLG] = useState(false);
  const [isOpenXL, setIsOpenXL] = useState(false);
  const [isOpenFull, setIsOpenFull] = useState(false);
  
  return (
    <div className="flex flex-wrap gap-4">
      <button 
        onClick={() => setIsOpenXS(true)}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
      >
        XS Drawer
      </button>
      <button 
        onClick={() => setIsOpenSM(true)}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
      >
        SM Drawer
      </button>
      <button 
        onClick={() => setIsOpenMD(true)}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
      >
        MD Drawer
      </button>
      <button 
        onClick={() => setIsOpenLG(true)}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
      >
        LG Drawer
      </button>
      <button 
        onClick={() => setIsOpenXL(true)}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
      >
        XL Drawer
      </button>
      <button 
        onClick={() => setIsOpenFull(true)}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
      >
        Full Drawer
      </button>
      
      <Drawer isOpen={isOpenXS} onClose={() => setIsOpenXS(false)} size="xs">
        <div className="p-4">
          <h3 className="text-lg font-medium">XS Drawer</h3>
          <p className="mt-2 text-text-secondary">This is an extra small drawer.</p>
        </div>
      </Drawer>
      
      <Drawer isOpen={isOpenSM} onClose={() => setIsOpenSM(false)} size="sm">
        <div className="p-4">
          <h3 className="text-lg font-medium">SM Drawer</h3>
          <p className="mt-2 text-text-secondary">This is a small drawer.</p>
        </div>
      </Drawer>
      
      <Drawer isOpen={isOpenMD} onClose={() => setIsOpenMD(false)} size="md">
        <div className="p-4">
          <h3 className="text-lg font-medium">MD Drawer</h3>
          <p className="mt-2 text-text-secondary">This is a medium drawer (default).</p>
        </div>
      </Drawer>
      
      <Drawer isOpen={isOpenLG} onClose={() => setIsOpenLG(false)} size="lg">
        <div className="p-4">
          <h3 className="text-lg font-medium">LG Drawer</h3>
          <p className="mt-2 text-text-secondary">This is a large drawer.</p>
        </div>
      </Drawer>
      
      <Drawer isOpen={isOpenXL} onClose={() => setIsOpenXL(false)} size="xl">
        <div className="p-4">
          <h3 className="text-lg font-medium">XL Drawer</h3>
          <p className="mt-2 text-text-secondary">This is an extra large drawer.</p>
        </div>
      </Drawer>
      
      <Drawer isOpen={isOpenFull} onClose={() => setIsOpenFull(false)} size="full">
        <div className="p-4">
          <h3 className="text-lg font-medium">Full Drawer</h3>
          <p className="mt-2 text-text-secondary">This drawer takes up the full width or height.</p>
        </div>
      </Drawer>
    </div>
  );
};

// Non-modal drawer
export const NonModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <div className="mb-4">
        <button 
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          Open Non-Modal Drawer
        </button>
      </div>
      
      <div className="p-6 bg-gray-100 rounded-lg max-w-3xl">
        <h3 className="text-lg font-medium mb-4">Main Content</h3>
        <p className="mb-4">
          This is the main content of the page. When a non-modal drawer is open, you can still interact with the content behind it.
          Try clicking this text or the buttons below while the drawer is open.
        </p>
        
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-secondary text-white rounded-md">
            Button 1
          </button>
          <button className="px-4 py-2 bg-secondary text-white rounded-md">
            Button 2
          </button>
          <button className="px-4 py-2 bg-secondary text-white rounded-md">
            Button 3
          </button>
        </div>
      </div>
      
      <Drawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        isModal={false}
        placement="right"
        size="sm"
      >
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Non-Modal Drawer</h3>
          <p className="text-text-secondary mb-4">
            This drawer doesn't have an overlay and doesn't prevent interaction with the content behind it.
          </p>
          <button 
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Close Drawer
          </button>
        </div>
      </Drawer>
    </div>
  );
};

// Drawer with header and footer
export const WithHeaderAndFooter = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
      >
        Open Drawer with Header & Footer
      </button>
      
      <Drawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        header="Drawer Title"
        footer={
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-border-medium text-text-primary rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                alert('Action confirmed!');
                setIsOpen(false);
              }}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              Confirm
            </button>
          </div>
        }
      >
        <div className="p-6">
          <p className="text-text-secondary">
            This drawer has a header with a title and a footer with action buttons.
            The header includes a close button by default.
          </p>
        </div>
      </Drawer>
    </div>
  );
};

// Real-world example: Form in drawer
export const FormDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
      >
        Open Form Drawer
      </button>
      
      <Drawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        header="Add New Contact"
        size="md"
        footer={
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-border-medium text-text-primary rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                alert('Contact saved!');
                setIsOpen(false);
              }}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              Save Contact
            </button>
          </div>
        }
      >
        <div className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-text-secondary">Personal Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Phone</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-text-secondary">Company Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Company</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Job Title</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter job title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Department</label>
                <select 
                  className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select department</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="engineering">Engineering</option>
                  <option value="support">Support</option>
                  <option value="hr">Human Resources</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-text-secondary">Additional Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Notes</label>
                <textarea 
                  className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter any additional notes"
                  rows={3}
                />
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="subscribe" 
                  className="h-4 w-4 text-primary focus:ring-primary border-border-medium rounded"
                />
                <label htmlFor="subscribe" className="ml-2 block text-sm text-text-primary">
                  Add to mailing list
                </label>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

// Real-world example: Navigation drawer
export const NavigationDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
      >
        Open Navigation Drawer
      </button>
      
      <Drawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        placement="left"
        size="xs"
      >
        <div className="py-4">
          <div className="px-4 py-2 mb-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                A
              </div>
              <div className="ml-2">
                <div className="font-medium text-text-primary">Atavya Fresh</div>
                <div className="text-xs text-text-secondary">Admin Dashboard</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <a 
              href="#" 
              className="flex items-center px-4 py-2 text-text-primary bg-primary/10 font-medium"
            >
              <span className="material-icons text-primary mr-3 text-xl">dashboard</span>
              Dashboard
            </a>
            <a 
              href="#" 
              className="flex items-center px-4 py-2 text-text-primary hover:bg-gray-100"
            >
              <span className="material-icons text-text-secondary mr-3 text-xl">people</span>
              Users
            </a>
            <a 
              href="#" 
              className="flex items-center px-4 py-2 text-text-primary hover:bg-gray-100"
            >
              <span className="material-icons text-text-secondary mr-3 text-xl">inventory</span>
              Products
            </a>
            <a 
              href="#" 
              className="flex items-center px-4 py-2 text-text-primary hover:bg-gray-100"
            >
              <span className="material-icons text-text-secondary mr-3 text-xl">shopping_cart</span>
              Orders
            </a>
            <a 
              href="#" 
              className="flex items-center px-4 py-2 text-text-primary hover:bg-gray-100"
            >
              <span className="material-icons text-text-secondary mr-3 text-xl">bar_chart</span>
              Analytics
            </a>
            <a 
              href="#" 
              className="flex items-center px-4 py-2 text-text-primary hover:bg-gray-100"
            >
              <span className="material-icons text-text-secondary mr-3 text-xl">settings</span>
              Settings
            </a>
          </div>
          
          <div className="border-t border-border-light mt-6 pt-6 px-4">
            <a 
              href="#" 
              className="flex items-center text-text-primary hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <span className="material-icons mr-2 text-xl">logout</span>
              Sign Out
            </a>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
