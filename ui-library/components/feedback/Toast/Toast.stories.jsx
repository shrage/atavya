import React, { useEffect } from 'react';
import Toast, { ToastProvider, ToastContainer, useToast } from './Toast';

export default {
  title: "Feedback/Toast",
  component: ToastContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="p-4">
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
};

// Wrapper component to use the toast hook in stories
const ToastDemo = ({ children, onMount }) => {
  const toast = useToast();
  
  useEffect(() => {
    if (onMount) {
      onMount(toast);
    }
  }, [onMount, toast]);
  
  return children(toast);
};

export const BasicUsage = () => (
  <ToastDemo>
    {(toast) => (
      <div className="flex flex-wrap gap-2">
        <button
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          onClick={() => toast.show({
            title: "Information",
            message: 'This is a basic information message',
          })}
        >
          Show Info Toast
        </button>
        
        <button
          className="px-4 py-2 bg-status-danger text-white rounded hover:bg-status-danger-dark"
          onClick={() => toast.error({
            title: "Error",
            message: 'This is an error message',
          })}
        >
          Show Error Toast
        </button>
        
        <button
          className="px-4 py-2 bg-status-success text-white rounded hover:bg-status-success-dark"
          onClick={() => toast.success({
            title: "Success",
            message: 'This is a success message',
          })}
        >
          Show Success Toast
        </button>
        
        <button
          className="px-4 py-2 bg-status-warning text-white rounded hover:bg-status-warning-dark"
          onClick={() => toast.warning({
            title: "Warning",
            message: 'This is a warning message',
          })}
        >
          Show Warning Toast
        </button>
      </div>
    )}
  </ToastDemo>
);

export const MessageOnly = () => (
  <ToastDemo>
    {(toast) => (
      <div className="flex flex-wrap gap-2">
        <button
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          onClick={() => toast.show({
            message: 'This is a toast with only a message and no title',
          })}
        >
          Show Message-Only Toast
        </button>
      </div>
    )}
  </ToastDemo>
);

export const CustomDuration = () => (
  <ToastDemo>
    {(toast) => (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            onClick={() => toast.show({
              title: "Quick Toast",
              message: 'This toast will disappear after 2 seconds',
              duration: 2000,
            })}
          >
            2 Second Toast
          </button>
          
          <button
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            onClick={() => toast.show({
              title: "Default Toast",
              message: 'This toast will disappear after 5 seconds (default)',
            })}
          >
            5 Second Toast (Default)
          </button>
          
          <button
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            onClick={() => toast.show({
              title: "Long Toast",
              message: 'This toast will disappear after 10 seconds',
              duration: 10000,
            })}
          >
            10 Second Toast
          </button>
        </div>
        
        <p className="text-text-secondary text-sm">
          Note: You can hover over any toast to pause its auto-dismiss timer.
        </p>
      </div>
    )}
  </ToastDemo>
);

export const PersistentToast = () => (
  <ToastDemo>
    {(toast) => (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            className="px-4 py-2 bg-status-danger text-white rounded hover:bg-status-danger-dark"
            onClick={() => toast.error({
              title: "Critical Error",
              message: 'This toast will not auto-dismiss and requires manual closing',
              duration: null, // null duration means it won't auto-dismiss
            })}
          >
            Show Persistent Toast
          </button>
        </div>
        
        <p className="text-text-secondary text-sm">
          Persistent toasts are useful for critical messages that require user acknowledgment.
        </p>
      </div>
    )}
  </ToastDemo>
);

export const ToastPositions = () => (
  <ToastDemo>
    {(toast) => (
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <h3 className="text-text-primary font-medium mb-2">Top Positions</h3>
          <div className="flex flex-col gap-2">
            <button
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              onClick={() => toast.show({
                title: "Top Left",
                message: 'This toast appears in the top left',
                position: 'top-left',
              })}
            >
              Top Left
            </button>
            
            <button
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              onClick={() => toast.show({
                title: "Top Center",
                message: 'This toast appears in the top center',
                position: 'top-center',
              })}
            >
              Top Center
            </button>
            
            <button
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              onClick={() => toast.show({
                title: "Top Right",
                message: 'This toast appears in the top right (default)',
                position: 'top-right',
              })}
            >
              Top Right (Default)
            </button>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <h3 className="text-text-primary font-medium mb-2">Bottom Positions</h3>
          <div className="flex flex-col gap-2">
            <button
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              onClick={() => toast.show({
                title: "Bottom Left",
                message: 'This toast appears in the bottom left',
                position: 'bottom-left',
              })}
            >
              Bottom Left
            </button>
            
            <button
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              onClick={() => toast.show({
                title: "Bottom Center",
                message: 'This toast appears in the bottom center',
                position: 'bottom-center',
              })}
            >
              Bottom Center
            </button>
            
            <button
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              onClick={() => toast.show({
                title: "Bottom Right",
                message: 'This toast appears in the bottom right',
                position: 'bottom-right',
              })}
            >
              Bottom Right
            </button>
          </div>
        </div>
      </div>
    )}
  </ToastDemo>
);

export const WithoutProgressBar = () => (
  <ToastDemo>
    {(toast) => (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            onClick={() => toast.show({
              title: "No Progress Bar",
              message: 'This toast does not show a progress bar',
              showProgress: false,
            })}
          >
            Without Progress Bar
          </button>
          
          <button
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            onClick={() => toast.show({
              title: "With Progress Bar",
              message: 'This toast shows a progress bar (default)',
              showProgress: true,
            })}
          >
            With Progress Bar (Default)
          </button>
        </div>
      </div>
    )}
  </ToastDemo>
);

export const CustomContent = () => (
  <ToastDemo>
    {(toast) => (
      <div className="flex flex-wrap gap-2">
        <button
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          onClick={() => toast.show({
            content: (
              <div className="flex items-center p-2">
                <div className="flex-shrink-0 mr-3">
                  <img 
                    src="https://via.placeholder.com/40" 
                    alt="Avatar" 
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">New Message</h4>
                  <p className="text-text-secondary text-sm">John Doe: Hey, how's it going?</p>
                  <div className="flex gap-2 mt-2">
                    <button className="px-2 py-1 bg-primary text-white text-xs rounded">Reply</button>
                    <button className="px-2 py-1 bg-background-skeleton text-text-primary text-xs rounded">Dismiss</button>
                  </div>
                </div>
              </div>
            ),
          })}
        >
          Show Custom Content Toast
        </button>
      </div>
    )}
  </ToastDemo>
);

export const ProgrammaticDismiss = () => (
  <ToastDemo>
    {(toast) => {
      const showToastWithId = () => {
        const id = toast.show({
          title: "Dismissable Toast",
          message: 'This toast can be dismissed programmatically',
          duration: null, // Make it persistent
        });
        
        return id;
      };
      
      const [toastId, setToastId] = React.useState(null);
      
      return (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              onClick={() => {
                const id = showToastWithId();
                setToastId(id);
              }}
            >
              Show Toast
            </button>
            
            <button
              className="px-4 py-2 bg-status-danger text-white rounded hover:bg-status-danger-dark"
              onClick={() => {
                if (toastId) {
                  toast.dismiss(toastId);
                  setToastId(null);
                }
              }}
              disabled={!toastId}
              className={`px-4 py-2 rounded ${toastId 
                ? 'bg-status-danger text-white hover:bg-status-danger-dark' 
                : 'bg-background-skeleton text-text-tertiary cursor-not-allowed'}`}
            >
              Dismiss Toast
            </button>
            
            <button
              className="px-4 py-2 bg-status-danger text-white rounded hover:bg-status-danger-dark"
              onClick={() => toast.dismissAll()}
            >
              Dismiss All Toasts
            </button>
          </div>
        </div>
      );
    }}
  </ToastDemo>
);

export const CustomStyling = () => (
  <ToastDemo>
    {(toast) => (
      <div className="flex flex-wrap gap-2">
        <button
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          onClick={() => toast.show({
            title: "Custom Styled Toast",
            message: 'This toast has custom styling',
            className: "bg-primary/10 border-l-4 border-l-primary",
            progressClassName: "bg-primary",
          })}
        >
          Show Custom Styled Toast
        </button>
      </div>
    )}
  </ToastDemo>
);

export const MultipleToasts = () => (
  <ToastDemo>
    {(toast) => {
      const addMultipleToasts = () => {
        toast.info({
          title: "Information",
          message: 'This is an information toast',
        });
        
        setTimeout(() => {
          toast.success({
            title: "Success",
            message: 'Your data has been saved',
          });
        }, 1000);
        
        setTimeout(() => {
          toast.warning({
            title: "Warning",
            message: 'Your session will expire soon',
          });
        }, 2000);
        
        setTimeout(() => {
          toast.error({
            title: "Error",
            message: 'Failed to connect to server',
          });
        }, 3000);
      };
      
      return (
        <div className="flex flex-col space-y-4">
          <button
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            onClick={addMultipleToasts}
          >
            Show Multiple Toasts
          </button>
          <p className="text-text-secondary text-sm">
            This will show 4 different toasts with a 1-second delay between each.
          </p>
        </div>
      );
    }}
  </ToastDemo>
);

export const ToastWithCustomIcon = () => (
  <ToastDemo>
    {(toast) => (
      <div className="flex flex-wrap gap-2">
        <button
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          onClick={() => toast.show({
            title: "Custom Icon",
            message: 'This toast has a custom icon',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            ),
          })}
        >
          Show Toast with Custom Icon
        </button>
      </div>
    )}
  </ToastDemo>
);

// Auto-show toasts on story load
export const AutoShownToasts = () => (
  <ToastDemo
    onMount={(toast) => {
      // Show different types of toasts
      toast.info({
        title: "Information",
        message: 'This is an information toast',
        position: 'top-right',
      });
      
      toast.success({
        title: "Success",
        message: 'Your data has been saved successfully',
        position: 'top-right',
      });
      
      toast.warning({
        title: "Warning",
        message: 'Your session will expire in 5 minutes',
        position: 'top-right',
      });
      
      toast.error({
        title: "Error",
        message: 'Failed to connect to the server',
        position: 'top-right',
      });
    }}
  >
    {() => (
      <div className="p-4 border border-border-light rounded-md bg-background-light">
        <h3 className="text-text-primary text-lg font-medium mb-2">Auto-Shown Toasts</h3>
        <p className="text-text-secondary">
          This story automatically shows different types of toasts when loaded.
          Look at the top right corner of the screen.
        </p>
      </div>
    )}
  </ToastDemo>
);
