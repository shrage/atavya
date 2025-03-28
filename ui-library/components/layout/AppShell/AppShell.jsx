import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * AppShell component providing the main layout structure with sidebar and header
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <AppShell
 *   sidebar={<Sidebar />}
 *   header={<Header />}
 * >
 *   <main>Content</main>
 * </AppShell>
 * ```
 */
const AppShell = ({
  children,
  sidebar,
  header,
  className,
  sidebarOpen = true,
}) => {
  const containerStyles = twMerge(
    'h-screen bg-background-offwhite flex',
    className
  );

  const sidebarStyles = twMerge(
    'w-64 bg-white border-r border-border-light flex-shrink-0 transition-all duration-300',
    !sidebarOpen && 'w-0'
  );

  const mainStyles = 'flex-1 flex flex-col min-w-0';
  
  const headerStyles = 'h-16 bg-white border-b border-border-light flex-shrink-0';
  
  const contentStyles = 'flex-1 overflow-auto p-6';

  return (
    <div className={containerStyles}>
      <div className={sidebarStyles}>
        {sidebarOpen && sidebar}
      </div>
      <div className={mainStyles}>
        <div className={headerStyles}>
          {header}
        </div>
        <div className={contentStyles}>
          {children}
        </div>
      </div>
    </div>
  );
};

AppShell.propTypes = {
  /** Main content */
  children: PropTypes.node.isRequired,
  /** Sidebar content */
  sidebar: PropTypes.node,
  /** Header content */
  header: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Whether the sidebar is open */
  sidebarOpen: PropTypes.bool,
};

export default AppShell;
