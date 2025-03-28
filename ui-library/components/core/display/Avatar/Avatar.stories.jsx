import React from 'react';
import Avatar from './Avatar';

export default {
  title: "Core/Display/Avatar",
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    badge: { control: 'text' },
  },
};

const Template = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'John Doe',
};

export const WithImage = Template.bind({});
WithImage.args = {
  src: 'https://randomuser.me/api/portraits/men/32.jpg',
  name: 'John Doe',
};

export const WithStatus = Template.bind({});
WithStatus.args = {
  src: 'https://randomuser.me/api/portraits/women/44.jpg',
  name: 'Jane Smith',
  status: 'online',
};

export const WithBadge = Template.bind({});
WithBadge.args = {
  src: 'https://randomuser.me/api/portraits/men/75.jpg',
  name: 'Robert Johnson',
  badge: '3',
};

export const WithCustomBadge = Template.bind({});
WithCustomBadge.args = {
  src: 'https://randomuser.me/api/portraits/women/68.jpg',
  name: 'Emily Davis',
  badge: (
    <span className="bg-status-success text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      +
    </span>
  ),
};

export const WithBorder = Template.bind({});
WithBorder.args = {
  src: 'https://randomuser.me/api/portraits/men/55.jpg',
  name: 'Michael Wilson',
  showBorder: true,
};

export const WithCustomBorder = Template.bind({});
WithCustomBorder.args = {
  src: 'https://randomuser.me/api/portraits/women/65.jpg',
  name: 'Olivia Brown',
  showBorder: true,
  borderColor: 'primary',
};

export const Clickable = Template.bind({});
Clickable.args = {
  name: 'Alex Johnson',
  onClick: () => alert('Avatar clicked'),
};

export const WithInitials = Template.bind({});
WithInitials.args = {
  name: 'John Doe',
};

export const SingleInitial = Template.bind({});
SingleInitial.args = {
  name: 'John',
};

export const SquareVariant = Template.bind({});
SquareVariant.args = {
  name: 'Sarah Wilson',
  variant: 'square',
};

export const RoundedVariant = Template.bind({});
RoundedVariant.args = {
  name: 'Thomas Brown',
  variant: 'rounded',
};

export const DifferentSizes = () => (
  <div className="flex items-end space-x-4">
    <Avatar size="xs" name="XS" />
    <Avatar size="sm" name="SM" />
    <Avatar size="md" name="MD" />
    <Avatar size="lg" name="LG" />
    <Avatar size="xl" name="XL" />
    <Avatar size="2xl" name="2XL" />
  </div>
);

export const DifferentStatuses = () => (
  <div className="flex space-x-4">
    <Avatar name="Online" status="online" />
    <Avatar name="Away" status="away" />
    <Avatar name="Busy" status="busy" />
    <Avatar name="Offline" status="offline" />
  </div>
);

export const StatusPositions = () => (
  <div className="flex space-x-4">
    <Avatar 
      name="TR" 
      status="online" 
      statusPosition="top-right" 
      size="lg" 
    />
    <Avatar 
      name="TL" 
      status="online" 
      statusPosition="top-left" 
      size="lg" 
    />
    <Avatar 
      name="BR" 
      status="online" 
      statusPosition="bottom-right" 
      size="lg" 
    />
    <Avatar 
      name="BL" 
      status="online" 
      statusPosition="bottom-left" 
      size="lg" 
    />
  </div>
);

export const BadgePositions = () => (
  <div className="flex space-x-4">
    <Avatar 
      name="TR" 
      badge="1" 
      badgePosition="top-right" 
      size="lg" 
    />
    <Avatar 
      name="TL" 
      badge="2" 
      badgePosition="top-left" 
      size="lg" 
    />
    <Avatar 
      name="BR" 
      badge="3" 
      badgePosition="bottom-right" 
      size="lg" 
    />
    <Avatar 
      name="BL" 
      badge="4" 
      badgePosition="bottom-left" 
      size="lg" 
    />
  </div>
);

export const Group = () => (
  <div className="flex -space-x-2">
    <Avatar 
      src="https://randomuser.me/api/portraits/men/32.jpg" 
      name="John Doe" 
      showBorder 
    />
    <Avatar 
      src="https://randomuser.me/api/portraits/women/44.jpg" 
      name="Jane Smith" 
      showBorder 
    />
    <Avatar 
      src="https://randomuser.me/api/portraits/men/75.jpg" 
      name="Robert Johnson" 
      showBorder 
    />
    <Avatar 
      name="+" 
      showBorder 
    />
  </div>
);

// Real-world examples
export const UserProfileExamples = () => (
  <div className="space-y-6 max-w-md">
    <div className="p-4 border border-border-light rounded-md bg-background-light">
      <div className="flex items-center space-x-4">
        <Avatar 
          src="https://randomuser.me/api/portraits/women/33.jpg" 
          name="Sarah Johnson" 
          size="lg"
          status="online"
        />
        <div>
          <h3 className="text-text-primary font-medium">Sarah Johnson</h3>
          <p className="text-text-secondary text-sm">Product Designer</p>
          <div className="flex mt-2 space-x-2">
            <button className="px-2 py-1 text-xs bg-primary text-white rounded hover:bg-primary-dark">
              Message
            </button>
            <button className="px-2 py-1 text-xs border border-border-medium text-text-primary rounded hover:bg-background-skeleton">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="p-4 border border-border-light rounded-md bg-background-light">
      <h3 className="text-text-primary font-medium mb-3">Team Members</h3>
      <div className="flex flex-col space-y-3">
        {[
          { name: 'Alex Morgan', role: 'Frontend Developer', status: 'online' },
          { name: 'Jamie Chen', role: 'UX Researcher', status: 'busy' },
          { name: 'Taylor Swift', role: 'Product Manager', status: 'away' },
          { name: 'Morgan Freeman', role: 'Backend Developer', status: 'offline' },
        ].map((member, index) => (
          <div key={index} className="flex items-center justify-between p-2 hover:bg-background-skeleton rounded">
            <div className="flex items-center space-x-3">
              <Avatar 
                name={member.name} 
                status={member.status}
                size="md"
              />
              <div>
                <p className="text-text-primary">{member.name}</p>
                <p className="text-text-tertiary text-xs">{member.role}</p>
              </div>
            </div>
            <button className="text-primary hover:text-primary-dark">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="p-4 border border-border-light rounded-md bg-background-light">
      <h3 className="text-text-primary font-medium mb-3">Project Contributors</h3>
      <div className="flex -space-x-2 mb-3">
        {Array(5).fill(0).map((_, i) => (
          <Avatar 
            key={i}
            name={`User ${i+1}`}
            showBorder
            borderColor="primary"
          />
        ))}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background-skeleton text-text-secondary border-2 border-white text-sm font-medium">
          +8
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-text-secondary text-sm">13 contributors</span>
        <button className="text-primary text-sm hover:text-primary-dark">
          View all
        </button>
      </div>
    </div>
  </div>
);
