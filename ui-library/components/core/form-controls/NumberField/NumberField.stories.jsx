import React, { useState } from 'react';
import { NumberField } from './index';

export default {
  title: 'Form Controls/NumberField',
  component: NumberField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'NumberField component for numerical input with validation and increment/decrement controls.'
      }
    }
  },
  argTypes: {
    value: {
      control: 'number',
      description: 'Current value (controlled)'
    },
    onChange: {
      action: 'changed',
      description: 'Change handler'
    },
    min: {
      control: 'number',
      description: 'Minimum allowed value'
    },
    max: {
      control: 'number',
      description: 'Maximum allowed value'
    },
    step: {
      control: 'number',
      description: 'Step increment/decrement value'
    },
    precision: {
      control: 'number',
      description: 'Number of decimal places'
    },
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
      description: 'Size variant'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the field is disabled'
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Whether the field is read-only'
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the field is invalid'
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the field is required'
    },
    showControls: {
      control: 'boolean',
      description: 'Whether to show increment/decrement controls'
    },
    allowMouseWheel: {
      control: 'boolean',
      description: 'Whether to allow mouse wheel to increment/decrement'
    }
  }
};

// Basic number field
export const Basic = () => (
  <NumberField
    label="Quantity"
    placeholder="Enter quantity"
    defaultValue={5}
  />
);

// With min/max constraints
export const WithMinMax = () => (
  <NumberField
    label="Quantity (1-10)"
    defaultValue={5}
    min={1}
    max={10}
    helperText="Value must be between 1 and 10"
  />
);

// With step increment
export const WithStep = () => (
  <NumberField
    label="Amount"
    defaultValue={50}
    step={10}
    helperText="Increments/decrements by 10"
  />
);

// With precision (decimal places)
export const WithPrecision = () => (
  <NumberField
    label="Price"
    defaultValue={19.99}
    precision={2}
    step={0.1}
    helperText="Two decimal places"
  />
);

// Different sizes
export const Sizes = () => (
  <div className="space-y-4">
    <NumberField
      label="Small"
      defaultValue={5}
      size="sm"
    />
    <NumberField
      label="Medium (default)"
      defaultValue={5}
      size="md"
    />
    <NumberField
      label="Large"
      defaultValue={5}
      size="lg"
    />
  </div>
);

// States
export const States = () => (
  <div className="space-y-4">
    <NumberField
      label="Default"
      defaultValue={5}
    />
    <NumberField
      label="Disabled"
      defaultValue={5}
      isDisabled
    />
    <NumberField
      label="Read-only"
      defaultValue={5}
      isReadOnly
    />
    <NumberField
      label="Invalid"
      defaultValue={5}
      isInvalid
      errorText="This field has an error"
    />
    <NumberField
      label="Required"
      isRequired
    />
  </div>
);

// Without controls
export const WithoutControls = () => (
  <NumberField
    label="Quantity"
    defaultValue={5}
    showControls={false}
    helperText="No increment/decrement controls"
  />
);

// With formatting options
export const WithFormatting = () => (
  <div className="space-y-4">
    <NumberField
      label="Currency (USD)"
      defaultValue={1234.56}
      precision={2}
      formatOptions={{
        style: 'currency',
        currency: 'USD'
      }}
    />
    <NumberField
      label="Currency (EUR)"
      defaultValue={1234.56}
      precision={2}
      formatOptions={{
        style: 'currency',
        currency: 'EUR'
      }}
    />
    <NumberField
      label="Percentage"
      defaultValue={0.25}
      step={0.01}
      precision={2}
      formatOptions={{
        style: 'percent'
      }}
    />
    <NumberField
      label="With thousand separators"
      defaultValue={1234567.89}
      precision={2}
      formatOptions={{
        useGrouping: true
      }}
    />
  </div>
);

// Controlled example
export const Controlled = () => {
  const [value, setValue] = useState(5);
  
  return (
    <div className="space-y-4">
      <NumberField
        label="Controlled NumberField"
        value={value}
        onChange={setValue}
        min={0}
        max={10}
      />
      
      <div className="p-3 bg-gray-100 rounded-md">
        <p className="text-sm text-text-secondary">Current value: {value}</p>
        <div className="mt-2 flex space-x-2">
          <button
            onClick={() => setValue(Math.max(0, value - 1))}
            className="px-3 py-1 bg-primary text-white text-sm rounded-md"
          >
            Decrement
          </button>
          <button
            onClick={() => setValue(Math.min(10, value + 1))}
            className="px-3 py-1 bg-primary text-white text-sm rounded-md"
          >
            Increment
          </button>
          <button
            onClick={() => setValue(5)}
            className="px-3 py-1 border border-border-medium text-text-primary text-sm rounded-md"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

// Real-world examples
export const ProductQuantity = () => (
  <div className="max-w-md p-6 border border-border-light rounded-lg bg-white">
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
        <span className="material-icons text-2xl text-text-secondary">inventory_2</span>
      </div>
      <div>
        <h3 className="text-lg font-medium text-text-primary">Premium Headphones</h3>
        <p className="text-sm text-text-secondary">$129.99</p>
      </div>
    </div>
    
    <div className="mt-6 space-y-4">
      <NumberField
        label="Quantity"
        defaultValue={1}
        min={1}
        max={10}
        helperText="Maximum 10 per order"
      />
      
      <button className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
        Add to Cart
      </button>
    </div>
  </div>
);

export const PriceRangeFilter = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  
  return (
    <div className="max-w-md p-6 border border-border-light rounded-lg bg-white">
      <h3 className="text-lg font-medium text-text-primary mb-4">Price Range Filter</h3>
      
      <div className="space-y-4">
        <NumberField
          label="Minimum Price"
          value={minPrice}
          onChange={(value) => {
            setMinPrice(value === '' ? 0 : value);
          }}
          min={0}
          max={maxPrice}
          formatOptions={{
            style: 'currency',
            currency: 'USD'
          }}
          precision={0}
        />
        
        <NumberField
          label="Maximum Price"
          value={maxPrice}
          onChange={(value) => {
            setMaxPrice(value === '' ? 0 : value);
          }}
          min={minPrice}
          formatOptions={{
            style: 'currency',
            currency: 'USD'
          }}
          precision={0}
        />
        
        <div className="pt-4">
          <button className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  
  // Mock exchange rates
  const exchangeRates = {
    USD: {
      EUR: 0.92,
      GBP: 0.79,
      JPY: 149.50,
    },
    EUR: {
      USD: 1.09,
      GBP: 0.86,
      JPY: 162.50,
    },
    GBP: {
      USD: 1.27,
      EUR: 1.16,
      JPY: 189.20,
    },
    JPY: {
      USD: 0.0067,
      EUR: 0.0062,
      GBP: 0.0053,
    }
  };
  
  const convert = () => {
    if (fromCurrency === toCurrency) return amount;
    return amount * exchangeRates[fromCurrency][toCurrency];
  };
  
  return (
    <div className="max-w-md p-6 border border-border-light rounded-lg bg-white">
      <h3 className="text-lg font-medium text-text-primary mb-4">Currency Converter</h3>
      
      <div className="space-y-4">
        <NumberField
          label="Amount"
          value={amount}
          onChange={setAmount}
          min={0}
          step={10}
          precision={2}
          formatOptions={{
            style: 'currency',
            currency: fromCurrency
          }}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">From</label>
            <select 
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">To</label>
            <select 
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-border-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-md mt-4">
          <div className="text-sm text-text-secondary">Converted Amount:</div>
          <div className="text-lg font-medium text-text-primary mt-1">
            {new Intl.NumberFormat(undefined, {
              style: 'currency',
              currency: toCurrency
            }).format(convert())}
          </div>
          <div className="text-xs text-text-secondary mt-2">
            Exchange Rate: 1 {fromCurrency} = {
              new Intl.NumberFormat(undefined, {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 4
              }).format(exchangeRates[fromCurrency][toCurrency])
            } {toCurrency}
          </div>
        </div>
      </div>
    </div>
  );
};
