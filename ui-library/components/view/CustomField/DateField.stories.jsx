import React from 'react';
import DateField from './DateField';

export default {
  title: "View/DateField",
  component: DateField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    id: 'default-date',
    label: 'Due Date',
    placeholder: 'Select a date',
  },
};

export const WithValue = {
  args: {
    id: 'date-with-value',
    label: 'Event Date',
    value: '2025-04-15',
    placeholder: 'Select a date',
  },
};

export const Required = {
  args: {
    id: 'required-date',
    label: 'Delivery Date',
    placeholder: 'Select a date',
    required: true,
  },
};

export const WithError = {
  args: {
    id: 'date-with-error',
    label: 'Booking Date',
    value: '2025-01-01',
    error: 'Date must be in the future',
    placeholder: 'Select a date',
  },
};

export const WithMinMax = {
  args: {
    id: 'date-with-range',
    label: 'Meeting Date',
    placeholder: 'Select a date',
    min: '2025-03-01',
    max: '2025-06-30',
  },
};

export const Disabled = {
  args: {
    id: 'disabled-date',
    label: 'Registration Date',
    value: '2025-03-25',
    disabled: true,
  },
};

export const Variants = () => (
  <div className="space-y-4 w-80">
    <DateField
      id="outlined-date"
      label="Outlined Variant (Default)"
      variant="outlined"
      placeholder="Select a date"
    />
    <DateField
      id="filled-date"
      label="Filled Variant"
      variant="filled"
      placeholder="Select a date"
    />
    <DateField
      id="plain-date"
      label="Plain Variant"
      variant="plain"
      placeholder="Select a date"
    />
  </div>
);

export const Sizes = () => (
  <div className="space-y-4 w-80">
    <DateField
      id="small-date"
      label="Small Size"
      size="small"
      placeholder="Select a date"
    />
    <DateField
      id="medium-date"
      label="Medium Size (Default)"
      size="medium"
      placeholder="Select a date"
    />
    <DateField
      id="large-date"
      label="Large Size"
      size="large"
      placeholder="Select a date"
    />
  </div>
);

export const InlineEdit = {
  args: {
    id: 'inline-edit-date',
    label: 'Inline Editable Date',
    value: '2025-04-01',
    inlineEdit: true,
  },
};

// Real-world examples
export const EventRegistrationForm = () => (
  <div className="w-full max-w-md p-6 bg-background-light rounded-lg border border-border-light">
    <h2 className="text-xl font-semibold mb-4 text-text-primary">Event Registration</h2>
    <p className="mb-6 text-text-secondary">Please complete the form to register for the conference</p>
    
    <div className="space-y-5">
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-primary mb-1">First Name</label>
            <input 
              type="text" 
              className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
              placeholder="John"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-primary mb-1">Last Name</label>
            <input 
              type="text" 
              className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
              placeholder="Doe"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
          <input 
            type="email" 
            className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
            placeholder="john.doe@example.com"
          />
        </div>
        
        <DateField
          id="event-attendance-date"
          label="Attendance Date"
          required
          min="2025-05-15"
          max="2025-05-17"
          description="Conference runs from May 15-17, 2025"
        />
        
        <DateField
          id="event-arrival-date"
          label="Hotel Check-in Date"
          placeholder="Select arrival date"
          min="2025-05-14"
          max="2025-05-16"
        />
        
        <DateField
          id="event-departure-date"
          label="Hotel Check-out Date"
          placeholder="Select departure date"
          min="2025-05-15"
          max="2025-05-18"
        />
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Special Requirements</label>
          <textarea 
            className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
            rows="2"
            placeholder="Any dietary restrictions or accessibility needs"
          />
        </div>
      </div>
      
      <div className="pt-4 border-t border-border-light">
        <div className="flex items-center">
          <input 
            type="checkbox" 
            className="h-4 w-4 text-primary border-border-medium rounded focus:ring-primary" 
          />
          <span className="ml-2 text-text-secondary text-sm">I agree to the event terms and conditions</span>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button className="px-4 py-2 border border-border-light rounded text-text-secondary hover:bg-background-light">
          Cancel
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Register
        </button>
      </div>
    </div>
  </div>
);

export const ProjectSchedule = () => (
  <div className="w-full max-w-md p-6 bg-background-light rounded-lg border border-border-light">
    <h2 className="text-xl font-semibold mb-4 text-text-primary">Project Timeline</h2>
    
    <div className="space-y-6">
      <div className="p-4 bg-white rounded border border-border-light">
        <h3 className="font-medium text-text-primary mb-3">Design Phase</h3>
        <div className="space-y-3">
          <DateField
            id="project-kickoff"
            label="Kickoff Meeting"
            value="2025-04-01"
            labelPosition="inline"
            inlineEdit={true}
          />
          
          <DateField
            id="project-wireframes"
            label="Wireframes Due"
            value="2025-04-10"
            labelPosition="inline"
            inlineEdit={true}
          />
          
          <DateField
            id="project-design-review"
            label="Design Review"
            value="2025-04-15"
            labelPosition="inline"
            inlineEdit={true}
          />
        </div>
      </div>
      
      <div className="p-4 bg-white rounded border border-border-light">
        <h3 className="font-medium text-text-primary mb-3">Development Phase</h3>
        <div className="space-y-3">
          <DateField
            id="project-dev-start"
            label="Development Start"
            value="2025-04-20"
            labelPosition="inline"
            inlineEdit={true}
          />
          
          <DateField
            id="project-first-milestone"
            label="First Milestone"
            value="2025-05-05"
            labelPosition="inline"
            inlineEdit={true}
          />
          
          <DateField
            id="project-code-freeze"
            label="Code Freeze"
            value="2025-05-20"
            labelPosition="inline"
            inlineEdit={true}
            error="Date conflicts with QA schedule"
          />
        </div>
      </div>
      
      <div className="p-4 bg-white rounded border border-border-light">
        <h3 className="font-medium text-text-primary mb-3">Testing & Launch</h3>
        <div className="space-y-3">
          <DateField
            id="project-qa-start"
            label="QA Testing"
            value="2025-05-15"
            labelPosition="inline"
            inlineEdit={true}
          />
          
          <DateField
            id="project-beta-release"
            label="Beta Release"
            value="2025-05-25"
            labelPosition="inline"
            inlineEdit={true}
          />
          
          <DateField
            id="project-launch"
            label="Product Launch"
            value="2025-06-01"
            labelPosition="inline"
            inlineEdit={true}
          />
        </div>
      </div>
    </div>
    
    <div className="mt-6 flex justify-between items-center">
      <div className="text-text-secondary text-sm">
        <span className="font-medium text-primary">Project Duration:</span> 2 months
      </div>
      <button className="px-3 py-1.5 bg-primary/10 text-primary rounded hover:bg-primary/20">
        Export Schedule
      </button>
    </div>
  </div>
);

export const TravelBookingForm = () => (
  <div className="w-full max-w-md p-6 bg-background-light rounded-lg border border-border-light">
    <h2 className="text-xl font-semibold mb-4 text-text-primary">Flight Booking</h2>
    
    <div className="space-y-5">
      <div className="flex space-x-4">
        <button className="flex-1 py-2 bg-primary text-white rounded-md">Round Trip</button>
        <button className="flex-1 py-2 border border-border-light text-text-secondary rounded-md">One Way</button>
        <button className="flex-1 py-2 border border-border-light text-text-secondary rounded-md">Multi-City</button>
      </div>
      
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-primary mb-1">From</label>
            <input 
              type="text" 
              className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
              placeholder="City or Airport"
              defaultValue="New York (JFK)"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-primary mb-1">To</label>
            <input 
              type="text" 
              className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary" 
              placeholder="City or Airport"
              defaultValue="San Francisco (SFO)"
            />
          </div>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <DateField
              id="travel-departure"
              label="Departure"
              value="2025-05-15"
              min="2025-04-01"
              required
            />
          </div>
          <div className="flex-1">
            <DateField
              id="travel-return"
              label="Return"
              value="2025-05-22"
              min="2025-05-15"
              required
            />
          </div>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-primary mb-1">Passengers</label>
            <select className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary">
              <option>1 Adult</option>
              <option>2 Adults</option>
              <option>3 Adults</option>
              <option>4 Adults</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-primary mb-1">Class</label>
            <select className="w-full p-2 border border-border-light rounded text-text-primary focus:border-primary focus:ring-1 focus:ring-primary">
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
              <option>First</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <div className="flex items-center">
          <input 
            type="checkbox" 
            className="h-4 w-4 text-primary border-border-medium rounded focus:ring-primary" 
            defaultChecked
          />
          <span className="ml-2 text-text-secondary text-sm">Show flexible dates (±3 days)</span>
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <button className="px-6 py-2.5 bg-primary text-white rounded hover:bg-primary-dark">
          Search Flights
        </button>
      </div>
    </div>
  </div>
);
