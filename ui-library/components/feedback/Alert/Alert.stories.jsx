import React, { useState } from 'react';
import Alert from './Alert';
import Button from '../../core/form-controls/Button';

export default {
  title: "Feedback/Alert",
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

// Basic alert with default settings (info variant)
export const Default = () => (
  <Alert>This is a default info alert with important information.</Alert>
);

// Different variants
export const Variants = () => (
  <div className="space-y-4">
    <Alert variant="info">
      This is an info alert with important information.
    </Alert>
    
    <Alert variant="success">
      This is a success alert. Your operation was completed successfully.
    </Alert>
    
    <Alert variant="warning">
      This is a warning alert. Proceed with caution.
    </Alert>
    
    <Alert variant="danger">
      This is a danger alert. Something went wrong!
    </Alert>
    
    <Alert variant="light">
      This is a light alert with minimal emphasis.
    </Alert>
    
    <Alert variant="dark">
      This is a dark alert for high contrast.
    </Alert>
  </div>
);

// Alerts with titles
export const WithTitle = () => (
  <div className="space-y-4">
    <Alert 
      title="Information"
      variant="info"
    >
      This is an alert with a title above the content.
    </Alert>
    
    <Alert 
      title="Success"
      variant="success"
    >
      Your data has been successfully saved to the database.
    </Alert>
    
    <Alert 
      title="Warning"
      variant="warning"
    >
      Your subscription will expire in 7 days. Please renew to avoid service interruption.
    </Alert>
    
    <Alert 
      title="Error"
      variant="danger"
    >
      We couldn't process your request. Please check your input and try again.
    </Alert>
  </div>
);

// Without icons
export const IconOptions = () => (
  <div className="space-y-4">
    <div>
      <h3 className="text-text-secondary text-sm font-medium mb-2">Default Icons</h3>
      <div className="space-y-2">
        <Alert variant="info">With default info icon</Alert>
        <Alert variant="success">With default success icon</Alert>
        <Alert variant="warning">With default warning icon</Alert>
        <Alert variant="danger">With default danger icon</Alert>
      </div>
    </div>
    
    <div>
      <h3 className="text-text-secondary text-sm font-medium mb-2">Without Icons</h3>
      <Alert showIcon={false}>This alert has no icon.</Alert>
    </div>
    
    <div>
      <h3 className="text-text-secondary text-sm font-medium mb-2">Custom Icon</h3>
      <Alert 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        }
      >
        This alert has a custom icon.
      </Alert>
    </div>
  </div>
);

// Closable alerts
export const Closable = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, variant: 'info', message: 'This is a closable info alert.' },
    { id: 2, variant: 'success', message: 'This is a closable success alert.' },
    { id: 3, variant: 'warning', message: 'This is a closable warning alert.' },
    { id: 4, variant: 'danger', message: 'This is a closable danger alert.' },
  ]);

  const handleClose = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const resetAlerts = () => {
    setAlerts([
      { id: 1, variant: 'info', message: 'This is a closable info alert.' },
      { id: 2, variant: 'success', message: 'This is a closable success alert.' },
      { id: 3, variant: 'warning', message: 'This is a closable warning alert.' },
      { id: 4, variant: 'danger', message: 'This is a closable danger alert.' },
    ]);
  };

  return (
    <div className="space-y-4">
      {alerts.length > 0 ? (
        <div className="space-y-2">
          {alerts.map(alert => (
            <Alert 
              key={alert.id}
              variant={alert.variant}
              closable
              onClose={() => handleClose(alert.id)}
            >
              {alert.message}
            </Alert>
          ))}
        </div>
      ) : (
        <div className="text-text-secondary">
          All alerts have been closed. Click the button below to reset.
        </div>
      )}
      
      <Button 
        variant="primary"
        onClick={resetAlerts}
        className="mt-4"
      >
        Reset Alerts
      </Button>
    </div>
  );
};

// Auto-closing alerts
export const AutoClose = () => {
  const [alerts, setAlerts] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addAlert = (variant) => {
    const id = nextId;
    setNextId(id + 1);
    
    const newAlert = {
      id,
      variant,
      message: `This ${variant} alert will auto-close in 5 seconds.`,
    };
    
    setAlerts([...alerts, newAlert]);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
      setAlerts(currentAlerts => currentAlerts.filter(alert => alert.id !== id));
    }, 5000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="primary" onClick={() => addAlert('info')}>Add Info Alert</Button>
        <Button variant="success" onClick={() => addAlert('success')}>Add Success Alert</Button>
        <Button variant="warning" onClick={() => addAlert('warning')}>Add Warning Alert</Button>
        <Button variant="danger" onClick={() => addAlert('danger')}>Add Danger Alert</Button>
      </div>
      
      <div className="space-y-2 mt-4">
        {alerts.map(alert => (
          <Alert 
            key={alert.id}
            variant={alert.variant}
            closable
            onClose={() => setAlerts(alerts.filter(a => a.id !== alert.id))}
          >
            {alert.message}
          </Alert>
        ))}
        
        {alerts.length === 0 && (
          <div className="text-text-secondary">
            Click the buttons above to add auto-closing alerts.
          </div>
        )}
      </div>
    </div>
  );
};

// Styled alerts
export const StyledAlerts = () => (
  <div className="space-y-4">
    <Alert 
      variant="info" 
      className="border-l-4 border-l-primary rounded-none"
    >
      Alert with left border accent
    </Alert>
    
    <Alert 
      variant="success" 
      className="bg-status-success/10 border border-status-success"
    >
      Custom styled success alert
    </Alert>
    
    <Alert 
      variant="warning" 
      className="rounded-xl shadow-md"
    >
      Alert with rounded corners and shadow
    </Alert>
    
    <Alert 
      variant="danger" 
      className="font-bold"
    >
      Alert with bold text for emphasis
    </Alert>
  </div>
);

// Complex content in alerts
export const ComplexContent = () => (
  <div className="space-y-4">
    <Alert variant="info">
      <div className="flex flex-col space-y-2">
        <h3 className="font-medium">Your account needs verification</h3>
        <p>Please verify your email address to unlock all features.</p>
        <div className="flex space-x-2 mt-2">
          <Button variant="primary" size="sm">Verify Email</Button>
          <Button variant="secondary" size="sm">Remind Me Later</Button>
        </div>
      </div>
    </Alert>
    
    <Alert variant="success">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">File uploaded successfully</p>
          <p className="text-text-secondary text-sm">document.pdf (2.4 MB)</p>
        </div>
        <Button variant="secondary" size="sm">View File</Button>
      </div>
    </Alert>
    
    <Alert variant="warning">
      <div className="flex flex-col space-y-2">
        <p className="font-medium">Your trial ends in 3 days</p>
        <div className="w-full bg-background-skeleton rounded-full h-2">
          <div className="bg-status-warning h-2 rounded-full" style={{ width: '25%' }}></div>
        </div>
        <div className="flex justify-between text-sm">
          <span>7 days used</span>
          <span>3 days left</span>
        </div>
        <Button variant="primary" size="sm" className="mt-1">Upgrade Now</Button>
      </div>
    </Alert>
  </div>
);

// Real-world examples
export const RealWorldExamples = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-text-primary text-lg font-medium mb-2">Form Validation</h3>
      <div className="p-4 border border-border-light rounded-md bg-background-light">
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value="johndoe@example.com"
            />
          </div>
          
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-status-danger rounded-md focus:outline-none focus:ring-2 focus:ring-status-danger focus:border-status-danger"
              value="pass"
            />
            <Alert 
              variant="danger" 
              className="mt-2" 
              showIcon={true}
            >
              Password must be at least 8 characters long.
            </Alert>
          </div>
        </div>
        
        <Button variant="primary">Submit</Button>
      </div>
    </div>
    
    <div>
      <h3 className="text-text-primary text-lg font-medium mb-2">System Status</h3>
      <Alert 
        variant="warning"
        title="Scheduled Maintenance"
        className="border border-status-warning"
      >
        <div className="space-y-2">
          <p>
            Our system will be undergoing scheduled maintenance on March 27, 2025, from 2:00 AM to 4:00 AM UTC.
            During this time, the service may be intermittently unavailable.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary text-sm">Maintenance starts in 3 hours 45 minutes</span>
            <Button variant="secondary" size="sm">Set Reminder</Button>
          </div>
        </div>
      </Alert>
    </div>
    
    <div>
      <h3 className="text-text-primary text-lg font-medium mb-2">Feature Announcement</h3>
      <Alert 
        variant="info"
        className="bg-primary/10 border border-primary"
      >
        <div className="flex items-start">
          <div className="flex-1">
            <h3 className="font-medium text-primary">New Feature: Dark Mode</h3>
            <p className="mt-1">
              We've added dark mode support to the application. Try it out by clicking the toggle in the top right corner.
            </p>
          </div>
          <Button 
            variant="primary" 
            size="sm"
          >
            Try Now
          </Button>
        </div>
      </Alert>
    </div>
  </div>
);
