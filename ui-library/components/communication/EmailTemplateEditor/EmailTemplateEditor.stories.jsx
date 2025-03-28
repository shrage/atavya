import React, { useState } from 'react';
import EmailTemplateEditor from './EmailTemplateEditor';

export default {
  title: 'Communication/EmailTemplateEditor',
  component: EmailTemplateEditor,
  parameters: {
    docs: {
      description: {
        component: 'A specialized rich text editor for creating and editing email templates. This component uses the core RichTextEditor as part of the Rich Text Standardization effort (WU-009).',
      },
    },
  },
};

// Basic example
export const Basic = () => (
  <EmailTemplateEditor
    placeholder="Create your email template..."
    variables={['firstName', 'lastName', 'companyName', 'productName']}
  />
);

// Controlled component example
export const Controlled = () => {
  const [template, setTemplate] = useState('<h2>Welcome to {{companyName}}!</h2><p>Hello {{firstName}},</p><p>Thank you for your interest in our <strong>{{productName}}</strong>. We\'re excited to have you on board!</p><p>Best regards,<br>The {{companyName}} Team</p>');
  
  return (
    <div className="space-y-4">
      <EmailTemplateEditor
        value={template}
        onChange={(html) => setTemplate(html)}
        variables={['firstName', 'lastName', 'companyName', 'productName']}
      />
      
      <div className="p-3 bg-gray-100 rounded">
        <p className="text-sm font-medium mb-2">Current Template Value:</p>
        <pre className="text-xs bg-white p-2 rounded overflow-auto max-h-32">
          {template}
        </pre>
      </div>
    </div>
  );
};

// With preview mode
export const WithPreview = () => {
  const [template, setTemplate] = useState('<h2>Welcome to {{companyName}}!</h2><p>Hello {{firstName}},</p><p>Thank you for your interest in our <strong>{{productName}}</strong>. We\'re excited to have you on board!</p><p>Best regards,<br>The {{companyName}} Team</p>');
  const [previewMode, setPreviewMode] = useState(false);
  const previewData = {
    firstName: 'John',
    lastName: 'Doe',
    companyName: 'Atavya',
    productName: 'Fresh UI Library',
  };
  
  return (
    <div className="space-y-4">
      <EmailTemplateEditor
        value={template}
        onChange={(html) => setTemplate(html)}
        variables={['firstName', 'lastName', 'companyName', 'productName']}
        previewMode={previewMode}
        previewData={previewData}
        onTogglePreview={() => setPreviewMode(!previewMode)}
      />
      
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          onClick={() => setPreviewMode(!previewMode)}
        >
          {previewMode ? 'Edit Template' : 'Preview Template'}
        </button>
      </div>
    </div>
  );
};

// With different variable sets
export const VariableSets = () => {
  const [activeSet, setActiveSet] = useState('customer');
  
  const variableSets = {
    customer: ['firstName', 'lastName', 'email', 'accountNumber'],
    order: ['orderNumber', 'orderDate', 'shippingAddress', 'items', 'total'],
    invoice: ['invoiceNumber', 'dueDate', 'amount', 'paymentLink'],
  };
  
  return (
    <div className="space-y-4">
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-3 py-1 rounded ${activeSet === 'customer' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveSet('customer')}
        >
          Customer Variables
        </button>
        <button
          className={`px-3 py-1 rounded ${activeSet === 'order' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveSet('order')}
        >
          Order Variables
        </button>
        <button
          className={`px-3 py-1 rounded ${activeSet === 'invoice' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveSet('invoice')}
        >
          Invoice Variables
        </button>
      </div>
      
      <EmailTemplateEditor
        placeholder="Create your email template..."
        variables={variableSets[activeSet]}
      />
    </div>
  );
};

// Email template examples
export const TemplateExamples = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('welcome');
  
  const templates = {
    welcome: '<h2>Welcome to {{companyName}}!</h2><p>Hello {{firstName}},</p><p>Thank you for signing up with <strong>{{companyName}}</strong>. We\'re excited to have you on board!</p><p>To get started, please <a href="#">click here</a> to complete your profile.</p><p>Best regards,<br>The {{companyName}} Team</p>',
    order: '<h2>Order Confirmation</h2><p>Hello {{firstName}},</p><p>Thank you for your order #{{orderNumber}}.</p><table border="1" cellpadding="5" style="border-collapse: collapse;"><tr><th>Item</th><th>Quantity</th><th>Price</th></tr><tr><td>{{productName}}</td><td>1</td><td>${{price}}</td></tr></table><p>Your order will be shipped to: {{shippingAddress}}</p><p>Best regards,<br>The {{companyName}} Team</p>',
    reset: '<h2>Password Reset</h2><p>Hello {{firstName}},</p><p>We received a request to reset your password. Please <a href="#">click here</a> to reset your password.</p><p>If you did not request a password reset, please ignore this email.</p><p>Best regards,<br>The {{companyName}} Team</p>',
  };
  
  const variables = {
    welcome: ['firstName', 'companyName'],
    order: ['firstName', 'orderNumber', 'productName', 'price', 'shippingAddress', 'companyName'],
    reset: ['firstName', 'companyName'],
  };
  
  return (
    <div className="space-y-4">
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-3 py-1 rounded ${selectedTemplate === 'welcome' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTemplate('welcome')}
        >
          Welcome Email
        </button>
        <button
          className={`px-3 py-1 rounded ${selectedTemplate === 'order' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTemplate('order')}
        >
          Order Confirmation
        </button>
        <button
          className={`px-3 py-1 rounded ${selectedTemplate === 'reset' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTemplate('reset')}
        >
          Password Reset
        </button>
      </div>
      
      <EmailTemplateEditor
        defaultValue={templates[selectedTemplate]}
        variables={variables[selectedTemplate]}
      />
    </div>
  );
};

// Email editor with specialized blocks
export const SpecializedBlocks = () => {
  const [template, setTemplate] = useState('');
  
  const insertBlock = (blockType) => {
    let blockHtml = '';
    
    switch (blockType) {
      case 'header':
        blockHtml = `
          <div style="background-color: #7E57C2; color: white; padding: 20px; text-align: center;">
            <h1>{{companyName}}</h1>
          </div>
        `;
        break;
      case 'button':
        blockHtml = `
          <div style="text-align: center; margin: 20px 0;">
            <a href="{{buttonUrl}}" style="background-color: #7E57C2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
              {{buttonText}}
            </a>
          </div>
        `;
        break;
      case 'footer':
        blockHtml = `
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px; color: #666; font-size: 12px;">
            <p>© {{currentYear}} {{companyName}}. All rights reserved.</p>
            <p>You are receiving this email because you signed up for {{companyName}}.</p>
            <p><a href="{{unsubscribeUrl}}">Unsubscribe</a></p>
          </div>
        `;
        break;
      default:
        return;
    }
    
    setTemplate(prevTemplate => prevTemplate + blockHtml);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex space-x-2 mb-4">
        <button
          className="px-3 py-1 rounded bg-primary text-white"
          onClick={() => insertBlock('header')}
        >
          Insert Header
        </button>
        <button
          className="px-3 py-1 rounded bg-primary text-white"
          onClick={() => insertBlock('button')}
        >
          Insert Button
        </button>
        <button
          className="px-3 py-1 rounded bg-primary text-white"
          onClick={() => insertBlock('footer')}
        >
          Insert Footer
        </button>
      </div>
      
      <EmailTemplateEditor
        value={template}
        onChange={(html) => setTemplate(html)}
        variables={['companyName', 'buttonUrl', 'buttonText', 'currentYear', 'unsubscribeUrl']}
      />
    </div>
  );
};

// Disabled state
export const Disabled = () => (
  <EmailTemplateEditor
    defaultValue="<p>This template cannot be edited because the editor is disabled.</p>"
    disabled
    variables={['firstName', 'lastName', 'companyName']}
  />
);

// Read-only state
export const ReadOnly = () => (
  <EmailTemplateEditor
    defaultValue="<p>This template cannot be edited because the editor is read-only.</p>"
    readOnly
    variables={['firstName', 'lastName', 'companyName']}
  />
);

// Custom styling
export const CustomStyling = () => (
  <EmailTemplateEditor
    placeholder="Create your email template..."
    className="border-2 border-primary rounded-lg"
    variables={['firstName', 'lastName', 'companyName']}
  />
);
