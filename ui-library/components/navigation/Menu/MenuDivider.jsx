import React from 'react';
import PropTypes from 'prop-types';

/**
 * MenuDivider component for visually separating menu items following the Atavya design system
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 */
const MenuDivider = ({ className = '' }) => {
  return (
    <div 
      className={`my-1 border-t border-border-light dark:border-border-dark ${className}`}
      role="separator"
    />
  );
};

MenuDivider.propTypes = {
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default MenuDivider;
