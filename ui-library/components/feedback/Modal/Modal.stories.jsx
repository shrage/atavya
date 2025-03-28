import React, { useState } from 'react';
import Modal from './Modal';

export default {
  title: "Feedback/Modal",
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button
        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <p className="mb-4">This is a basic modal with some content.</p>
        <p>You can close it by:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Clicking the X button</li>
          <li>Clicking outside the modal</li>
          <li>Pressing the ESC key</li>
        </ul>
      </Modal>
    </>
  );
};

export const WithFooter = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button
        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Open Modal with Footer
      </button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal with Footer"
        footer={
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 bg-background-hover text-text-primary rounded hover:bg-background-skeleton"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              onClick={() => {
                alert('Confirmed!');
                setIsOpen(false);
              }}
            >
              Confirm
            </button>
          </div>
        }
      >
        <p>This modal includes a footer with action buttons.</p>
      </Modal>
    </>
  );
};

export const FormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted with data: ${JSON.stringify(formData, null, 2)}`);
    setIsOpen(false);
  };
  
  return (
    <>
      <button
        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Open Form Modal
      </button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Contact Form"
        footer={
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-background-hover text-text-primary rounded hover:bg-background-skeleton"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="contact-form"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            >
              Submit
            </button>
          </div>
        }
      >
        <form id="contact-form" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-text-primary text-sm font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-text-primary text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-text-primary text-sm font-medium mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </form>
      </Modal>
    </>
  );
};

export const NestedModals = () => {
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  
  return (
    <>
      <button
        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsFirstOpen(true)}
      >
        Open First Modal
      </button>
      
      <Modal
        isOpen={isFirstOpen}
        onClose={() => setIsFirstOpen(false)}
        title="First Modal"
      >
        <p className="mb-4">This is the first modal.</p>
        <button
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsSecondOpen(true)}
        >
          Open Second Modal
        </button>
        
        <Modal
          isOpen={isSecondOpen}
          onClose={() => setIsSecondOpen(false)}
          title="Second Modal"
        >
          <p>This is a nested modal.</p>
        </Modal>
      </Modal>
    </>
  );
};

export const SizeVariants = () => {
  const [isSmallOpen, setIsSmallOpen] = useState(false);
  const [isDefaultOpen, setIsDefaultOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  
  return (
    <div className="flex flex-col space-y-2">
      <button
        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsSmallOpen(true)}
      >
        Small Modal
      </button>
      
      <button
        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsDefaultOpen(true)}
      >
        Default Modal
      </button>
      
      <button
        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsLargeOpen(true)}
      >
        Large Modal
      </button>
      
      <button
        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsFullscreenOpen(true)}
      >
        Fullscreen Modal
      </button>
      
      <Modal
        isOpen={isSmallOpen}
        onClose={() => setIsSmallOpen(false)}
        title="Small Modal"
        size="sm"
      >
        <p>This is a small modal dialog.</p>
      </Modal>
      
      <Modal
        isOpen={isDefaultOpen}
        onClose={() => setIsDefaultOpen(false)}
        title="Default Modal"
      >
        <p>This is a default-sized modal dialog.</p>
      </Modal>
      
      <Modal
        isOpen={isLargeOpen}
        onClose={() => setIsLargeOpen(false)}
        title="Large Modal"
        size="lg"
      >
        <p>This is a large modal dialog.</p>
      </Modal>
      
      <Modal
        isOpen={isFullscreenOpen}
        onClose={() => setIsFullscreenOpen(false)}
        title="Fullscreen Modal"
        size="full"
      >
        <p>This is a fullscreen modal dialog.</p>
      </Modal>
    </div>
  );
};

export const CustomizationOptions = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button
        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Open Customized Modal
      </button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Custom Modal"
        titleClassName="text-primary text-xl font-bold"
        contentClassName="bg-background-skeleton"
        closeButtonClassName="text-status-live hover:bg-status-live hover:bg-opacity-10 rounded-full"
        overlayClassName="bg-background-dark bg-opacity-75"
        showCloseButton={true}
        closeOnOverlayClick={true}
        closeOnEsc={true}
      >
        <div className="p-4 bg-background-offwhite rounded-md">
          <p>This modal has custom styling applied to various parts:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Custom title styling</li>
            <li>Custom content background</li>
            <li>Custom close button styling</li>
            <li>Custom overlay color and opacity</li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

export const LongContentScroll = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button
        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Modal with Long Content
      </button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Scrollable Content"
      >
        <div>
          <p className="mb-4">This modal contains a lot of content that will scroll.</p>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
              hendrerit risus, sed porttitor quam.
            </p>
          ))}
        </div>
      </Modal>
    </>
  );
};

export const NonScrollable = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button
        className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(true)}
      >
        Non-Scrollable Modal
      </button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Non-Scrollable Content"
        scrollable={false}
      >
        <div className="h-96 flex items-center justify-center bg-background-skeleton rounded">
          <p className="text-text-secondary">
            This modal has a fixed height and won't scroll internally.
            <br />
            The entire modal will scroll if it exceeds the viewport.
          </p>
        </div>
      </Modal>
    </>
  );
};
