import React from 'react';
import Menu from './Menu';
import MenuItem from './MenuItem';
import MenuDivider from './MenuDivider';

export default {
  title: 'Navigation/Menu',
  component: Menu,
  subcomponents: { MenuItem, MenuDivider },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile menu component following the Atavya design system, supporting various triggers, placements, and customization options.',
      },
    },
  },
  tags: ['autodocs'],
};

// Example icons
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

// Template with a button trigger
const Template = (args) => (
  <Menu
    {...args}
    trigger={
      <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
        Open Menu
      </button>
    }
  >
    <MenuItem>View profile</MenuItem>
    <MenuItem>Account settings</MenuItem>
    <MenuDivider />
    <MenuItem>Help center</MenuItem>
    <MenuItem disabled>Upgrade plan</MenuItem>
    <MenuDivider />
    <MenuItem destructive>Log out</MenuItem>
  </Menu>
);

export const Default = Template.bind({});
Default.args = {
  placement: 'bottom-start',
};

export const WithIcons = (args) => (
  <Menu
    {...args}
    trigger={
      <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
        Actions
      </button>
    }
  >
    <MenuItem icon={<EditIcon />}>Edit</MenuItem>
    <MenuItem 
      icon={<TrashIcon />} 
      destructive
      className={`text-status-danger`}
    >
      Delete
    </MenuItem>
    <MenuDivider />
    <MenuItem 
      icon={<CheckIcon />}
      selected
    >
      Mark as complete
    </MenuItem>
  </Menu>
);

export const RightIcons = (args) => (
  <Menu
    {...args}
    trigger={
      <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
        Settings
      </button>
    }
  >
    <MenuItem rightIcon={<ChevronRightIcon />}>Account</MenuItem>
    <MenuItem rightIcon={<ChevronRightIcon />}>Privacy</MenuItem>
    <MenuItem rightIcon={<ChevronRightIcon />}>Notifications</MenuItem>
    <MenuDivider />
    <MenuItem>Help</MenuItem>
  </Menu>
);

export const Placements = () => (
  <div className="grid grid-cols-3 gap-8 p-16">
    <Menu
      placement="top-start"
      trigger={
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Top Start
        </button>
      }
    >
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </Menu>
    
    <Menu
      placement="top"
      trigger={
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Top
        </button>
      }
    >
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </Menu>
    
    <Menu
      placement="top-end"
      trigger={
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Top End
        </button>
      }
    >
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </Menu>
    
    <Menu
      placement="left"
      trigger={
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Left
        </button>
      }
    >
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </Menu>
    
    <div></div>
    
    <Menu
      placement="right"
      trigger={
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Right
        </button>
      }
    >
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </Menu>
    
    <Menu
      placement="bottom-start"
      trigger={
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Bottom Start
        </button>
      }
    >
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </Menu>
    
    <Menu
      placement="bottom"
      trigger={
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Bottom
        </button>
      }
    >
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </Menu>
    
    <Menu
      placement="bottom-end"
      trigger={
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Bottom End
        </button>
      }
    >
      <MenuItem>Option 1</MenuItem>
      <MenuItem>Option 2</MenuItem>
    </Menu>
  </div>
);

export const HoverTrigger = (args) => (
  <Menu
    triggerType="hover"
    trigger={
      <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
        Hover Me
      </button>
    }
  >
    <MenuItem>Profile</MenuItem>
    <MenuItem>Settings</MenuItem>
    <MenuDivider />
    <MenuItem>Logout</MenuItem>
  </Menu>
);

export const ContextMenuTrigger = (args) => (
  <div className="p-8 bg-gray-100 rounded-lg">
    <p>Right-click anywhere in this area</p>
    
    <Menu
      triggerType="context"
      trigger={
        <div className="absolute inset-0 w-full h-full cursor-context-menu" />
      }
    >
      <MenuItem icon={<EditIcon />}>Edit</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Paste</MenuItem>
      <MenuDivider />
      <MenuItem icon={<TrashIcon />} destructive className={`text-status-danger`}>Delete</MenuItem>
    </Menu>
  </div>
);

export const WithCustomWidth = Template.bind({});
WithCustomWidth.args = {
  width: '250px',
};

export const WithFunctionTrigger = (args) => (
  <Menu
    trigger={({ isOpen }) => (
      <button className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${isOpen ? `bg-primary-dark` : `bg-primary`} text-white`}>
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>
    )}
  >
    <MenuItem>Profile</MenuItem>
    <MenuItem>Settings</MenuItem>
    <MenuDivider />
    <MenuItem>Logout</MenuItem>
  </Menu>
);

export const ControlledMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <button 
          className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none`}
          onClick={() => setIsOpen(true)}
        >
          Open Menu
        </button>
        
        <button 
          className={`px-4 py-2 bg-status-danger text-white rounded-md hover:bg-status-danger-dark focus:outline-none`}
          onClick={() => setIsOpen(false)}
        >
          Close Menu
        </button>
      </div>
      
      <Menu
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        trigger={
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
            Controlled Menu
          </button>
        }
      >
        <MenuItem>Option 1</MenuItem>
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>
      </Menu>
    </div>
  );
};
