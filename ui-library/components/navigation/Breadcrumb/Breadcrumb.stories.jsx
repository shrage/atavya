import React from 'react';
import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';

export default {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  subcomponents: { BreadcrumbItem },
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = () => (
  <Breadcrumb>
    <BreadcrumbItem label="Home" href="/" />
    <BreadcrumbItem label="Products" href="/products" />
    <BreadcrumbItem label="Product Details" isCurrent />
  </Breadcrumb>
);

export const WithIcons = () => (
  <Breadcrumb>
    <BreadcrumbItem 
      label="Home" 
      href="/" 
      icon={
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      } 
    />
    <BreadcrumbItem 
      label="Products" 
      href="/products" 
      icon={
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      } 
    />
    <BreadcrumbItem 
      label="Laptops" 
      href="/products/laptops" 
      icon={
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      } 
    />
    <BreadcrumbItem 
      label="MacBook Pro" 
      isCurrent 
      icon={
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      } 
    />
  </Breadcrumb>
);

export const CustomSeparator = () => (
  <div className="space-y-4">
    <div>
      <h3 className="text-sm font-medium text-text-primary mb-2">Slash Separator (Default)</h3>
      <Breadcrumb separator="/">
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Products" href="/products" />
        <BreadcrumbItem label="Product Details" isCurrent />
      </Breadcrumb>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-primary mb-2">Arrow Separator</h3>
      <Breadcrumb separator="›">
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Products" href="/products" />
        <BreadcrumbItem label="Product Details" isCurrent />
      </Breadcrumb>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-primary mb-2">Angle Bracket Separator</h3>
      <Breadcrumb separator=">">
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Products" href="/products" />
        <BreadcrumbItem label="Product Details" isCurrent />
      </Breadcrumb>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-primary mb-2">Dot Separator</h3>
      <Breadcrumb separator="•">
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Products" href="/products" />
        <BreadcrumbItem label="Product Details" isCurrent />
      </Breadcrumb>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-primary mb-2">Custom SVG Separator</h3>
      <Breadcrumb 
        separator={
          <svg className="w-3 h-3 text-text-secondary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        }
      >
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Products" href="/products" />
        <BreadcrumbItem label="Product Details" isCurrent />
      </Breadcrumb>
    </div>
  </div>
);

export const WithMaxItems = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-medium text-text-primary mb-2">maxItems = 3, collapseFrom = 'center' (Default)</h3>
      <Breadcrumb maxItems={3} collapseFrom="center">
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Products" href="/products" />
        <BreadcrumbItem label="Electronics" href="/products/electronics" />
        <BreadcrumbItem label="Computers" href="/products/electronics/computers" />
        <BreadcrumbItem label="Laptops" href="/products/electronics/computers/laptops" />
        <BreadcrumbItem label="MacBook Pro" isCurrent />
      </Breadcrumb>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-primary mb-2">maxItems = 3, collapseFrom = 'start'</h3>
      <Breadcrumb maxItems={3} collapseFrom="start">
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Products" href="/products" />
        <BreadcrumbItem label="Electronics" href="/products/electronics" />
        <BreadcrumbItem label="Computers" href="/products/electronics/computers" />
        <BreadcrumbItem label="Laptops" href="/products/electronics/computers/laptops" />
        <BreadcrumbItem label="MacBook Pro" isCurrent />
      </Breadcrumb>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-primary mb-2">maxItems = 3, collapseFrom = 'end'</h3>
      <Breadcrumb maxItems={3} collapseFrom="end">
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Products" href="/products" />
        <BreadcrumbItem label="Electronics" href="/products/electronics" />
        <BreadcrumbItem label="Computers" href="/products/electronics/computers" />
        <BreadcrumbItem label="Laptops" href="/products/electronics/computers/laptops" />
        <BreadcrumbItem label="MacBook Pro" isCurrent />
      </Breadcrumb>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-primary mb-2">maxItems = 4</h3>
      <Breadcrumb maxItems={4}>
        <BreadcrumbItem label="Home" href="/" />
        <BreadcrumbItem label="Products" href="/products" />
        <BreadcrumbItem label="Electronics" href="/products/electronics" />
        <BreadcrumbItem label="Computers" href="/products/electronics/computers" />
        <BreadcrumbItem label="Laptops" href="/products/electronics/computers/laptops" />
        <BreadcrumbItem label="MacBook Pro" isCurrent />
      </Breadcrumb>
    </div>
  </div>
);

export const WithArrayItems = () => (
  <Breadcrumb
    items={[
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Product Details' },
    ]}
  />
);

export const WithArrayItemsAndIcons = () => (
  <Breadcrumb
    items={[
      { 
        label: 'Home', 
        href: '/',
        icon: (
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        )
      },
      { 
        label: 'Products', 
        href: '/products',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        )
      },
      { 
        label: 'Electronics', 
        href: '/products/electronics',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      },
      { 
        label: 'Product Details',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
    ]}
  />
);

export const WithoutHomeIcon = () => (
  <Breadcrumb showHomeIcon={false}>
    <BreadcrumbItem label="Products" href="/products" />
    <BreadcrumbItem label="Electronics" href="/products/electronics" />
    <BreadcrumbItem label="Product Details" isCurrent />
  </Breadcrumb>
);

export const CustomHomeLabel = () => (
  <Breadcrumb homeLabel="Dashboard" homeHref="/dashboard">
    <BreadcrumbItem label="Users" href="/dashboard/users" />
    <BreadcrumbItem label="User Profile" isCurrent />
  </Breadcrumb>
);

export const WithClickHandlers = () => (
  <Breadcrumb>
    <BreadcrumbItem 
      label="Home" 
      onClick={(e) => {
        e.preventDefault();
        alert('Home clicked');
      }} 
      href="/"
    />
    <BreadcrumbItem 
      label="Products" 
      onClick={(e) => {
        e.preventDefault();
        alert('Products clicked');
      }} 
      href="/products"
    />
    <BreadcrumbItem label="Product Details" isCurrent />
  </Breadcrumb>
);

export const CustomStyling = () => (
  <Breadcrumb
    className="p-3 bg-background-light rounded-lg border border-border-light"
    itemClassName="text-primary hover:text-primary-dark"
    currentItemClassName="text-text-primary font-bold"
    separatorClassName="text-text-secondary mx-3"
    separator="/"
  >
    <BreadcrumbItem label="Home" href="/" />
    <BreadcrumbItem label="Products" href="/products" />
    <BreadcrumbItem label="Electronics" href="/products/electronics" />
    <BreadcrumbItem label="Product Details" isCurrent />
  </Breadcrumb>
);

export const RealWorldExamples = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">E-commerce Product Page</h3>
      <div className="p-4 border border-border-light rounded-lg">
        <Breadcrumb 
          separator="›"
          className="mb-4"
        >
          <BreadcrumbItem label="Home" href="/" />
          <BreadcrumbItem label="Electronics" href="/electronics" />
          <BreadcrumbItem label="Computers & Tablets" href="/electronics/computers" />
          <BreadcrumbItem label="Laptops" href="/electronics/computers/laptops" />
          <BreadcrumbItem label="MacBook Pro 16-inch (2023)" isCurrent />
        </Breadcrumb>
        
        <div className="bg-background-light p-4 rounded">
          <p className="text-text-secondary text-sm">Content area for product page</p>
        </div>
      </div>
    </div>
    
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Admin Dashboard</h3>
      <div className="p-4 border border-border-light rounded-lg">
        <Breadcrumb 
          separator={
            <svg className="w-3 h-3 text-text-secondary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          }
          homeLabel="Dashboard"
          homeHref="/dashboard"
          className="mb-4"
        >
          <BreadcrumbItem 
            label="Users" 
            href="/dashboard/users" 
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
          <BreadcrumbItem 
            label="John Doe" 
            isCurrent 
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
        </Breadcrumb>
        
        <div className="bg-background-light p-4 rounded">
          <p className="text-text-secondary text-sm">Content area for user profile page</p>
        </div>
      </div>
    </div>
    
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Documentation Site</h3>
      <div className="p-4 border border-border-light rounded-lg">
        <Breadcrumb 
          className="mb-4"
          itemClassName="text-primary hover:underline"
          maxItems={4}
        >
          <BreadcrumbItem label="Docs" href="/docs" />
          <BreadcrumbItem label="Components" href="/docs/components" />
          <BreadcrumbItem label="UI Elements" href="/docs/components/ui-elements" />
          <BreadcrumbItem label="Navigation" href="/docs/components/ui-elements/navigation" />
          <BreadcrumbItem label="Breadcrumb" isCurrent />
        </Breadcrumb>
        
        <div className="bg-background-light p-4 rounded">
          <p className="text-text-secondary text-sm">Content area for documentation page</p>
        </div>
      </div>
    </div>
  </div>
);

export const ProductCategoryNavigation = () => (
  <div className="max-w-4xl mx-auto">
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-text-primary mb-2">Product Categories</h2>
      <p className="text-text-secondary">Browse our extensive collection of products by category.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="border border-border-light rounded-lg overflow-hidden">
        <div className="h-40 bg-background-light flex items-center justify-center">
          <svg className="w-16 h-16 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="p-4">
          <Breadcrumb 
            className="mb-3"
            separator="›"
            separatorClassName="text-text-secondary mx-1"
          >
            <BreadcrumbItem label="Electronics" href="/electronics" />
            <BreadcrumbItem label="Computers" href="/electronics/computers" />
            <BreadcrumbItem label="Laptops" isCurrent />
          </Breadcrumb>
          <h3 className="text-lg font-medium text-text-primary mb-2">Laptops</h3>
          <p className="text-text-secondary text-sm mb-3">
            Browse our selection of laptops from top brands.
          </p>
          <button className="text-primary hover:text-primary-dark text-sm font-medium">
            View Products →
          </button>
        </div>
      </div>
      
      <div className="border border-border-light rounded-lg overflow-hidden">
        <div className="h-40 bg-background-light flex items-center justify-center">
          <svg className="w-16 h-16 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="p-4">
          <Breadcrumb 
            className="mb-3"
            separator="›"
            separatorClassName="text-text-secondary mx-1"
          >
            <BreadcrumbItem label="Electronics" href="/electronics" />
            <BreadcrumbItem label="Phones" href="/electronics/phones" />
            <BreadcrumbItem label="Smartphones" isCurrent />
          </Breadcrumb>
          <h3 className="text-lg font-medium text-text-primary mb-2">Smartphones</h3>
          <p className="text-text-secondary text-sm mb-3">
            Discover the latest smartphones with cutting-edge features.
          </p>
          <button className="text-primary hover:text-primary-dark text-sm font-medium">
            View Products →
          </button>
        </div>
      </div>
      
      <div className="border border-border-light rounded-lg overflow-hidden">
        <div className="h-40 bg-background-light flex items-center justify-center">
          <svg className="w-16 h-16 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="p-4">
          <Breadcrumb 
            className="mb-3"
            separator="›"
            separatorClassName="text-text-secondary mx-1"
          >
            <BreadcrumbItem label="Electronics" href="/electronics" />
            <BreadcrumbItem label="Smart Home" href="/electronics/smart-home" />
            <BreadcrumbItem label="Lighting" isCurrent />
          </Breadcrumb>
          <h3 className="text-lg font-medium text-text-primary mb-2">Smart Lighting</h3>
          <p className="text-text-secondary text-sm mb-3">
            Control your home lighting with smart bulbs and systems.
          </p>
          <button className="text-primary hover:text-primary-dark text-sm font-medium">
            View Products →
          </button>
        </div>
      </div>
    </div>
  </div>
);
