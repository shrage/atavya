import React from 'react';
import Card from './Card';
import Button from '../../core/form-controls/Button';

export default {
  title: "Layout/Card",
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

// Basic card with default settings
export const Default = () => (
  <Card>
    <Card.Body>
      <Card.Title>Default Card</Card.Title>
      <Card.Text>This is a basic card with default settings.</Card.Text>
    </Card.Body>
  </Card>
);

// Different variants
export const Variants = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Card variant="default">
      <Card.Body>
        <Card.Title>Default</Card.Title>
        <Card.Text>Standard white background</Card.Text>
      </Card.Body>
    </Card>
    
    <Card variant="primary">
      <Card.Body>
        <Card.Title>Primary</Card.Title>
        <Card.Text>Primary theme color background</Card.Text>
      </Card.Body>
    </Card>
    
    <Card variant="secondary">
      <Card.Body>
        <Card.Title>Secondary</Card.Title>
        <Card.Text>Secondary theme color background</Card.Text>
      </Card.Body>
    </Card>
    
    <Card variant="success">
      <Card.Body>
        <Card.Title>Success</Card.Title>
        <Card.Text>Success status color background</Card.Text>
      </Card.Body>
    </Card>
    
    <Card variant="warning">
      <Card.Body>
        <Card.Title>Warning</Card.Title>
        <Card.Text>Warning status color background</Card.Text>
      </Card.Body>
    </Card>
    
    <Card variant="danger">
      <Card.Body>
        <Card.Title>Danger</Card.Title>
        <Card.Text>Danger status color background</Card.Text>
      </Card.Body>
    </Card>
    
    <Card variant="info">
      <Card.Body>
        <Card.Title>Info</Card.Title>
        <Card.Text>Info status color background</Card.Text>
      </Card.Body>
    </Card>
    
    <Card variant="light">
      <Card.Body>
        <Card.Title>Light</Card.Title>
        <Card.Text>Light background color</Card.Text>
      </Card.Body>
    </Card>
  </div>
);

// Different sizes
export const Sizes = () => (
  <div className="space-y-4">
    <Card size="sm">
      <Card.Body>
        <Card.Title>Small Card</Card.Title>
        <Card.Text>This is a small card with compact padding.</Card.Text>
      </Card.Body>
    </Card>
    
    <Card size="md">
      <Card.Body>
        <Card.Title>Medium Card (Default)</Card.Title>
        <Card.Text>This is a medium card with standard padding.</Card.Text>
      </Card.Body>
    </Card>
    
    <Card size="lg">
      <Card.Body>
        <Card.Title>Large Card</Card.Title>
        <Card.Text>This is a large card with spacious padding.</Card.Text>
      </Card.Body>
    </Card>
  </div>
);

// Card with all sections
export const WithAllSections = () => (
  <Card>
    <Card.Header>
      <Card.Title>Card with All Sections</Card.Title>
    </Card.Header>
    <Card.Image src="https://via.placeholder.com/800x400" alt="Placeholder" />
    <Card.Body>
      <Card.Text>This card demonstrates all available sections: header, image, body, and footer.</Card.Text>
    </Card.Body>
    <Card.Footer>
      <Button variant="primary">Action</Button>
      <Button variant="secondary">Cancel</Button>
    </Card.Footer>
  </Card>
);

// With image
export const WithImage = () => (
  <div className="space-y-4">
    <Card>
      <Card.Image src="https://via.placeholder.com/800x400" alt="Placeholder" />
      <Card.Body>
        <Card.Title>Card with Image</Card.Title>
        <Card.Text>This card has an image at the top.</Card.Text>
      </Card.Body>
    </Card>
    
    <Card>
      <Card.Body>
        <Card.Title>Card with Image</Card.Title>
        <Card.Text>This card has an image at the bottom.</Card.Text>
      </Card.Body>
      <Card.Image src="https://via.placeholder.com/800x400" alt="Placeholder" />
    </Card>
  </div>
);

// Horizontal layout
export const HorizontalLayout = () => (
  <Card layout="horizontal">
    <Card.Image 
      src="https://via.placeholder.com/400x400" 
      alt="Placeholder" 
      className="w-1/3"
    />
    <Card.Body>
      <Card.Title>Horizontal Card</Card.Title>
      <Card.Text>
        This card uses a horizontal layout with the image on the left and content on the right.
        This is useful for media listings, user profiles, and other content where the image
        should be displayed alongside the text.
      </Card.Text>
    </Card.Body>
  </Card>
);

// Styling variations
export const StylingVariations = () => (
  <div className="space-y-4">
    {/* Elevated card */}
    <Card className="shadow-lg">
      <Card.Body>
        <Card.Title>Elevated Card</Card.Title>
        <Card.Text>This card has a larger shadow for a more elevated appearance.</Card.Text>
      </Card.Body>
    </Card>
    
    {/* Bordered card */}
    <Card className="border-2 border-primary">
      <Card.Body>
        <Card.Title>Bordered Card</Card.Title>
        <Card.Text>This card has a custom border using the primary theme color.</Card.Text>
      </Card.Body>
    </Card>
    
    {/* Rounded card */}
    <Card className="rounded-3xl overflow-hidden">
      <Card.Body>
        <Card.Title>Rounded Card</Card.Title>
        <Card.Text>This card has extra rounded corners.</Card.Text>
      </Card.Body>
    </Card>
    
    {/* Flat card */}
    <Card className="shadow-none border-0 bg-background-skeleton">
      <Card.Body>
        <Card.Title>Flat Card</Card.Title>
        <Card.Text>This card has no shadow or border, just a background color.</Card.Text>
      </Card.Body>
    </Card>
    
    {/* Gradient background */}
    <Card className="bg-gradient-to-r from-primary to-primary-light text-white">
      <Card.Body>
        <Card.Title>Gradient Card</Card.Title>
        <Card.Text>This card has a gradient background using theme colors.</Card.Text>
      </Card.Body>
    </Card>
  </div>
);

// Custom styling
export const CustomStyling = () => (
  <div className="space-y-4">
    <Card>
      <Card.Body className="bg-background-skeleton">
        <Card.Title className="text-primary text-xl font-bold">Custom Title</Card.Title>
        <Card.Text className="text-text-secondary italic">
          This card has custom styling applied to its components.
        </Card.Text>
      </Card.Body>
      <Card.Footer className="bg-primary bg-opacity-10 border-t border-primary">
        <Button variant="primary">Primary Action</Button>
        <Button variant="secondary">Secondary Action</Button>
      </Card.Footer>
    </Card>
    
    <Card className="border-l-4 border-l-status-campaign">
      <Card.Body>
        <Card.Title>Left Accent Card</Card.Title>
        <Card.Text>This card has a colored accent on the left border.</Card.Text>
      </Card.Body>
    </Card>
  </div>
);

// Real-world examples
export const RealWorldExamples = () => (
  <div className="space-y-8">
    {/* Product card */}
    <Card className="max-w-sm mx-auto overflow-hidden">
      <Card.Image src="https://via.placeholder.com/400x300" alt="Product" />
      <Card.Body>
        <div className="flex justify-between items-start mb-2">
          <Card.Title>Premium Headphones</Card.Title>
          <span className="text-primary font-bold">$299</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="flex text-status-campaign">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-text-secondary text-sm ml-2">(128 reviews)</span>
        </div>
        <Card.Text className="text-text-secondary mb-4">
          Wireless noise-cancelling headphones with premium sound quality and 30-hour battery life.
        </Card.Text>
        <Button variant="primary" className="w-full">Add to Cart</Button>
      </Card.Body>
    </Card>
    
    {/* User profile card */}
    <Card layout="horizontal" className="max-w-md mx-auto">
      <div className="w-1/3 flex-shrink-0">
        <img 
          src="https://via.placeholder.com/300x300" 
          alt="User" 
          className="w-full h-full object-cover"
        />
      </div>
      <Card.Body>
        <Card.Title>Jane Smith</Card.Title>
        <p className="text-text-secondary text-sm mb-2">Product Designer</p>
        <div className="flex items-center mb-3">
          <span className="inline-block bg-status-campaign bg-opacity-20 text-status-campaign text-xs px-2 py-1 rounded-full">
            Pro Member
          </span>
        </div>
        <Card.Text className="text-text-secondary mb-3">
          Passionate about creating intuitive user experiences and beautiful interfaces.
        </Card.Text>
        <div className="flex space-x-2">
          <Button variant="primary" size="sm">Follow</Button>
          <Button variant="secondary" size="sm">Message</Button>
        </div>
      </Card.Body>
    </Card>
    
    {/* Blog post card */}
    <Card className="max-w-lg mx-auto">
      <Card.Image src="https://via.placeholder.com/800x400" alt="Blog post" />
      <Card.Body>
        <div className="flex items-center mb-2">
          <span className="text-text-secondary text-sm">Mar 26, 2025</span>
          <span className="mx-2 text-text-tertiary">•</span>
          <span className="text-primary text-sm">Design</span>
        </div>
        <Card.Title className="text-xl mb-2">The Future of UI Design in 2025</Card.Title>
        <Card.Text className="text-text-secondary mb-4">
          Exploring the latest trends in user interface design and how they will shape the digital products of tomorrow.
        </Card.Text>
        <div className="flex items-center">
          <img 
            src="https://via.placeholder.com/40x40" 
            alt="Author" 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="text-text-primary font-medium">Alex Johnson</p>
            <p className="text-text-tertiary text-sm">5 min read</p>
          </div>
        </div>
      </Card.Body>
    </Card>
    
    {/* Dashboard card */}
    <Card className="max-w-sm mx-auto">
      <Card.Body>
        <div className="flex justify-between items-center mb-4">
          <Card.Title>Monthly Revenue</Card.Title>
          <div className="bg-status-campaign bg-opacity-10 text-status-campaign text-sm px-2 py-1 rounded">
            +12.5%
          </div>
        </div>
        <div className="text-3xl font-bold mb-4">$24,345</div>
        <div className="w-full bg-background-skeleton h-2 rounded-full mb-4">
          <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
        </div>
        <div className="flex justify-between text-text-secondary text-sm">
          <span>Target: $30,000</span>
          <span>65% achieved</span>
        </div>
      </Card.Body>
    </Card>
  </div>
);
