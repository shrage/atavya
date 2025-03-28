import React from 'react';
import SkeletonLoader from './SkeletonLoader';

export default {
  title: "Core/Display/SkeletonLoader",
  component: SkeletonLoader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const Template = (args) => <SkeletonLoader {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: '100%',
  height: '20px',
};

export const CircleVariant = Template.bind({});
CircleVariant.args = {
  variant: 'circle',
  width: '50px',
  height: '50px',
};

export const PresetAvatar = Template.bind({});
PresetAvatar.args = {
  size: 'avatar',
};

export const PresetText = Template.bind({});
PresetText.args = {
  size: 'text',
};

export const PresetHeading = Template.bind({});
PresetHeading.args = {
  size: 'heading',
};

export const PresetButton = Template.bind({});
PresetButton.args = {
  size: 'button',
};

export const PresetCard = Template.bind({});
PresetCard.args = {
  size: 'card',
};

export const NoAnimation = Template.bind({});
NoAnimation.args = {
  size: 'text',
  animation: 'none',
};

export const MultipleLines = Template.bind({});
MultipleLines.args = {
  size: 'text',
  lines: 3,
};

export const DifferentSpacing = Template.bind({});
DifferentSpacing.args = {
  size: 'text',
  lines: 3,
  spacing: 'lg',
};

export const WithChildren = () => (
  <SkeletonLoader 
    size="text" 
    isLoading={false}
  >
    <p className="text-text-primary">This content is shown when not loading</p>
  </SkeletonLoader>
);

export const ConditionalLoading = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div>
      <p className="mb-4 text-text-primary">Wait 3 seconds to see the content...</p>
      <SkeletonLoader 
        size="text" 
        lines={3}
        isLoading={isLoading}
      >
        <div className="border border-border-light p-4 rounded-md bg-background-light">
          <h3 className="text-lg font-medium text-text-primary">Content Loaded!</h3>
          <p className="text-text-secondary">This content appears after loading is complete.</p>
        </div>
      </SkeletonLoader>
    </div>
  );
};

// Skeleton UI patterns
export const ProfileCardSkeleton = () => (
  <div className="bg-background-light p-4 rounded-lg border border-border-light w-64">
    <div className="flex items-center mb-4">
      <SkeletonLoader size="avatar" />
      <div className="ml-3">
        <SkeletonLoader size="heading" width="100px" height="0.875rem" className="mb-1" />
        <SkeletonLoader width="60px" height="0.75rem" />
      </div>
    </div>
    <SkeletonLoader lines={3} />
    <div className="mt-4 flex gap-2">
      <SkeletonLoader width="70px" height="30px" />
      <SkeletonLoader width="70px" height="30px" />
    </div>
  </div>
);

export const ArticleSkeleton = () => (
  <div className="max-w-xl">
    <SkeletonLoader size="heading" className="mb-2" />
    <SkeletonLoader width="30%" height="0.875rem" className="mb-6" />
    
    <SkeletonLoader size="card" className="mb-4" />
    
    <SkeletonLoader lines={4} className="mb-4" />
    <SkeletonLoader width="90%" height="1rem" className="mb-1" />
    <SkeletonLoader width="95%" height="1rem" className="mb-1" />
    <SkeletonLoader width="85%" height="1rem" className="mb-4" />
    
    <SkeletonLoader lines={3} />
  </div>
);

export const TableSkeleton = () => (
  <div className="w-full border border-border-light rounded-lg overflow-hidden">
    <div className="bg-background-skeleton p-3 border-b border-border-light">
      <div className="flex justify-between">
        <SkeletonLoader width="150px" height="1.5rem" />
        <SkeletonLoader width="100px" height="1.5rem" />
      </div>
    </div>
    
    {[1, 2, 3, 4, 5].map((row) => (
      <div key={row} className="border-b border-border-light p-3">
        <div className="flex gap-4 items-center">
          <SkeletonLoader size="avatarSm" />
          <SkeletonLoader width="25%" height="0.875rem" />
          <SkeletonLoader width="15%" height="0.875rem" />
          <SkeletonLoader width="20%" height="0.875rem" />
          <SkeletonLoader width="10%" height="0.875rem" />
          <SkeletonLoader width="10%" height="2rem" rounded="md" />
        </div>
      </div>
    ))}
  </div>
);

// Real-world examples
export const DashboardSkeleton = () => (
  <div className="max-w-4xl">
    <div className="flex justify-between items-center mb-6">
      <SkeletonLoader width="200px" height="2rem" />
      <SkeletonLoader width="120px" height="2.5rem" rounded="md" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {[1, 2, 3].map((card) => (
        <div key={card} className="border border-border-light rounded-lg p-4 bg-background-light">
          <SkeletonLoader width="80px" height="0.875rem" className="mb-2" />
          <SkeletonLoader width="120px" height="1.5rem" className="mb-1" />
          <SkeletonLoader width="100%" height="4px" className="mt-3" />
        </div>
      ))}
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border border-border-light rounded-lg p-4 bg-background-light">
        <SkeletonLoader width="150px" height="1.25rem" className="mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <SkeletonLoader variant="circle" width="36px" height="36px" />
              <div className="flex-1">
                <SkeletonLoader width="60%" height="0.875rem" className="mb-1" />
                <SkeletonLoader width="40%" height="0.75rem" />
              </div>
              <SkeletonLoader width="60px" height="1.5rem" rounded="md" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="border border-border-light rounded-lg p-4 bg-background-light">
        <SkeletonLoader width="120px" height="1.25rem" className="mb-4" />
        <SkeletonLoader height="180px" className="mb-3" />
        <div className="flex justify-between">
          <SkeletonLoader width="100px" height="0.875rem" />
          <SkeletonLoader width="80px" height="0.875rem" />
        </div>
      </div>
    </div>
  </div>
);

export const FormSkeleton = () => (
  <div className="max-w-md border border-border-light rounded-lg p-5 bg-background-light">
    <SkeletonLoader width="60%" height="1.5rem" className="mb-6" />
    
    <div className="space-y-4">
      <div>
        <SkeletonLoader width="80px" height="0.875rem" className="mb-2" />
        <SkeletonLoader height="2.5rem" rounded="md" />
      </div>
      
      <div>
        <SkeletonLoader width="120px" height="0.875rem" className="mb-2" />
        <SkeletonLoader height="2.5rem" rounded="md" />
      </div>
      
      <div>
        <SkeletonLoader width="100px" height="0.875rem" className="mb-2" />
        <SkeletonLoader height="5rem" rounded="md" />
      </div>
      
      <div className="flex items-center gap-2 mt-2">
        <SkeletonLoader variant="circle" width="20px" height="20px" />
        <SkeletonLoader width="180px" height="0.875rem" />
      </div>
      
      <div className="pt-4">
        <SkeletonLoader width="100%" height="2.75rem" rounded="md" />
      </div>
    </div>
  </div>
);
