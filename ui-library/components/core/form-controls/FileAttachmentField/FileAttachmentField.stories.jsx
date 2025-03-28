import React, { useState } from 'react';
import FileAttachmentField from './FileAttachmentField';

export default {
  title: 'Form Controls/FileAttachmentField',
  component: FileAttachmentField,
  parameters: {
    docs: {
      description: {
        component: 'A field component for uploading and managing file attachments.',
      },
    },
  },
};

// Basic example
export const Basic = () => {
  const [files, setFiles] = useState([]);
  
  return (
    <FileAttachmentField
      label="Attachments"
      files={files}
      onChange={setFiles}
    />
  );
};

// With file type restrictions
export const WithFileTypeRestrictions = () => {
  const [files, setFiles] = useState([]);
  
  return (
    <FileAttachmentField
      label="Document Attachments"
      files={files}
      onChange={setFiles}
      accept=".pdf,.doc,.docx,.txt"
    />
  );
};

// With size and count limits
export const WithSizeAndCountLimits = () => {
  const [files, setFiles] = useState([]);
  
  return (
    <FileAttachmentField
      label="Image Attachments"
      files={files}
      onChange={setFiles}
      accept=".jpg,.jpeg,.png,.gif"
      maxFiles={3}
      maxSize={2 * 1024 * 1024} // 2MB
    />
  );
};

// Single file upload
export const SingleFileUpload = () => {
  const [files, setFiles] = useState([]);
  
  const handleChange = (newFiles) => {
    // Only keep the most recent file
    setFiles(newFiles.slice(-1));
  };
  
  return (
    <FileAttachmentField
      label="Profile Picture"
      files={files}
      onChange={handleChange}
      accept=".jpg,.jpeg,.png"
      multiple={false}
      maxFiles={1}
      showPreview={true}
      previewSize="lg"
    />
  );
};

// Different preview sizes
export const PreviewSizes = () => {
  const [filesSmall, setFilesSmall] = useState([]);
  const [filesMedium, setFilesMedium] = useState([]);
  const [filesLarge, setFilesLarge] = useState([]);
  
  return (
    <div className="space-y-6">
      <FileAttachmentField
        label="Small Previews"
        files={filesSmall}
        onChange={setFilesSmall}
        accept="image/*"
        showPreview={true}
        previewSize="sm"
      />
      
      <FileAttachmentField
        label="Medium Previews (Default)"
        files={filesMedium}
        onChange={setFilesMedium}
        accept="image/*"
        showPreview={true}
        previewSize="md"
      />
      
      <FileAttachmentField
        label="Large Previews"
        files={filesLarge}
        onChange={setFilesLarge}
        accept="image/*"
        showPreview={true}
        previewSize="lg"
      />
    </div>
  );
};

// With custom upload text and icon
export const CustomUploadUI = () => {
  const [files, setFiles] = useState([]);
  
  return (
    <FileAttachmentField
      label="Upload Files"
      files={files}
      onChange={setFiles}
      uploadText="Click or drag files to upload attachments"
      uploadIcon={
        <svg className="w-12 h-12 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      }
    />
  );
};

// With validation error
export const WithError = () => {
  const [files, setFiles] = useState([]);
  
  return (
    <FileAttachmentField
      label="Required Attachments"
      files={files}
      onChange={setFiles}
      error="At least one file is required"
      required
    />
  );
};

// Disabled state
export const Disabled = () => {
  const [files, setFiles] = useState([
    new File(['dummy content'], 'example.pdf', { type: 'application/pdf' }),
  ]);
  
  return (
    <FileAttachmentField
      label="Attachments"
      files={files}
      onChange={setFiles}
      disabled
    />
  );
};

// Read-only state
export const ReadOnly = () => {
  const [files, setFiles] = useState([
    new File(['dummy content'], 'document.pdf', { type: 'application/pdf' }),
    new File(['dummy content'], 'spreadsheet.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
  ]);
  
  return (
    <FileAttachmentField
      label="Submitted Documents"
      files={files}
      onChange={setFiles}
      readOnly
    />
  );
};

// In a form context
export const InFormContext = () => {
  const [formData, setFormData] = useState({
    title: 'Support Request',
    description: 'I need help with my account',
    attachments: [],
  });
  
  const handleAttachmentsChange = (files) => {
    setFormData({
      ...formData,
      attachments: files,
    });
  };
  
  return (
    <div className="p-4 border rounded max-w-2xl">
      <h2 className="text-lg font-medium mb-4">Submit Support Request</h2>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="w-24 text-sm text-gray-500">Title:</span>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="flex-1 p-2 border rounded"
          />
        </div>
        
        <div className="flex items-center">
          <span className="w-24 text-sm text-gray-500">Description:</span>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="flex-1 p-2 border rounded h-24"
          />
        </div>
        
        <div className="flex items-start">
          <span className="w-24 text-sm text-gray-500 pt-2">Attachments:</span>
          <div className="flex-1">
            <FileAttachmentField
              hideLabel
              files={formData.attachments}
              onChange={handleAttachmentsChange}
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              maxFiles={5}
              maxSize={5 * 1024 * 1024} // 5MB
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

// With custom styling
export const CustomStyling = () => {
  const [files, setFiles] = useState([]);
  
  return (
    <FileAttachmentField
      label="Attachments"
      files={files}
      onChange={setFiles}
      className="border-l-4 border-l-primary pl-3"
      dropzoneClassName="border-primary/50 bg-primary/5"
    />
  );
};
