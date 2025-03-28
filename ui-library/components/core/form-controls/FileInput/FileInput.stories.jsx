import React, { useState } from 'react';
import { FileInput } from './index';

export default {
  title: 'Core/Form Controls/FileInput',
  component: FileInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'File input component for selecting files from the file system.'
      }
    }
  },
  argTypes: {
    onChange: { action: 'changed' },
    onError: { action: 'error' }
  }
};

// Basic FileInput
export const Default = (args) => <FileInput {...args} />;
Default.args = {
  label: 'Upload file',
  name: 'default-file-input'
};

// FileInput with accept attribute
export const WithAcceptFilter = (args) => <FileInput {...args} />;
WithAcceptFilter.args = {
  label: 'Upload image',
  name: 'image-file-input',
  accept: 'image/*',
  helperText: 'Only image files are allowed'
};

// FileInput with helper text
export const WithHelperText = (args) => <FileInput {...args} />;
WithHelperText.args = {
  label: 'Upload document',
  name: 'helper-file-input',
  accept: '.pdf,.docx,.txt',
  helperText: 'Accepted formats: PDF, DOCX, TXT (max 5MB)'
};

// Multiple FileInput
export const MultipleFiles = (args) => <FileInput {...args} />;
MultipleFiles.args = {
  label: 'Upload files',
  name: 'multiple-file-input',
  multiple: true,
  maxFiles: 3,
  helperText: 'You can upload up to 3 files'
};

// Disabled FileInput
export const Disabled = (args) => <FileInput {...args} />;
Disabled.args = {
  label: 'Upload file (disabled)',
  name: 'disabled-file-input',
  disabled: true
};

// FileInput with error
export const WithError = (args) => <FileInput {...args} />;
WithError.args = {
  label: 'Upload file',
  name: 'error-file-input',
  error: 'File upload failed',
  helperText: 'Please try again with a smaller file'
};

// Required FileInput
export const Required = (args) => <FileInput {...args} />;
Required.args = {
  label: 'Upload file',
  name: 'required-file-input',
  required: true
};

// FileInput with custom button text
export const CustomButtonText = (args) => <FileInput {...args} />;
CustomButtonText.args = {
  label: 'Upload profile picture',
  name: 'custom-button-file-input',
  accept: 'image/*',
  buttonText: 'Browse...',
  placeholder: 'Select an image'
};

// FileInput with validation
export const WithValidation = () => {
  const [error, setError] = useState('');
  
  const handleError = (errorMessage) => {
    setError(errorMessage);
  };
  
  const handleChange = () => {
    setError('');
  };
  
  return (
    <FileInput
      label="Upload file (max 1MB)"
      name="validation-file-input"
      maxSize={1 * 1024 * 1024} // 1MB
      error={error}
      helperText="Maximum file size: 1MB"
      onError={handleError}
      onChange={handleChange}
    />
  );
};

// Form example with multiple file inputs
export const FormExample = () => {
  const [formData, setFormData] = useState({
    profilePicture: null,
    resume: null,
    portfolioItems: []
  });
  
  const [errors, setErrors] = useState({
    profilePicture: '',
    resume: '',
    portfolioItems: ''
  });
  
  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: field === 'portfolioItems' ? e.target.files : e.target.files[0]
    });
    
    // Clear error when field is updated
    setErrors({
      ...errors,
      [field]: ''
    });
  };
  
  const handleError = (field) => (errorMessage) => {
    setErrors({
      ...errors,
      [field]: errorMessage
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    
    if (!formData.profilePicture) {
      newErrors.profilePicture = 'Profile picture is required';
    }
    
    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors({
        ...errors,
        ...newErrors
      });
      return;
    }
    
    // Form is valid, submit would happen here
    alert('Form submitted successfully!');
  };
  
  return (
    <form 
      className="max-w-md p-6 border border-border-light rounded-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-medium text-text-primary mb-6">Job Application</h2>
      
      <div className="space-y-6">
        <FileInput
          label="Profile Picture"
          name="profilePicture"
          accept="image/*"
          required
          error={errors.profilePicture}
          helperText="Upload a professional photo (JPG or PNG)"
          onChange={handleChange('profilePicture')}
          onError={handleError('profilePicture')}
          maxSize={2 * 1024 * 1024} // 2MB
        />
        
        <FileInput
          label="Resume/CV"
          name="resume"
          accept=".pdf,.docx"
          required
          error={errors.resume}
          helperText="Upload your resume in PDF or DOCX format"
          onChange={handleChange('resume')}
          onError={handleError('resume')}
          maxSize={5 * 1024 * 1024} // 5MB
        />
        
        <FileInput
          label="Portfolio Items"
          name="portfolioItems"
          accept=".pdf,.jpg,.png"
          multiple
          maxFiles={5}
          error={errors.portfolioItems}
          helperText="Upload up to 5 examples of your work (optional)"
          onChange={handleChange('portfolioItems')}
          onError={handleError('portfolioItems')}
          maxSize={10 * 1024 * 1024} // 10MB
        />
      </div>
      
      <div className="mt-8 pt-4 border-t border-border-light flex justify-end">
        <button 
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Submit Application
        </button>
      </div>
    </form>
  );
};
