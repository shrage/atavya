import React from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * RadioGroup component
 * 
 * A container for RadioButton components that manages the selection state.
 * 
 * @component
 * @example
 * ```jsx
 * <RadioGroup
 *   name="options"
 *   value={selectedValue}
 *   onChange={handleChange}
 *   label="Select an option"
 * >
 *   <RadioButton value="option1" label="Option 1" />
 *   <RadioButton value="option2" label="Option 2" />
 *   <RadioButton value="option3" label="Option 3" />
 * </RadioGroup>
 * ```
 */
const RadioGroup = ({
  children,
  name,
  value,
  defaultValue,
  onChange,
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  orientation = 'vertical',
  className,
  ...props
}) => {
  // Clone children and inject props
  const radioButtons = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        name,
        checked: child.props.value === value,
        disabled: disabled || child.props.disabled,
        required: required || child.props.required,
        error: error || child.props.error,
        onChange: (e) => {
          if (onChange) {
            onChange(e);
          }
          if (child.props.onChange) {
            child.props.onChange(e);
          }
        },
      });
    }
    return child;
  });

  return (
    <fieldset className={twMerge('', className)} {...props}>
      {label && (
        <legend 
          className={twMerge(
            'text-sm font-medium mb-2',
            error ? 'text-status-live' : 'text-text-primary',
            disabled && 'text-text-tertiary'
          )}
        >
          {label}
          {required && <span className="ml-1 text-status-live">*</span>}
        </legend>
      )}
      
      <div 
        className={twMerge(
          orientation === 'vertical' ? 'flex flex-col space-y-3' : 'flex flex-row space-x-6'
        )}
      >
        {radioButtons}
      </div>
      
      {helperText && (
        <p className={twMerge(
          'mt-2 text-sm',
          error ? 'text-status-live' : 'text-text-secondary'
        )}>
          {helperText}
        </p>
      )}
    </fieldset>
  );
};

RadioGroup.propTypes = {
  /** Radio button components */
  children: PropTypes.node.isRequired,
  /** Name attribute for all radio buttons in the group */
  name: PropTypes.string.isRequired,
  /** Currently selected value */
  value: PropTypes.string,
  /** Default selected value (uncontrolled component) */
  defaultValue: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
  /** Group label */
  label: PropTypes.node,
  /** Error message */
  error: PropTypes.string,
  /** Helper text to display below the group */
  helperText: PropTypes.node,
  /** Whether selection is required */
  required: PropTypes.bool,
  /** Whether the entire group is disabled */
  disabled: PropTypes.bool,
  /** Layout orientation of radio buttons */
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default RadioGroup;
