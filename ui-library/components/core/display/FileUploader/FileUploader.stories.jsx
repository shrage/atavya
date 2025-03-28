import React, { useState } from 'react';
import FileUploader from './FileUploader';

export default {
  title: "Core/Display/FileUploader",
  component: FileUploader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const Template = (args) => {
  const [files, setFiles] = useState([]);
  
  const handleChange = (newFiles) => {
    setFiles(newFiles);
    
    if (args.onChange) {
      args.onChange(newFiles);
    }
  };
  
  return (
    <div>
      <FileUploader
        {...args}
        value={files}
        onChange={handleChange}
      />
      
      {files.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium mb-2">Selected Files:</h3>
          <ul className="text-xs space-y-1">
            {files.map((file, index) => (
              <li key={index}>
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const ImagesOnly = Template.bind({});
ImagesOnly.args = {
  accept: 'image/*',
  uploadText: 'Drag and drop images here, or click to browse',
  uploadSubText: 'Supports JPG, PNG, GIF, SVG up to 10MB',
};

export const MultipleFiles = Template.bind({});
MultipleFiles.args = {
  multiple: true,
  uploadText: 'Upload multiple files',
  uploadSubText: 'Select up to 10 files',
};

export const WithSizeLimit = Template.bind({});
WithSizeLimit.args = {
  maxSize: 1048576, // 1MB
  uploadSubText: 'Max file size: 1MB',
};

export const MaxFilesLimit = Template.bind({});
MaxFilesLimit.args = {
  multiple: true,
  maxFiles: 3,
  uploadSubText: 'Select up to 3 files',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const MinimalVariant = Template.bind({});
MinimalVariant.args = {
  variant: 'minimal',
};

export const SolidVariant = Template.bind({});
SolidVariant.args = {
  variant: 'solid',
};

export const ListPreviewType = Template.bind({});
ListPreviewType.args = {
  previewType: 'list',
  multiple: true,
};

export const SmallPreviewSize = Template.bind({});
SmallPreviewSize.args = {
  previewSize: 'sm',
  multiple: true,
};

export const LargePreviewSize = Template.bind({});
LargePreviewSize.args = {
  previewSize: 'lg',
  multiple: true,
};

export const PDFDocumentsOnly = Template.bind({});
PDFDocumentsOnly.args = {
  accept: 'application/pdf,.pdf',
  uploadText: 'Upload PDF documents',
  uploadSubText: 'Supports PDF files up to 10MB',
  buttonText: 'Select PDF',
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  uploadIcon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  ),
  uploadText: 'Upload files',
};

export const NoButton = Template.bind({});
NoButton.args = {
  buttonText: '',
  uploadText: 'Drop files here or click to browse',
};

export const WithValidationError = () => {
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  
  const handleChange = (newFiles) => {
    setFiles(newFiles);
  };
  
  const handleError = (newErrors) => {
    setErrors(newErrors);
  };
  
  return (
    <div>
      <FileUploader
        accept="image/*"
        maxSize={1048576} // 1MB
        value={files}
        onChange={handleChange}
        onError={handleError}
        uploadSubText="Only images, max 1MB per file"
      />
      
      {errors.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <h3 className="text-sm font-medium text-red-800 mb-1">Upload Errors:</h3>
          <ul className="text-xs text-red-700 list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const PropertyManagementUsage = () => {
  const [files, setFiles] = useState([]);
  
  return (
    <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-1">Upload Property Documents</h2>
      <p className="text-sm text-gray-500 mb-4">
        Upload lease agreements, property photos, maintenance reports, or other relevant documents.
      </p>
      
      <FileUploader
        multiple
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        maxSize={5242880} // 5MB
        value={files}
        onChange={setFiles}
        variant="solid"
        uploadText="Drag and drop property documents here"
        uploadSubText="Supports PDF, DOC, DOCX, PNG, JPG files up to 5MB"
        buttonText="Browse Files"
      />
      
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {files.length} Document{files.length !== 1 ? 's' : ''} Selected
          </h3>
        </div>
      )}
      
      <div className="mt-6 flex justify-end space-x-3">
        <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
          Cancel
        </button>
        <button 
          className={`px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 ${files.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={files.length === 0}
        >
          Upload Documents
        </button>
      </div>
    </div>
  );
};

