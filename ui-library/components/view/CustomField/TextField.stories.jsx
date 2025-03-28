import React from 'react';
import TextField from './TextField';

export default {
  title: "View/TextField",
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    id: 'default-text',
    label: 'Name',
    placeholder: 'Enter your name',
  },
};

export const WithValue = {
  args: {
    id: 'text-with-value',
    label: 'Full Name',
    value: 'John Doe',
    placeholder: 'Enter your full name',
  },
};

export const Required = {
  args: {
    id: 'required-text',
    label: 'Email Address',
    placeholder: 'Enter your email',
    required: true,
  },
};

export const WithError = {
  args: {
    id: 'text-with-error',
    label: 'Username',
    value: 'j',
    error: 'Username must be at least 3 characters',
    placeholder: 'Choose a username',
  },
};

export const WithCharacterCount = {
  args: {
    id: 'text-with-maxlength',
    label: 'Tweet',
    placeholder: 'What\'s happening?',
    maxLength: 280,
  },
};

export const Disabled = {
  args: {
    id: 'disabled-text',
    label: 'Read-only Field',
    value: 'This field cannot be edited',
    disabled: true,
  },
};

export const Variants = () => (
  <div className="space-y-4 w-80">
    <TextField
      id="outlined-text"
      label="Outlined Variant (Default)"
      variant="outlined"
      placeholder="Outlined input"
    />
    <TextField
      id="filled-text"
      label="Filled Variant"
      variant="filled"
      placeholder="Filled input"
    />
    <TextField
      id="plain-text"
      label="Plain Variant"
      variant="plain"
      placeholder="Plain input"
    />
  </div>
);

export const Sizes = () => (
  <div className="space-y-4 w-80">
    <TextField
      id="small-text"
      label="Small Size"
      size="small"
      placeholder="Small input"
    />
    <TextField
      id="medium-text"
      label="Medium Size (Default)"
      size="medium"
      placeholder="Medium input"
    />
    <TextField
      id="large-text"
      label="Large Size"
      size="large"
      placeholder="Large input"
    />
  </div>
);

export const InlineEdit = {
  args: {
    id: 'inline-edit-text',
    label: 'Inline Editable Field',
    value: 'Click to edit this text',
    inlineEdit: true,
  },
};

// Real-world examples
export const ContactForm = () => (
  <div className="w-full max-w-md p-6 bg-background-light rounded-lg border border-border-light">
    <h2 className="text-xl font-semibold mb-4 text-text-primary">Contact Us</h2>
    <p className="mb-6 text-text-secondary">We'd love to hear from you. Please fill out the form below.</p>
    
    <div className="space-y-5">
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <TextField
              id="contact-first-name"
              label="First Name"
              placeholder="John"
              required
            />
          </div>
          <div className="flex-1">
            <TextField
              id="contact-last-name"
              label="Last Name"
              placeholder="Doe"
              required
            />
          </div>
        </div>
        
        <TextField
          id="contact-email"
          label="Email Address"
          placeholder="john.doe@example.com"
          required
          type="email"
        />
        
        <TextField
          id="contact-phone"
          label="Phone Number"
          placeholder="(123) 456-7890"
          description="Optional, but helpful if we need to call you"
        />
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Message</label>
          <textarea 
            className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
            rows="4"
            placeholder="How can we help you?"
          />
        </div>
      </div>
      
      <div className="pt-4 border-t border-border-light">
        <div className="flex items-center">
          <input 
            type="checkbox" 
            className="h-4 w-4 text-primary border-border-medium rounded focus:ring-primary" 
          />
          <span className="ml-2 text-text-secondary text-sm">Subscribe to our newsletter</span>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button className="px-4 py-2 border border-border-light rounded text-text-secondary hover:bg-background-light">
          Reset
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Submit
        </button>
      </div>
    </div>
  </div>
);

export const SearchAndFilterBar = () => (
  <div className="w-full max-w-4xl p-4 bg-background-light rounded-lg border border-border-light">
    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
      <div className="flex-1">
        <TextField
          id="search-products"
          placeholder="Search products..."
          leadingIcon={
            <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
      </div>
      
      <div className="flex space-x-2">
        <div className="w-40">
          <select className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Home & Kitchen</option>
          </select>
        </div>
        
        <div className="w-40">
          <select className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary">
            <option>Sort by: Relevance</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>
        </div>
        
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Search
        </button>
      </div>
    </div>
    
    <div className="flex flex-wrap gap-2 mt-3">
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-background-light border border-border-light text-text-secondary">
        Under $50
        <button className="ml-1 text-text-secondary hover:text-status-error">×</button>
      </span>
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-background-light border border-border-light text-text-secondary">
        In Stock
        <button className="ml-1 text-text-secondary hover:text-status-error">×</button>
      </span>
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
        Free Shipping
        <button className="ml-1 text-primary hover:text-primary-dark">×</button>
      </span>
      <button className="text-sm text-primary hover:text-primary-dark">
        Clear All Filters
      </button>
    </div>
  </div>
);

export const ProfileEditor = () => (
  <div className="w-full max-w-md p-6 bg-background-light rounded-lg border border-border-light">
    <div className="flex items-center mb-6">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-semibold mr-4">
        AJ
      </div>
      <div>
        <h2 className="text-xl font-semibold text-text-primary">Profile Settings</h2>
        <p className="text-text-secondary">Update your personal information</p>
      </div>
    </div>
    
    <div className="space-y-5">
      <TextField
        id="profile-display-name"
        label="Display Name"
        value="Alex Johnson"
        required
        description="This is how your name will appear across the platform"
      />
      
      <TextField
        id="profile-username"
        label="Username"
        value="alexj"
        required
        leadingText="@"
        description="Your unique username for mentions and your profile URL"
      />
      
      <TextField
        id="profile-email"
        label="Email Address"
        value="alex.johnson@example.com"
        type="email"
        required
      />
      
      <TextField
        id="profile-website"
        label="Website"
        value="https://alexjohnson.design"
        placeholder="https://example.com"
        type="url"
      />
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">Bio</label>
        <textarea 
          className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
          rows="3"
          placeholder="Tell us about yourself"
          defaultValue="Product designer with 8+ years of experience creating user-centered digital experiences. Passionate about accessibility and inclusive design."
          maxLength={160}
        />
        <div className="text-xs text-text-secondary mt-1 text-right">160 characters maximum</div>
      </div>
      
      <div className="pt-5 border-t border-border-light">
        <h3 className="font-medium text-text-primary mb-3">Social Profiles</h3>
        
        <div className="space-y-3">
          <TextField
            id="profile-twitter"
            label="Twitter"
            value="@alexjdesign"
            leadingIcon={
              <span className="text-primary">𝕏</span>
            }
          />
          
          <TextField
            id="profile-linkedin"
            label="LinkedIn"
            value="alex-johnson-design"
            leadingIcon={
              <span className="text-primary">in</span>
            }
          />
          
          <TextField
            id="profile-github"
            label="GitHub"
            placeholder="Your GitHub username"
            leadingIcon={
              <span>🐙</span>
            }
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button className="px-4 py-2 border border-border-light rounded text-text-secondary hover:bg-background-light">
          Cancel
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Save Changes
        </button>
      </div>
    </div>
  </div>
);

export const PaymentForm = () => (
  <div className="w-full max-w-md p-6 bg-background-light rounded-lg border border-border-light">
    <h2 className="text-xl font-semibold mb-4 text-text-primary">Payment Information</h2>
    <p className="mb-6 text-text-secondary">Enter your payment details to complete your purchase</p>
    
    <div className="space-y-5">
      <div className="p-3 bg-status-info/10 border border-status-info/30 rounded text-status-info text-sm mb-4">
        Your payment information is encrypted and secure. We never store your full card details.
      </div>
      
      <TextField
        id="payment-cardholder"
        label="Cardholder Name"
        placeholder="Name as it appears on card"
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">Card Number</label>
        <div className="relative">
          <input 
            type="text" 
            className="w-full p-2 pl-10 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
            placeholder="1234 5678 9012 3456"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
            💳
          </div>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
            <span className="text-primary">Visa</span>
            <span className="text-text-secondary">MC</span>
            <span className="text-text-secondary">Amex</span>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-text-primary mb-1">Expiration Date</label>
          <input 
            type="text" 
            className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
            placeholder="MM/YY"
          />
        </div>
        <div className="w-24">
          <label className="block text-sm font-medium text-text-primary mb-1">CVC</label>
          <div className="relative">
            <input 
              type="text" 
              className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
              placeholder="123"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary text-xs">
              ?
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-border-light">
        <div className="flex justify-between mb-2">
          <span className="text-text-secondary">Subtotal</span>
          <span className="text-text-primary">$89.99</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-text-secondary">Tax</span>
          <span className="text-text-primary">$7.20</span>
        </div>
        <div className="flex justify-between font-medium">
          <span className="text-text-primary">Total</span>
          <span className="text-text-primary">$97.19</span>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button className="px-4 py-2 border border-border-light rounded text-text-secondary hover:bg-background-light">
          Cancel
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Pay Now
        </button>
      </div>
    </div>
  </div>
);
