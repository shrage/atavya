import React from 'react';
import ProgressIndicator from './ProgressIndicator';

export default {
  title: "Feedback/ProgressIndicator",
  component: ProgressIndicator,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: { type: 'number', min: 1, max: 100 } },
  },
};

const Template = (args) => <ProgressIndicator {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 60,
  max: 100,
  variant: 'linear',
  size: 'md',
  color: 'primary',
  showPercentage: true,
};

export const LinearWithLabel = Template.bind({});
LinearWithLabel.args = {
  value: 75,
  label: 'Uploading files...',
  showPercentage: true,
  variant: 'linear',
};

export const LinearSizes = () => (
  <div className="flex flex-col space-y-4">
    <ProgressIndicator value={70} size="xs" label="Extra Small" labelPosition="left" />
    <ProgressIndicator value={70} size="sm" label="Small" labelPosition="left" />
    <ProgressIndicator value={70} size="md" label="Medium" labelPosition="left" />
    <ProgressIndicator value={70} size="lg" label="Large" labelPosition="left" />
    <ProgressIndicator value={70} size="xl" label="Extra Large" labelPosition="left" />
  </div>
);

export const LinearColors = () => (
  <div className="flex flex-col space-y-4">
    <ProgressIndicator value={70} color="primary" label="Primary" labelPosition="left" />
    <ProgressIndicator value={70} color="secondary" label="Secondary" labelPosition="left" />
    <ProgressIndicator value={70} color="success" label="Success" labelPosition="left" />
    <ProgressIndicator value={70} color="danger" label="Danger" labelPosition="left" />
    <ProgressIndicator value={70} color="warning" label="Warning" labelPosition="left" />
    <ProgressIndicator value={70} color="info" label="Info" labelPosition="left" />
    <ProgressIndicator value={70} color="gray" label="Gray" labelPosition="left" />
  </div>
);

export const LinearLabelPositions = () => (
  <div className="space-y-8">
    <ProgressIndicator value={70} label="Label on right" labelPosition="right" showPercentage />
    <ProgressIndicator value={70} label="Label on left" labelPosition="left" showPercentage />
    <ProgressIndicator value={70} label="Label on top" labelPosition="top" showPercentage />
    <ProgressIndicator value={70} label="Label on bottom" labelPosition="bottom" showPercentage />
  </div>
);

export const CircularBasic = Template.bind({});
CircularBasic.args = {
  value: 75,
  variant: 'circular',
  showPercentage: true,
};

export const CircularWithLabel = Template.bind({});
CircularWithLabel.args = {
  value: 60,
  variant: 'circular',
  label: 'Progress',
  showPercentage: true,
};

export const CircularSizes = () => (
  <div className="flex flex-wrap gap-6 items-end">
    <ProgressIndicator value={70} variant="circular" size="xs" showPercentage={false} />
    <ProgressIndicator value={70} variant="circular" size="sm" showPercentage />
    <ProgressIndicator value={70} variant="circular" size="md" showPercentage />
    <ProgressIndicator value={70} variant="circular" size="lg" showPercentage />
    <ProgressIndicator value={70} variant="circular" size="xl" showPercentage />
  </div>
);

export const CircularColors = () => (
  <div className="flex flex-wrap gap-6">
    <ProgressIndicator value={70} variant="circular" color="primary" showPercentage />
    <ProgressIndicator value={70} variant="circular" color="secondary" showPercentage />
    <ProgressIndicator value={70} variant="circular" color="success" showPercentage />
    <ProgressIndicator value={70} variant="circular" color="danger" showPercentage />
    <ProgressIndicator value={70} variant="circular" color="warning" showPercentage />
    <ProgressIndicator value={70} variant="circular" color="info" showPercentage />
    <ProgressIndicator value={70} variant="circular" color="gray" showPercentage />
  </div>
);

export const CircularLabelPositions = () => (
  <div className="space-y-8">
    <ProgressIndicator 
      value={70} 
      variant="circular" 
      label="Label on right" 
      labelPosition="right" 
      showPercentage 
    />
    <ProgressIndicator 
      value={70} 
      variant="circular" 
      label="Label on left" 
      labelPosition="left" 
      showPercentage 
    />
    <ProgressIndicator 
      value={70} 
      variant="circular" 
      label="Label on top" 
      labelPosition="top" 
      showPercentage 
    />
    <ProgressIndicator 
      value={70} 
      variant="circular" 
      label="Label on bottom" 
      labelPosition="bottom" 
      showPercentage 
    />
  </div>
);

export const IndeterminateLinear = Template.bind({});
IndeterminateLinear.args = {
  indeterminate: true,
  variant: 'linear',
  label: 'Loading...',
};

export const IndeterminateCircular = Template.bind({});
IndeterminateCircular.args = {
  indeterminate: true,
  variant: 'circular',
  label: 'Loading...',
};

export const AnimatedProgress = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => 
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="space-y-8">
      <ProgressIndicator 
        value={progress} 
        animated 
        label="Animated Linear" 
        showPercentage 
      />
      
      <ProgressIndicator 
        value={progress} 
        variant="circular" 
        animated 
        label="Animated Circular" 
        showPercentage 
      />
    </div>
  );
};

export const CustomThickness = () => (
  <div className="flex flex-wrap gap-6">
    <ProgressIndicator 
      value={70} 
      variant="circular" 
      thickness={2} 
      label="Thin (2px)" 
      showPercentage 
    />
    <ProgressIndicator 
      value={70} 
      variant="circular" 
      thickness={8} 
      label="Thick (8px)" 
      showPercentage 
    />
    <ProgressIndicator 
      value={70} 
      variant="circular" 
      thickness={12} 
      label="Very Thick (12px)" 
      showPercentage 
    />
  </div>
);

