import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * Card component
 * A versatile container for displaying content following the Atavya design system
 * 
 * Uses Tailwind theme colors directly for consistent styling across the application.
 * 
 * @component
 * @example
 * ```jsx
 * <Card>
 *   <Card.Header>Card Title</Card.Header>
 *   <Card.Body>Card content goes here</Card.Body>
 *   <Card.Footer>Card footer</Card.Footer>
 * </Card>
 * ```
 */
const Card = forwardRef(({
  // Content
  children,
  
  // Display options
  variant = 'default',
  size = 'md',
  bordered = true,
  elevated = false,
  hoverable = false,
  
  // Layout options
  horizontal = false,
  fullWidth = false,
  
  // Action
  onClick,
  clickable = false,
  
  // Styling
  className,
  
  // Other props
  ...rest
}, ref) => {
  // Get variant-specific styling
  const getVariantClasses = () => {
    const variantStyles = {
      default: 'bg-white',
      primary: 'bg-primary-light',
      secondary: 'bg-background-offwhite',
      research: 'bg-status-research bg-opacity-15',
      campaign: 'bg-status-campaign bg-opacity-15',
      copywriting: 'bg-status-copywriting bg-opacity-15',
      live: 'bg-status-live bg-opacity-15',
      management: 'bg-status-management bg-opacity-15',
      request: 'bg-status-request bg-opacity-15',
    };
    
    return variantStyles[variant] || variantStyles.default;
  };
  
  // Get size-specific styling
  const getSizeClasses = () => {
    const sizeStyles = {
      sm: 'p-s',
      md: 'p-m',
      lg: 'p-l',
    };
    
    return sizeStyles[size] || sizeStyles.md;
  };
  
  // Combine all classes
  const cardClasses = twMerge(
    'rounded-md overflow-hidden',
    getVariantClasses(),
    getSizeClasses(),
    bordered && 'border border-border-light',
    elevated && 'shadow-sm',
    hoverable && !clickable && 'hover:border-border-medium transition-colors duration-150',
    clickable && 'cursor-pointer hover:border-border-medium transition-all duration-150',
    horizontal && 'flex',
    fullWidth && 'w-full',
    className
  );
  
  return (
    <div
      ref={ref}
      className={cardClasses}
      onClick={clickable || onClick ? onClick : undefined}
      role={clickable || onClick ? 'button' : undefined}
      tabIndex={clickable || onClick ? 0 : undefined}
      {...rest}
    >
      {children}
    </div>
  );
});

/**
 * Card Header component
 */
const CardHeader = ({
  children,
  className,
  ...rest
}) => {
  const headerClasses = twMerge(
    'px-m py-s border-b border-border-light font-medium',
    className
  );
  
  return (
    <div className={headerClasses} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card Body component
 */
const CardBody = ({
  children,
  className,
  ...rest
}) => {
  const bodyClasses = twMerge(
    'p-m',
    className
  );
  
  return (
    <div className={bodyClasses} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card Footer component
 */
const CardFooter = ({
  children,
  className,
  ...rest
}) => {
  const footerClasses = twMerge(
    'px-m py-s border-t border-border-light bg-background-offwhite',
    className
  );
  
  return (
    <div className={footerClasses} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card Image component
 */
const CardImage = ({
  src,
  alt = '',
  position = 'top',
  className,
  ...rest
}) => {
  const imageClasses = twMerge(
    'w-full',
    className
  );
  
  return (
    <img
      src={src}
      alt={alt}
      className={imageClasses}
      {...rest}
    />
  );
};

/**
 * Card Title component
 */
const CardTitle = ({
  children,
  className,
  as: Component = 'h3',
  ...rest
}) => {
  const titleClasses = twMerge(
    'text-xl font-semibold text-text-primary',
    className
  );
  
  return (
    <Component className={titleClasses} {...rest}>
      {children}
    </Component>
  );
};

/**
 * Card Subtitle component
 */
const CardSubtitle = ({
  children,
  className,
  as: Component = 'h4',
  ...rest
}) => {
  const subtitleClasses = twMerge(
    'text-sm text-text-secondary mt-1',
    className
  );
  
  return (
    <Component className={subtitleClasses} {...rest}>
      {children}
    </Component>
  );
};

/**
 * Card Text component
 */
const CardText = ({
  children,
  className,
  ...rest
}) => {
  const textClasses = twMerge(
    'text-text-primary',
    className
  );
  
  return (
    <p className={textClasses} {...rest}>
      {children}
    </p>
  );
};

/**
 * Card Actions component
 */
const CardActions = ({
  children,
  className,
  ...rest
}) => {
  const actionsClasses = twMerge(
    'flex gap-2 mt-3',
    className
  );
  
  return (
    <div className={actionsClasses} {...rest}>
      {children}
    </div>
  );
};

// Set display names for all components
Card.displayName = 'Card';
CardHeader.displayName = 'Card.Header';
CardBody.displayName = 'Card.Body';
CardFooter.displayName = 'Card.Footer';
CardImage.displayName = 'Card.Image';
CardTitle.displayName = 'Card.Title';
CardSubtitle.displayName = 'Card.Subtitle';
CardText.displayName = 'Card.Text';
CardActions.displayName = 'Card.Actions';

// Attach subcomponents to Card
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = CardImage;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Text = CardText;
Card.Actions = CardActions;

// PropTypes
Card.propTypes = {
  /** Card content */
  children: PropTypes.node,
  /** Visual style variant */
  variant: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'research',
    'campaign',
    'copywriting',
    'live',
    'management',
    'request'
  ]),
  /** Card size */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Whether to show a border */
  bordered: PropTypes.bool,
  /** Whether to add a shadow */
  elevated: PropTypes.bool,
  /** Whether to show hover effects */
  hoverable: PropTypes.bool,
  /** Whether to display content horizontally */
  horizontal: PropTypes.bool,
  /** Whether the card takes full width */
  fullWidth: PropTypes.bool,
  /** Click handler */
  onClick: PropTypes.func,
  /** Whether the card is clickable */
  clickable: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

CardHeader.propTypes = {
  /** Header content */
  children: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
};

CardBody.propTypes = {
  /** Body content */
  children: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
};

CardFooter.propTypes = {
  /** Footer content */
  children: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
};

CardImage.propTypes = {
  /** Image source URL */
  src: PropTypes.string.isRequired,
  /** Image alt text */
  alt: PropTypes.string,
  /** Image position */
  position: PropTypes.oneOf(['top', 'bottom']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

CardTitle.propTypes = {
  /** Title content */
  children: PropTypes.node,
  /** HTML element to use */
  as: PropTypes.elementType,
  /** Additional CSS classes */
  className: PropTypes.string,
};

CardSubtitle.propTypes = {
  /** Subtitle content */
  children: PropTypes.node,
  /** HTML element to use */
  as: PropTypes.elementType,
  /** Additional CSS classes */
  className: PropTypes.string,
};

CardText.propTypes = {
  /** Text content */
  children: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
};

CardActions.propTypes = {
  /** Actions content */
  children: PropTypes.node,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Card;
