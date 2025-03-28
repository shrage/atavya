import React from 'react';
import PropTypes from 'prop-types';

/**
 * SkeletonLoader component for displaying placeholder loading states
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 */
const SkeletonLoader = ({
  variant = 'rectangle',
  width,
  height,
  size,
  rounded = 'md',
  animation = 'pulse',
  className = '',
  lines = 1,
  spacing = 'md',
  isLoading = true,
  children,
}) => {
  // Don't render skeleton if not loading
  if (!isLoading) {
    return children || null;
  }
  
  // Size presets (for common use cases)
  const sizePresets = {
    avatar: {
      width: '40px',
      height: '40px',
      rounded: 'full',
      variant: 'circle',
    },
    avatarSm: {
      width: '32px',
      height: '32px',
      rounded: 'full',
      variant: 'circle',
    },
    avatarLg: {
      width: '56px',
      height: '56px',
      rounded: 'full',
      variant: 'circle',
    },
    text: {
      width: '100%',
      height: '1rem',
      rounded: 'md',
      variant: 'rectangle',
    },
    heading: {
      width: '50%',
      height: '1.5rem',
      rounded: 'md',
      variant: 'rectangle',
    },
    button: {
      width: '100px',
      height: '2.5rem',
      rounded: 'md',
      variant: 'rectangle',
    },
    thumbnail: {
      width: '100px',
      height: '100px',
      rounded: 'md',
      variant: 'rectangle',
    },
    card: {
      width: '100%',
      height: '120px',
      rounded: 'lg',
      variant: 'rectangle',
    },
  };
  
  // Rounding classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };
  
  // Animation classes
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    none: '',
  };
  
  // Spacing between multiple lines
  const spacingClasses = {
    sm: 'space-y-1',
    md: 'space-y-2',
    lg: 'space-y-3',
  };
  
  // Apply preset if size is provided
  const presetStyles = size && sizePresets[size] ? sizePresets[size] : {};
  
  // Merge preset with props (props take precedence)
  const variantFinal = variant || presetStyles.variant;
  const widthFinal = width || presetStyles.width;
  const heightFinal = height || presetStyles.height;
  const roundedFinal = rounded || presetStyles.rounded;
  
  // Style object for custom width/height
  const customStyles = {
    width: widthFinal,
    height: heightFinal,
  };
  
  // Create a single skeleton element
  const skeletonElement = (key = 0) => (
    <div
      key={key}
      className={`
        bg-background-skeleton dark:bg-background-skeleton-dark
        ${roundedClasses[roundedFinal] || roundedClasses.md}
        ${animationClasses[animation] || animationClasses.pulse}
        ${className}
      `}
      style={customStyles}
    />
  );
  
  // Special rendering for circle variant
  if (variantFinal === 'circle') {
    return skeletonElement();
  }
  
  // Render multiple lines if specified
  if (lines > 1) {
    return (
      <div className={`${spacingClasses[spacing] || spacingClasses.md}`}>
        {Array.from({ length: lines }).map((_, index) => (
          skeletonElement(index)
        ))}
      </div>
    );
  }
  
  // Default single line
  return skeletonElement();
};

SkeletonLoader.propTypes = {
  /** Skeleton shape */
  variant: PropTypes.oneOf(['rectangle', 'circle', 'text']),
  /** Custom width (any valid CSS width) */
  width: PropTypes.string,
  /** Custom height (any valid CSS height) */
  height: PropTypes.string,
  /** Preset sizes for common use cases */
  size: PropTypes.oneOf([
    'avatar', 'avatarSm', 'avatarLg', 
    'text', 'heading', 'button', 
    'thumbnail', 'card'
  ]),
  /** Border radius style */
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', 'full']),
  /** Loading animation style */
  animation: PropTypes.oneOf(['pulse', 'wave', 'none']),
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Number of lines to display */
  lines: PropTypes.number,
  /** Spacing between multiple lines */
  spacing: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Whether the content is currently loading */
  isLoading: PropTypes.bool,
  /** Content to show when not loading */
  children: PropTypes.node,
};

export default SkeletonLoader;
