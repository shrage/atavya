import React, { useState, useEffect } from 'react';
import Progress from './Progress';

export default {
  title: "Data/Visualization/Progress",
  component: Progress,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = () => <Progress value={60} />;

export const Variants = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Bar (Default)</h3>
      <Progress value={60} variant="bar" />
    </div>
    
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Circle</h3>
      <Progress value={60} variant="circle" />
    </div>
    
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Steps</h3>
      <Progress value={60} variant="steps" />
    </div>
  </div>
);

export const Sizes = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Bar Sizes</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-text-secondary mb-1">Extra Small (xs)</p>
          <Progress value={60} size="xs" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Small (sm)</p>
          <Progress value={60} size="sm" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Medium (md - default)</p>
          <Progress value={60} size="md" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Large (lg)</p>
          <Progress value={60} size="lg" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Extra Large (xl)</p>
          <Progress value={60} size="xl" />
        </div>
      </div>
    </div>
    
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Circle Sizes</h3>
      <div className="flex flex-wrap items-end gap-6">
        <div>
          <p className="text-sm text-text-secondary mb-1">Extra Small (xs)</p>
          <Progress value={60} variant="circle" size="xs" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Small (sm)</p>
          <Progress value={60} variant="circle" size="sm" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Medium (md - default)</p>
          <Progress value={60} variant="circle" size="md" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Large (lg)</p>
          <Progress value={60} variant="circle" size="lg" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Extra Large (xl)</p>
          <Progress value={60} variant="circle" size="xl" />
        </div>
      </div>
    </div>
  </div>
);

export const Colors = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Color Variants</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-text-secondary mb-1">Primary (default)</p>
          <Progress value={60} color="primary" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Secondary</p>
          <Progress value={60} color="secondary" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Success</p>
          <Progress value={60} color="success" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Danger</p>
          <Progress value={60} color="danger" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Warning</p>
          <Progress value={60} color="warning" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Info</p>
          <Progress value={60} color="info" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Light</p>
          <Progress value={60} color="light" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Dark</p>
          <Progress value={60} color="dark" />
        </div>
      </div>
    </div>
    
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Circle Colors</h3>
      <div className="flex flex-wrap gap-6">
        <Progress value={60} variant="circle" color="primary" />
        <Progress value={60} variant="circle" color="success" />
        <Progress value={60} variant="circle" color="danger" />
        <Progress value={60} variant="circle" color="warning" />
      </div>
    </div>
  </div>
);

export const WithLabels = () => (
  <div className="space-y-6">
    <Progress value={60} label="Loading..." />
    <Progress value={60} variant="circle" label="Uploading" showValue />
    <Progress 
      value={60} 
      label={
        <div className="flex justify-between">
          <span>Downloading...</span>
          <span className="text-text-tertiary">3 MB / 5 MB</span>
        </div>
      } 
    />
  </div>
);

export const WithValue = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Bar with Value</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-text-secondary mb-1">Inside (default)</p>
          <Progress value={60} showValue valuePosition="inside" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Outside</p>
          <Progress value={60} showValue valuePosition="outside" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Right</p>
          <Progress value={60} showValue valuePosition="right" />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Left</p>
          <Progress value={60} showValue valuePosition="left" />
        </div>
      </div>
    </div>
    
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Circle with Value</h3>
      <div className="flex flex-wrap gap-6">
        <div>
          <p className="text-sm text-text-secondary mb-1">Inside (default)</p>
          <Progress value={60} variant="circle" showValue />
        </div>
        <div>
          <p className="text-sm text-text-secondary mb-1">Below</p>
          <Progress value={60} variant="circle" showValue valuePosition="below" />
        </div>
      </div>
    </div>
    
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Custom Format</h3>
      <Progress 
        value={0.6} 
        showValue 
        valueFormat={(value) => `${Math.round(value * 100)}%`} 
      />
    </div>
  </div>
);

export const Indeterminate = () => (
  <div className="space-y-6">
    <div>
      <p className="text-sm text-text-secondary mb-1">Bar</p>
      <Progress indeterminate />
    </div>
    <div>
      <p className="text-sm text-text-secondary mb-1">Circle</p>
      <Progress variant="circle" indeterminate />
    </div>
  </div>
);

export const StripedAndAnimated = () => (
  <div className="space-y-6">
    <Progress value={60} striped />
    <Progress value={60} striped animated />
  </div>
);

export const StepsVariant = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Steps with Different Counts</h3>
      <div className="space-y-6">
        <Progress value={40} variant="steps" steps={3} />
        <Progress value={60} variant="steps" steps={5} />
        <Progress value={70} variant="steps" steps={10} />
      </div>
    </div>
    
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Steps with Labels</h3>
      <Progress 
        value={60} 
        variant="steps" 
        steps={5}
        stepLabels={['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']}
      />
    </div>
  </div>
);

export const Customized = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Custom Styling</h3>
      <Progress 
        value={60} 
        className="h-6 rounded-full overflow-hidden bg-background-skeleton"
        barClassName="bg-gradient-to-r from-primary to-secondary rounded-full"
      />
    </div>
    
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Custom Circle</h3>
      <Progress 
        value={75} 
        variant="circle"
        className="border-4 border-background-skeleton"
        barClassName="stroke-primary"
        size="lg"
      />
    </div>
    
    <div>
      <h3 className="text-lg font-medium text-text-primary mb-3">Custom Steps</h3>
      <Progress 
        value={60} 
        variant="steps" 
        steps={5}
        className="gap-2"
        barClassName="bg-primary rounded-full h-2"
        inactiveBarClassName="bg-background-skeleton rounded-full h-2"
      />
    </div>
  </div>
);

export const Interactive = () => {
  const [value, setValue] = useState(60);
  
  const handleChange = (e) => {
    setValue(parseInt(e.target.value, 10));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={value} 
          onChange={handleChange}
          className="w-64"
        />
        <span className="text-text-primary">{value}%</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-3">Bar Progress</h3>
          <Progress value={value} showValue />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-3">Circle Progress</h3>
          <Progress value={value} variant="circle" showValue />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-3">Steps Progress</h3>
          <Progress value={value} variant="steps" steps={10} />
        </div>
      </div>
    </div>
  );
};

export const MultipleProgress = () => {
  const [values, setValues] = useState({
    download: 70,
    upload: 45,
    processing: 30,
    installation: 90,
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setValues(prev => ({
        download: Math.min(100, prev.download + 5),
        upload: Math.min(100, prev.upload + 3),
        processing: Math.min(100, prev.processing + 7),
        installation: Math.min(100, prev.installation + 2),
      }));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="space-y-6 max-w-xl">
      <div className="p-4 border border-border-light rounded-lg bg-background-light">
        <h3 className="text-lg font-medium text-text-primary mb-4">Download Status</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-text-primary">Downloading files</span>
              <span className="text-sm text-text-secondary">{values.download}%</span>
            </div>
            <Progress value={values.download} color="primary" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-text-primary">Uploading data</span>
              <span className="text-sm text-text-secondary">{values.upload}%</span>
            </div>
            <Progress value={values.upload} color="info" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-text-primary">Processing</span>
              <span className="text-sm text-text-secondary">{values.processing}%</span>
            </div>
            <Progress value={values.processing} color="warning" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-text-primary">Installation</span>
              <span className="text-sm text-text-secondary">{values.installation}%</span>
            </div>
            <Progress value={values.installation} color="success" />
          </div>
        </div>
        
        <div className="mt-4 text-right">
          <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export const RealWorldExamples = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [quizProgress, setQuizProgress] = useState(2);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 800);
    
    // Simulate loading progress
    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          return 0;
        }
        return prev + 10;
      });
    }, 500);
    
    return () => {
      clearInterval(uploadInterval);
      clearInterval(loadingInterval);
    };
  }, []);
  
  return (
    <div className="space-y-12 max-w-4xl">
      {/* File Upload Example */}
      <div className="p-6 border border-border-light rounded-lg bg-background-light">
        <h3 className="text-xl font-medium text-text-primary mb-4">File Upload</h3>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <h4 className="text-text-primary font-medium">annual_report_2025.pdf</h4>
            <p className="text-text-secondary text-sm">
              {uploadProgress < 100 
                ? `Uploading... ${uploadProgress}%` 
                : 'Upload complete'}
            </p>
          </div>
        </div>
        
        <Progress 
          value={uploadProgress} 
          className="mb-4"
          showValue
          valuePosition="right"
        />
        
        <div className="flex justify-between">
          <div className="text-text-secondary text-sm">
            {(uploadProgress / 100 * 5.7).toFixed(1)} MB of 5.7 MB
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-text-primary border border-border-medium rounded hover:bg-background-skeleton text-sm">
              Cancel
            </button>
            <button 
              className={`px-3 py-1 text-white rounded text-sm ${
                uploadProgress < 100 
                  ? 'bg-background-skeleton text-text-tertiary cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary-dark'
              }`}
              disabled={uploadProgress < 100}
            >
              {uploadProgress < 100 ? 'Uploading...' : 'View File'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Quiz Progress Example */}
      <div className="p-6 border border-border-light rounded-lg bg-background-light">
        <h3 className="text-xl font-medium text-text-primary mb-4">Course Progress</h3>
        
        <div className="mb-6">
          <Progress 
            value={(quizProgress / 5) * 100} 
            variant="steps" 
            steps={5}
            stepLabels={['Introduction', 'Basics', 'Advanced', 'Practice', 'Final Quiz']}
            className="mb-2"
          />
          <p className="text-text-secondary text-sm text-center">
            {quizProgress} of 5 sections completed
          </p>
        </div>
        
        <div className="border border-border-light rounded-lg p-4 bg-white mb-6">
          <h4 className="text-text-primary font-medium mb-2">Advanced Concepts</h4>
          <p className="text-text-secondary mb-4">
            Learn about advanced techniques and methodologies in this comprehensive section.
          </p>
          
          <div className="flex justify-between">
            <button 
              className="px-4 py-2 border border-border-medium text-text-primary rounded hover:bg-background-skeleton"
              onClick={() => setQuizProgress(prev => Math.max(1, prev - 1))}
            >
              Previous
            </button>
            <button 
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              onClick={() => setQuizProgress(prev => Math.min(5, prev + 1))}
            >
              {quizProgress < 5 ? 'Continue' : 'Complete'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Loading State Example */}
      <div className="p-6 border border-border-light rounded-lg bg-background-light">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-text-primary">Dashboard</h3>
          <div className="flex items-center gap-2">
            <span className="text-text-secondary text-sm">Refreshing data</span>
            <Progress 
              value={loadingProgress} 
              variant="circle" 
              size="xs"
              indeterminate={loadingProgress === 0}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map(card => (
            <div key={card} className="border border-border-light rounded-lg p-4 bg-white">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-text-primary font-medium">Metric {card}</h4>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-text-primary mb-2">
                {loadingProgress < 100 ? '...' : `${Math.floor(Math.random() * 1000)}`}
              </div>
              <Progress 
                value={Math.floor(Math.random() * 100)} 
                size="xs"
                className="mb-2"
              />
              <p className="text-text-secondary text-sm">
                {loadingProgress < 100 ? 'Loading...' : 'Updated just now'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
