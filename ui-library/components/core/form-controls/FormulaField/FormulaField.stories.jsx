import React, { useState } from 'react';
import FormulaField from './FormulaField';
import Input from '../Input/Input';
import NumberField from '../NumberField/NumberField';

export default {
  title: 'Form Controls/FormulaField',
  component: FormulaField,
  parameters: {
    docs: {
      description: {
        component: 'A field component for displaying calculated values based on formulas.',
      },
    },
  },
};

// Basic example
export const Basic = () => (
  <FormulaField
    label="Total"
    formula={(values) => values.price * values.quantity}
    dependencies={{ price: 10, quantity: 5 }}
  />
);

// With formatted result
export const FormattedResult = () => (
  <FormulaField
    label="Total Price"
    formula={(values) => values.price * values.quantity}
    dependencies={{ price: 29.99, quantity: 3 }}
    formatResult={(value) => `$${value.toFixed(2)}`}
  />
);

// Interactive example with dependencies
export const Interactive = () => {
  const [price, setPrice] = useState(25);
  const [quantity, setQuantity] = useState(4);
  const [discount, setDiscount] = useState(10);
  
  // Calculate subtotal, discount amount, and final total
  const calculateSubtotal = (values) => values.price * values.quantity;
  const calculateDiscountAmount = (values) => (values.price * values.quantity) * (values.discount / 100);
  const calculateTotal = (values) => (values.price * values.quantity) * (1 - values.discount / 100);
  
  return (
    <div className="p-4 border rounded max-w-md">
      <h2 className="text-lg font-medium mb-4">Order Calculator</h2>
      
      <div className="space-y-4">
        <NumberField
          label="Price per unit"
          value={price}
          onChange={(value) => setPrice(value)}
          min={0}
          step={0.01}
          formatOptions={{ style: 'currency', currency: 'USD' }}
        />
        
        <NumberField
          label="Quantity"
          value={quantity}
          onChange={(value) => setQuantity(value)}
          min={1}
          step={1}
        />
        
        <NumberField
          label="Discount (%)"
          value={discount}
          onChange={(value) => setDiscount(value)}
          min={0}
          max={100}
          step={1}
          formatOptions={{ style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 }}
        />
        
        <div className="pt-4 border-t">
          <FormulaField
            label="Subtotal"
            formula={calculateSubtotal}
            dependencies={{ price, quantity }}
            formatResult={(value) => `$${value.toFixed(2)}`}
          />
          
          <FormulaField
            label="Discount Amount"
            formula={calculateDiscountAmount}
            dependencies={{ price, quantity, discount }}
            formatResult={(value) => `$${value.toFixed(2)}`}
            showFormula={true}
          />
          
          <FormulaField
            label="Total"
            formula={calculateTotal}
            dependencies={{ price, quantity, discount }}
            formatResult={(value) => `$${value.toFixed(2)}`}
            className="mt-2 font-bold"
          />
        </div>
      </div>
    </div>
  );
};

// With formula display
export const WithFormulaDisplay = () => (
  <div className="space-y-4">
    <FormulaField
      label="Area of a Circle"
      formula={(values) => Math.PI * Math.pow(values.radius, 2)}
      dependencies={{ radius: 5 }}
      formatResult={(value) => `${value.toFixed(2)} square units`}
      showFormula={true}
      formulaDisplay="π × radius²"
    />
    
    <FormulaField
      label="Compound Interest"
      formula={(values) => values.principal * Math.pow(1 + values.rate / 100, values.time)}
      dependencies={{ principal: 1000, rate: 5, time: 3 }}
      formatResult={(value) => `$${value.toFixed(2)}`}
      showFormula={true}
      formulaDisplay="principal × (1 + rate/100)^time"
    />
  </div>
);

// Different sizes
export const Sizes = () => (
  <div className="space-y-4">
    <FormulaField
      label="Small Size"
      formula={(values) => values.a + values.b}
      dependencies={{ a: 10, b: 20 }}
      size="sm"
    />
    
    <FormulaField
      label="Medium Size (Default)"
      formula={(values) => values.a + values.b}
      dependencies={{ a: 10, b: 20 }}
      size="md"
    />
    
    <FormulaField
      label="Large Size"
      formula={(values) => values.a + values.b}
      dependencies={{ a: 10, b: 20 }}
      size="lg"
    />
  </div>
);

// With error state
export const WithError = () => (
  <FormulaField
    label="Division"
    formula={(values) => values.a / values.b}
    dependencies={{ a: 10, b: 0 }}
    error="Cannot divide by zero"
  />
);

// Complex formula example
export const ComplexFormula = () => {
  // Loan calculator
  const calculateMonthlyPayment = (values) => {
    const principal = values.loanAmount;
    const monthlyRate = values.interestRate / 100 / 12;
    const numberOfPayments = values.loanTerm * 12;
    
    if (monthlyRate === 0) return principal / numberOfPayments;
    
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    );
  };
  
  return (
    <FormulaField
      label="Monthly Mortgage Payment"
      formula={calculateMonthlyPayment}
      dependencies={{ loanAmount: 300000, interestRate: 4.5, loanTerm: 30 }}
      formatResult={(value) => `$${value.toFixed(2)}`}
      showFormula={true}
      formulaDisplay="P × [r(1+r)^n] / [(1+r)^n - 1]"
      description="Where P = principal, r = monthly rate, n = number of payments"
    />
  );
};

// In a form context
export const InFormContext = () => {
  const [formData, setFormData] = useState({
    length: 10,
    width: 5,
    height: 3,
  });
  
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  
  return (
    <div className="p-4 border rounded max-w-md">
      <h2 className="text-lg font-medium mb-4">Box Dimensions</h2>
      
      <div className="space-y-4">
        <NumberField
          label="Length"
          value={formData.length}
          onChange={(value) => handleChange('length', value)}
          min={0}
          step={0.1}
        />
        
        <NumberField
          label="Width"
          value={formData.width}
          onChange={(value) => handleChange('width', value)}
          min={0}
          step={0.1}
        />
        
        <NumberField
          label="Height"
          value={formData.height}
          onChange={(value) => handleChange('height', value)}
          min={0}
          step={0.1}
        />
        
        <div className="pt-4 border-t space-y-3">
          <FormulaField
            label="Surface Area"
            formula={(values) => 2 * (
              values.length * values.width +
              values.length * values.height +
              values.width * values.height
            )}
            dependencies={formData}
            formatResult={(value) => `${value.toFixed(2)} square units`}
            showFormula={true}
            formulaDisplay="2(lw + lh + wh)"
          />
          
          <FormulaField
            label="Volume"
            formula={(values) => values.length * values.width * values.height}
            dependencies={formData}
            formatResult={(value) => `${value.toFixed(2)} cubic units`}
            showFormula={true}
            formulaDisplay="l × w × h"
          />
        </div>
      </div>
    </div>
  );
};
