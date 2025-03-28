import React, { useState, useEffect } from 'react';
import { ProgressBar } from './index';

export default {
  title: 'Core/Display/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Progress bar component for visualizing progress.'
      }
    }
  }
};

// Basic progress bar
export const Default = (args) => <ProgressBar {...args} />;
Default.args = {
  value: 50,
  min: 0,
  max: 100
};

// Progress bar with label
export const WithLabel = (args) => <ProgressBar {...args} />;
WithLabel.args = {
  value: 75,
  label: 'Loading...'
};

// Progress bar with value display
export const WithValueDisplay = () => (
  <div className="w-80 space-y-6">
    <ProgressBar value={35} showValue />
    <ProgressBar value={65} showValue valuePosition="left" />
    <ProgressBar value={85} showValue valuePosition="top" label="Upload progress" />
    <ProgressBar value={45} showValue valuePosition="bottom" />
  </div>
);

// Progress bar sizes
export const Sizes = () => (
  <div className="w-80 space-y-6">
    <div>
      <div className="text-sm text-text-secondary mb-1">Extra Small (xs)</div>
      <ProgressBar value={60} size="xs" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-1">Small (sm)</div>
      <ProgressBar value={60} size="sm" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-1">Medium (md - default)</div>
      <ProgressBar value={60} size="md" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-1">Large (lg)</div>
      <ProgressBar value={60} size="lg" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-1">Extra Large (xl)</div>
      <ProgressBar value={60} size="xl" />
    </div>
  </div>
);

// Progress bar colors
export const Colors = () => (
  <div className="w-80 space-y-6">
    <div>
      <div className="text-sm text-text-secondary mb-1">Primary (default)</div>
      <ProgressBar value={70} color="primary" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-1">Secondary</div>
      <ProgressBar value={70} color="secondary" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-1">Success</div>
      <ProgressBar value={70} color="success" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-1">Warning</div>
      <ProgressBar value={70} color="warning" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-1">Danger</div>
      <ProgressBar value={70} color="danger" />
    </div>
    <div>
      <div className="text-sm text-text-secondary mb-1">Info</div>
      <ProgressBar value={70} color="info" />
    </div>
  </div>
);

// Indeterminate progress bar
export const Indeterminate = () => (
  <div className="w-80 space-y-6">
    <ProgressBar isIndeterminate label="Loading..." />
    <ProgressBar isIndeterminate size="lg" color="secondary" />
    <ProgressBar isIndeterminate size="sm" color="info" />
  </div>
);

// Animated progress bar
export const Animated = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-80 space-y-4">
      <ProgressBar 
        value={progress} 
        showValue 
        label={`Downloading... ${progress}%`} 
      />
      
      <div className="text-sm text-text-secondary">
        {progress < 100 ? 'Downloading file...' : 'Download complete!'}
      </div>
    </div>
  );
};

// Progress bar in context
export const InContext = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const startUpload = () => {
    setUploading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploading(false), 1000);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);
  };
  
  return (
    <div className="w-80 p-4 border border-border-light rounded-lg bg-white">
      <h3 className="text-lg font-medium text-text-primary mb-4">File Upload</h3>
      
      {uploading ? (
        <div className="space-y-4">
          <ProgressBar 
            value={progress} 
            showValue 
            label="Uploading file..." 
            color={progress === 100 ? 'success' : 'primary'}
          />
          
          <div className="text-sm text-text-secondary">
            {progress < 100 ? 'Please wait...' : 'Upload complete!'}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-center border-2 border-dashed border-border-medium rounded-lg p-6">
            <div className="text-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 mx-auto text-text-tertiary" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                />
              </svg>
              <p className="mt-2 text-sm text-text-secondary">
                Drag and drop a file, or click to select
              </p>
            </div>
          </div>
          
          <button 
            className="w-full py-2 bg-primary text-white rounded hover:bg-primary-dark"
            onClick={startUpload}
          >
            Upload File
          </button>
        </div>
      )}
    </div>
  );
};
