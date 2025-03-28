import React from 'react';
import Accordion from './Accordion';

export default {
  title: "Layout/Accordion",
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const Template = (args) => <Accordion {...args} />;

// Sample accordion items for stories
const sampleItems = [
  {
    id: 'item1',
    title: "About Atavya",
    content: (
      <div className="text-text-primary">
        <p>
          Atavya is a comprehensive property management platform designed to streamline operations for property managers, tenants, and owners.
        </p>
        <p className="mt-2">
          The platform includes features for rent collection, maintenance requests, tenant communications, and property analytics.
        </p>
      </div>
    ),
  },
  {
    id: 'item2',
    title: "Getting Started",
    content: (
      <div className="text-text-primary">
        <p>Getting started with Atavya is simple:</p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Create an account</li>
          <li>Add your properties</li>
          <li>Invite tenants or team members</li>
          <li>Configure your settings</li>
          <li>Start managing your properties</li>
        </ol>
      </div>
    ),
  },
  {
    id: 'item3',
    title: "Pricing Plans",
    content: (
      <div className="text-text-primary">
        <p>Atavya offers several pricing tiers to accommodate different needs:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Starter:</strong> For individual landlords with up to 5 units</li>
          <li><strong>Professional:</strong> For property managers with up to 50 units</li>
          <li><strong>Enterprise:</strong> For large property management companies with unlimited units</li>
        </ul>
        <p className="mt-2">
          All plans include core features like rent collection, maintenance requests, and basic reporting.
          Higher-tier plans include advanced analytics, API access, and dedicated support.
        </p>
      </div>
    ),
  },
  {
    id: 'item4',
    title: "Disabled Section",
    disabled: true,
    content: 'This content is disabled and should not be accessible.',
  },
];

// Icons for the custom icon story
const CustomIcon = ({ isExpanded }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={`w-5 h-5 transition-transform duration-200 text-primary ${isExpanded ? 'transform rotate-45' : ''}`}
    viewBox="0 0 20 20" 
    fill="currentColor"
  >
    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

// Sample items with custom icons
const itemsWithCustomIcons = sampleItems.map(item => ({
  ...item,
  icon: <CustomIcon isExpanded={false} />
}));

export const Default = Template.bind({});
Default.args = {
  items: sampleItems,
  defaultExpandedItems: [0],
};

export const AllowMultiple = Template.bind({});
AllowMultiple.args = {
  items: sampleItems,
  defaultExpandedItems: [0, 1],
  allowMultiple: true,
};

export const GhostVariant = Template.bind({});
GhostVariant.args = {
  items: sampleItems,
  variant: 'ghost',
  defaultExpandedItems: [0],
};

export const BoxedVariant = Template.bind({});
BoxedVariant.args = {
  items: sampleItems,
  variant: 'boxed',
  defaultExpandedItems: [0],
};

export const SubtleVariant = Template.bind({});
SubtleVariant.args = {
  items: sampleItems,
  variant: 'subtle',
  defaultExpandedItems: [0],
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  items: sampleItems,
  size: 'sm',
  defaultExpandedItems: [0],
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  items: sampleItems,
  size: 'lg',
  defaultExpandedItems: [0],
};

export const NoDividers = Template.bind({});
NoDividers.args = {
  items: sampleItems,
  dividers: false,
  defaultExpandedItems: [0],
};

export const LeftIconPosition = Template.bind({});
LeftIconPosition.args = {
  items: sampleItems,
  iconPosition: 'left',
  defaultExpandedItems: [0],
};

export const CustomIcons = Template.bind({});
CustomIcons.args = {
  items: itemsWithCustomIcons,
  defaultExpandedItems: [0],
};

export const WithCallback = Template.bind({});
WithCallback.args = {
  items: sampleItems,
  onChange: (expandedItems) => console.log('Expanded items changed:', expandedItems),
};

export const WithDisabledItem = Template.bind({});
WithDisabledItem.args = {
  items: sampleItems,
  defaultExpandedItems: [0],
};

// Real-world examples
export const FAQAccordion = () => {
  const faqItems = [
    {
      id: 'faq1',
      title: "How do I reset my password?",
      content: (
        <div className="text-text-primary">
          <p>
            To reset your password, follow these steps:
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Click on the "Forgot Password" link on the login page</li>
            <li>Enter the email address associated with your account</li>
            <li>Check your email for a password reset link</li>
            <li>Click the link and follow the instructions to create a new password</li>
          </ol>
          <p className="mt-2 text-text-secondary text-sm">
            If you don't receive an email within a few minutes, check your spam folder or contact support.
          </p>
        </div>
      ),
    },
    {
      id: 'faq2',
      title: "How do I add a new property to my account?",
      content: (
        <div className="text-text-primary">
          <p>
            Adding a new property is easy:
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Navigate to the Properties section in your dashboard</li>
            <li>Click the "Add Property" button</li>
            <li>Fill out the property details form</li>
            <li>Upload photos and documents (optional)</li>
            <li>Click "Save" to add the property to your account</li>
          </ol>
          <div className="mt-3 p-3 bg-status-info/10 text-status-info rounded-md text-sm">
            <strong>Pro Tip:</strong> You can import multiple properties at once using our bulk import feature.
          </div>
        </div>
      ),
    },
    {
      id: 'faq3',
      title: "How are maintenance requests handled?",
      content: (
        <div className="text-text-primary">
          <p>
            Maintenance requests follow this workflow:
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Tenant submits a request through their portal</li>
            <li>Property manager receives notification</li>
            <li>Request is assigned to maintenance staff</li>
            <li>Work is completed and documented</li>
            <li>Tenant confirms resolution</li>
          </ol>
          <p className="mt-2">
            You can customize this workflow in your account settings to match your specific process.
          </p>
        </div>
      ),
    },
    {
      id: 'faq4',
      title: "What payment methods do you accept?",
      content: (
        <div className="text-text-primary">
          <p>
            We accept the following payment methods:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Credit/Debit Cards (Visa, Mastercard, Amex)</li>
            <li>ACH Bank Transfers</li>
            <li>PayPal</li>
            <li>Wire Transfers (for annual plans only)</li>
          </ul>
          <p className="mt-2 text-text-secondary text-sm">
            All payments are processed securely through our PCI-compliant payment gateway.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">Frequently Asked Questions</h2>
        <p className="text-text-secondary">Find answers to common questions about using Atavya.</p>
      </div>
      
      <div className="border border-border-light rounded-lg overflow-hidden">
        <Accordion 
          items={faqItems}
          variant="boxed"
          allowMultiple={true}
          dividers={true}
        />
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-text-secondary text-sm">
          Can't find what you're looking for?
          <a href="#" className="text-primary hover:text-primary-dark ml-1">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export const ProductSpecifications = () => {
  const specItems = [
    {
      id: 'specs1',
      title: "Technical Specifications",
      content: (
        <div className="text-text-primary">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">System Requirements</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Operating System:</span>
                  <span className="text-text-secondary">Windows 10/11, macOS 10.15+</span>
                </li>
                <li className="flex justify-between">
                  <span>Processor:</span>
                  <span className="text-text-secondary">Intel i5 or equivalent</span>
                </li>
                <li className="flex justify-between">
                  <span>Memory:</span>
                  <span className="text-text-secondary">8GB RAM minimum</span>
                </li>
                <li className="flex justify-between">
                  <span>Storage:</span>
                  <span className="text-text-secondary">256GB SSD</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Connectivity</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Wi-Fi:</span>
                  <span className="text-text-secondary">802.11ac</span>
                </li>
                <li className="flex justify-between">
                  <span>Bluetooth:</span>
                  <span className="text-text-secondary">5.0</span>
                </li>
                <li className="flex justify-between">
                  <span>Ports:</span>
                  <span className="text-text-secondary">2x USB-C, 1x HDMI</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'specs2',
      title: "Physical Dimensions",
      content: (
        <div className="text-text-primary">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Size & Weight</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Height:</span>
                  <span className="text-text-secondary">0.6 inches (15.2 mm)</span>
                </li>
                <li className="flex justify-between">
                  <span>Width:</span>
                  <span className="text-text-secondary">12.8 inches (325.1 mm)</span>
                </li>
                <li className="flex justify-between">
                  <span>Depth:</span>
                  <span className="text-text-secondary">8.9 inches (226.1 mm)</span>
                </li>
                <li className="flex justify-between">
                  <span>Weight:</span>
                  <span className="text-text-secondary">3.0 pounds (1.36 kg)</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Materials</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Body:</span>
                  <span className="text-text-secondary">Aluminum</span>
                </li>
                <li className="flex justify-between">
                  <span>Display:</span>
                  <span className="text-text-secondary">Gorilla Glass 6</span>
                </li>
                <li className="flex justify-between">
                  <span>Colors:</span>
                  <span className="text-text-secondary">Silver, Space Gray, Gold</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'specs3',
      title: "Warranty Information",
      content: (
        <div className="text-text-primary">
          <p>
            Our product comes with a standard 1-year limited warranty covering manufacturing defects and hardware failures under normal use.
          </p>
          <div className="mt-3 p-3 bg-status-warning/10 text-status-warning rounded-md text-sm">
            <strong>Important:</strong> Warranty does not cover accidental damage, liquid damage, or unauthorized modifications.
          </div>
          <p className="mt-3">
            Extended warranty options are available:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li>2-year extended warranty: $99</li>
            <li>3-year extended warranty with accidental damage protection: $149</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Product Specifications</h2>
        <p className="text-text-secondary text-sm">Detailed technical information about our product.</p>
      </div>
      
      <div className="border border-border-light rounded-lg overflow-hidden bg-white">
        <Accordion 
          items={specItems}
          variant="subtle"
          allowMultiple={true}
          dividers={true}
          size="lg"
        />
      </div>
    </div>
  );
};
