import React from 'react';
import EmptyState from './EmptyState';

export default {
  title: "Feedback/EmptyState",
  component: EmptyState,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
    },
    variant: {
      control: { type: 'select', options: ['default', 'notice', 'warning', 'success', 'danger'] },
    },
  },
  tags: ['autodocs'],
};

const Template = (args) => <EmptyState {...args} />;

// Common icons
const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

// Simple illustration component
const SimpleIllustration = () => (
  <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="80" 
      height="80" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="text-primary"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="8" y1="12" x2="16" y2="12"></line>
      <line x1="12" y1="8" x2="12" y2="16"></line>
    </svg>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: "No items found",
  description: 'Add your first item to get started with this collection.',
  icon: <FolderIcon />,
  action: {
    label: 'Add item',
    onClick: () => console.log('Add item clicked'),
    variant: 'primary',
    icon: <AddIcon />,
  },
};

export const FilteredResults = Template.bind({});
FilteredResults.args = {
  title: "No matching results",
  description: 'Try adjusting your search or filter criteria to find what you\'re looking for.',
  icon: <SearchIcon />,
  action: {
    label: 'Clear filters',
    onClick: () => console.log('Clear filters clicked'),
  },
  secondaryAction: {
    label: 'New search',
    onClick: () => console.log('New search clicked'),
  },
};

export const NoResults = Template.bind({});
NoResults.args = {
  title: "No search results",
  description: 'We couldn\'t find anything with that term. Try searching for something else.',
  icon: <SearchIcon />,
  action: {
    label: 'Clear search',
    onClick: () => console.log('Clear search clicked'),
  },
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  title: "No documents",
  description: 'Get started by creating your first document.',
  icon: <DocumentIcon />,
  size: 'sm',
  action: {
    label: 'Create',
    onClick: () => console.log('Create clicked'),
    variant: 'primary',
  },
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  title: "All tasks completed!",
  description: 'Way to go! You\'ve completed all your tasks and your inbox is now empty.',
  illustration: <SimpleIllustration />,
  size: 'lg',
  action: {
    label: 'Go to dashboard',
    onClick: () => console.log('Go to dashboard clicked'),
  },
};

export const NoticeVariant = Template.bind({});
NoticeVariant.args = {
  title: "Important notice",
  description: 'Please be aware of this important information that requires your attention.',
  icon: <DocumentIcon />,
  variant: 'notice',
  action: {
    label: 'Acknowledge',
    onClick: () => console.log('Acknowledge clicked'),
    variant: 'primary',
  },
};

export const WarningVariant = Template.bind({});
WarningVariant.args = {
  title: "Update required",
  description: 'Your software needs to be updated for security purposes.',
  icon: <DocumentIcon />,
  variant: 'warning',
  action: {
    label: 'Update now',
    onClick: () => console.log('Update now clicked'),
    variant: 'primary',
  },
  secondaryAction: {
    label: 'Learn more',
    onClick: () => console.log('Learn more clicked'),
  },
};

export const SuccessVariant = Template.bind({});
SuccessVariant.args = {
  title: "Task completed",
  description: 'Your task has been completed successfully! No further action is needed.',
  icon: <DocumentIcon />,
  variant: 'success',
  action: {
    label: 'Continue',
    onClick: () => console.log('Continue clicked'),
    variant: 'primary',
  },
};

export const DangerVariant = Template.bind({});
DangerVariant.args = {
  title: "Access denied",
  description: 'You don\'t have permission to view this content. Contact an administrator for access.',
  icon: <FolderIcon />,
  variant: 'danger',
  action: {
    label: 'Request access',
    onClick: () => console.log('Request access clicked'),
    variant: 'primary',
  },
  secondaryAction: {
    label: 'Go back',
    onClick: () => console.log('Go back clicked'),
  },
};

// Real-world examples
export const EmptyInbox = () => (
  <div className="max-w-2xl mx-auto p-6 border border-border-light rounded-lg bg-white">
    <EmptyState
      title="Your inbox is empty"
      description="You've processed all your messages. Check back later for new communications."
      illustration={
        <div className="w-40 h-40 mx-auto flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="100" 
            height="100" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-primary"
          >
            <path d="M22 12h-6l-2 3h-4l-2-3H2" />
            <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
          </svg>
        </div>
      }
      action={{
        label: 'Compose new message',
        onClick: () => console.log('Compose clicked'),
        variant: 'primary',
      }}
      secondaryAction={{
        label: 'View archived',
        onClick: () => console.log('View archived clicked'),
      }}
      size="lg"
    />
  </div>
);

export const NoSearchResults = () => (
  <div className="max-w-4xl mx-auto">
    <div className="mb-6 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-text-primary">Product Catalog</h2>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input 
            type="text" 
            className="pl-9 pr-4 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="Search products..." 
            defaultValue="quantum flux capacitor"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
            <SearchIcon />
          </div>
        </div>
        <select className="border border-border-medium rounded-md px-3 py-2 bg-background-light text-text-primary">
          <option>All categories</option>
          <option>Electronics</option>
          <option>Office</option>
          <option>Home</option>
        </select>
      </div>
    </div>
    
    <div className="border border-border-light rounded-lg overflow-hidden">
      <div className="p-8">
        <EmptyState
          title="No products found"
          description="We couldn't find any products matching 'quantum flux capacitor'. Try using different keywords or browse our categories."
          icon={<SearchIcon />}
          action={{
            label: 'Clear search',
            onClick: () => console.log('Clear search clicked'),
            variant: 'primary',
          }}
          secondaryAction={{
            label: 'Browse all products',
            onClick: () => console.log('Browse all clicked'),
          }}
        />
      </div>
    </div>
  </div>
);

export const EmptyCart = () => (
  <div className="max-w-3xl mx-auto border border-border-light rounded-lg overflow-hidden">
    <div className="bg-background-light px-6 py-4 border-b border-border-light">
      <h2 className="text-lg font-medium text-text-primary">Your Shopping Cart</h2>
    </div>
    
    <div className="p-8">
      <EmptyState
        title="Your cart is empty"
        description="Looks like you haven't added any items to your cart yet. Start shopping to find amazing products!"
        illustration={
          <div className="w-32 h-32 mx-auto rounded-full bg-background-light flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-text-secondary"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
        }
        action={{
          label: 'Continue shopping',
          onClick: () => console.log('Continue shopping clicked'),
          variant: 'primary',
        }}
        secondaryAction={{
          label: 'View saved items',
          onClick: () => console.log('View saved items clicked'),
        }}
      />
    </div>
    
    <div className="bg-background-light px-6 py-4 border-t border-border-light flex justify-between items-center">
      <div>
        <p className="text-text-secondary text-sm">Have a promo code?</p>
      </div>
      <div className="text-right">
        <p className="text-text-secondary text-sm">Subtotal: <span className="text-text-primary font-medium">$0.00</span></p>
      </div>
    </div>
  </div>
);

export const NoNotifications = () => (
  <div className="max-w-md mx-auto border border-border-light rounded-lg overflow-hidden shadow-sm">
    <div className="bg-background-light px-4 py-3 border-b border-border-light flex justify-between items-center">
      <h3 className="font-medium text-text-primary">Notifications</h3>
      <button className="text-primary hover:text-primary-dark text-sm">Settings</button>
    </div>
    
    <div className="p-6">
      <EmptyState
        title="All caught up!"
        description="You don't have any new notifications at the moment."
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        }
        size="sm"
        action={{
          label: 'Refresh',
          onClick: () => console.log('Refresh clicked'),
          variant: 'secondary',
        }}
      />
    </div>
  </div>
);
