import React from 'react';
import BreadcrumbPath from './BreadcrumbPath';

export default {
  title: "Navigation/BreadcrumbPath",
  component: BreadcrumbPath,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onItemClick: { action: 'clicked' },
  },
};

const Template = (args) => <BreadcrumbPath {...args} />;

// Sample icons
const compassIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472c.08-.185.167-.36.264-.521z" clipRule="evenodd" />
  </svg>
);

const developmentIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M6.28 5.22a.75.75 0 010 1.06L2.56 10l3.72 3.72a.75.75 0 01-1.06 1.06L.97 10.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0zm7.44 0a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 010-1.06zM11.377 2.011a.75.75 0 01.612.867l-2.5 14.5a.75.75 0 01-1.478-.255l2.5-14.5a.75.75 0 01.866-.612z" clipRule="evenodd" />
  </svg>
);

const listIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M5.5 3a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 01.75-.75h5.5a.75.75 0 010 1.5h-5.5A.75.75 0 0111 4zm-1 3a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 0110 7zm-2 3a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 018 10zm2 3a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 0110 13z" />
  </svg>
);

const focusIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" />
  </svg>
);

export const Default = Template.bind({});
Default.args = {
  items: [
    { id: 'compass', label: 'Compass', icon: compassIcon },
    { id: 'development', label: 'Development', icon: developmentIcon },
    { id: 'lists', label: 'Lists', icon: listIcon },
    { id: 'focus', label: 'Main Focus', icon: focusIcon },
  ],
};

export const WithoutIcons = Template.bind({});
WithoutIcons.args = {
  items: [
    { id: 'compass', label: 'Compass' },
    { id: 'development', label: 'Development' },
    { id: 'lists', label: 'Lists' },
    { id: 'focus', label: 'Main Focus' },
  ],
};

export const WithCustomSeparator = Template.bind({});
WithCustomSeparator.args = {
  ...Default.args,
  separator: '›',
};

export const WithLimitedVisibility = Template.bind({});
WithLimitedVisibility.args = {
  items: [
    { id: 'root', label: 'Home' },
    { id: 'compass', label: 'Compass' },
    { id: 'development', label: 'Development' },
    { id: 'projects', label: 'Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'ui', label: 'UI Components' },
    { id: 'buttons', label: 'Buttons' },
  ],
  maxVisible: 5,
};

export const WithColoredItems = Template.bind({});
WithColoredItems.args = {
  items: [
    { id: 'compass', label: 'Compass', icon: compassIcon, color: 'orange' },
    { id: 'development', label: 'Development', icon: developmentIcon, color: 'blue' },
    { id: 'lists', label: 'Lists', icon: listIcon, color: 'green' },
    { id: 'focus', label: 'Main Focus', icon: focusIcon },
  ],
};

