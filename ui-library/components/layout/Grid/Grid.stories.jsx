import React from 'react';
import { Grid, GridItem } from './index';

export default {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Grid layout system for creating responsive layouts.'
      }
    }
  },
  subcomponents: { GridItem }
};

// Helper component for grid examples
const GridBox = ({ children, className, ...props }) => (
  <div 
    className={`bg-primary/10 border border-primary/30 p-4 rounded flex items-center justify-center text-sm font-medium text-primary ${className || ''}`}
    {...props}
  >
    {children}
  </div>
);

// Basic grid
export const Default = () => (
  <Grid columns={3} gap={4}>
    <GridBox>1</GridBox>
    <GridBox>2</GridBox>
    <GridBox>3</GridBox>
    <GridBox>4</GridBox>
    <GridBox>5</GridBox>
    <GridBox>6</GridBox>
  </Grid>
);

// Grid with different column spans
export const ColumnSpans = () => (
  <Grid columns={12} gap={4}>
    <GridItem span={12}>
      <GridBox>span 12</GridBox>
    </GridItem>
    <GridItem span={6}>
      <GridBox>span 6</GridBox>
    </GridItem>
    <GridItem span={6}>
      <GridBox>span 6</GridBox>
    </GridItem>
    <GridItem span={4}>
      <GridBox>span 4</GridBox>
    </GridItem>
    <GridItem span={4}>
      <GridBox>span 4</GridBox>
    </GridItem>
    <GridItem span={4}>
      <GridBox>span 4</GridBox>
    </GridItem>
    <GridItem span={3}>
      <GridBox>span 3</GridBox>
    </GridItem>
    <GridItem span={3}>
      <GridBox>span 3</GridBox>
    </GridItem>
    <GridItem span={3}>
      <GridBox>span 3</GridBox>
    </GridItem>
    <GridItem span={3}>
      <GridBox>span 3</GridBox>
    </GridItem>
  </Grid>
);

// Responsive grid
export const Responsive = () => (
  <Grid columns={4} gap={4}>
    <GridItem span={4} spanMd={2} spanLg={1}>
      <GridBox>
        <div className="text-center">
          <div>Full width on small screens</div>
          <div>Half width on medium screens</div>
          <div>Quarter width on large screens</div>
        </div>
      </GridBox>
    </GridItem>
    <GridItem span={4} spanMd={2} spanLg={1}>
      <GridBox>
        <div className="text-center">
          <div>Full width on small screens</div>
          <div>Half width on medium screens</div>
          <div>Quarter width on large screens</div>
        </div>
      </GridBox>
    </GridItem>
    <GridItem span={4} spanMd={2} spanLg={1}>
      <GridBox>
        <div className="text-center">
          <div>Full width on small screens</div>
          <div>Half width on medium screens</div>
          <div>Quarter width on large screens</div>
        </div>
      </GridBox>
    </GridItem>
    <GridItem span={4} spanMd={2} spanLg={1}>
      <GridBox>
        <div className="text-center">
          <div>Full width on small screens</div>
          <div>Half width on medium screens</div>
          <div>Quarter width on large screens</div>
        </div>
      </GridBox>
    </GridItem>
  </Grid>
);

// Grid with different gaps
export const Gaps = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Gap: 0</h3>
      <Grid columns={3} gap={0}>
        <GridBox>1</GridBox>
        <GridBox>2</GridBox>
        <GridBox>3</GridBox>
        <GridBox>4</GridBox>
        <GridBox>5</GridBox>
        <GridBox>6</GridBox>
      </Grid>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Gap: 2</h3>
      <Grid columns={3} gap={2}>
        <GridBox>1</GridBox>
        <GridBox>2</GridBox>
        <GridBox>3</GridBox>
        <GridBox>4</GridBox>
        <GridBox>5</GridBox>
        <GridBox>6</GridBox>
      </Grid>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Gap: 8</h3>
      <Grid columns={3} gap={8}>
        <GridBox>1</GridBox>
        <GridBox>2</GridBox>
        <GridBox>3</GridBox>
        <GridBox>4</GridBox>
        <GridBox>5</GridBox>
        <GridBox>6</GridBox>
      </Grid>
    </div>
  </div>
);

// Grid with different column and row gaps
export const DifferentGaps = () => (
  <Grid columns={3} columnGap={8} rowGap={2}>
    <GridBox>1</GridBox>
    <GridBox>2</GridBox>
    <GridBox>3</GridBox>
    <GridBox>4</GridBox>
    <GridBox>5</GridBox>
    <GridBox>6</GridBox>
  </Grid>
);

// Grid with custom template columns
export const CustomTemplateColumns = () => (
  <Grid templateColumns="1fr 2fr 1fr" gap={4}>
    <GridBox>1fr</GridBox>
    <GridBox>2fr</GridBox>
    <GridBox>1fr</GridBox>
    <GridBox>1fr</GridBox>
    <GridBox>2fr</GridBox>
    <GridBox>1fr</GridBox>
  </Grid>
);

// Grid with positioning
export const Positioning = () => (
  <Grid columns={3} gap={4}>
    <GridItem start={1} end={3}>
      <GridBox>Start: 1, End: 3</GridBox>
    </GridItem>
    <GridItem>
      <GridBox>Default</GridBox>
    </GridItem>
    <GridItem start={1} span={2}>
      <GridBox>Start: 1, Span: 2</GridBox>
    </GridItem>
    <GridItem>
      <GridBox>Default</GridBox>
    </GridItem>
  </Grid>
);

// Grid with dense packing
export const DensePacking = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Normal Flow</h3>
      <Grid columns={3} gap={4} dense={false}>
        <GridItem span={1}>
          <GridBox>1</GridBox>
        </GridItem>
        <GridItem span={2}>
          <GridBox>2</GridBox>
        </GridItem>
        <GridItem span={2}>
          <GridBox>3</GridBox>
        </GridItem>
        <GridItem span={1}>
          <GridBox>4</GridBox>
        </GridItem>
      </Grid>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Dense Flow</h3>
      <Grid columns={3} gap={4} dense={true}>
        <GridItem span={1}>
          <GridBox>1</GridBox>
        </GridItem>
        <GridItem span={2}>
          <GridBox>2</GridBox>
        </GridItem>
        <GridItem span={2}>
          <GridBox>3</GridBox>
        </GridItem>
        <GridItem span={1}>
          <GridBox>4</GridBox>
        </GridItem>
      </Grid>
    </div>
  </div>
);

// Grid with alignment
export const Alignment = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Align Items: start</h3>
      <Grid columns={3} gap={4} alignItems="start" className="h-40">
        <GridBox className="h-full">Tall</GridBox>
        <GridBox>Normal</GridBox>
        <GridBox className="h-1/2">Medium</GridBox>
      </Grid>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Align Items: center</h3>
      <Grid columns={3} gap={4} alignItems="center" className="h-40">
        <GridBox className="h-full">Tall</GridBox>
        <GridBox>Normal</GridBox>
        <GridBox className="h-1/2">Medium</GridBox>
      </Grid>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Align Items: end</h3>
      <Grid columns={3} gap={4} alignItems="end" className="h-40">
        <GridBox className="h-full">Tall</GridBox>
        <GridBox>Normal</GridBox>
        <GridBox className="h-1/2">Medium</GridBox>
      </Grid>
    </div>
  </div>
);

// Grid with auto flow
export const AutoFlow = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Auto Flow: row (default)</h3>
      <Grid columns={3} gap={4} autoFlow="row">
        <GridItem rowSpan={2}>
          <GridBox className="h-full">Row Span 2</GridBox>
        </GridItem>
        <GridBox>2</GridBox>
        <GridBox>3</GridBox>
        <GridBox>4</GridBox>
        <GridBox>5</GridBox>
      </Grid>
    </div>
    
    <div>
      <h3 className="text-sm font-medium text-text-secondary mb-2">Auto Flow: column</h3>
      <Grid columns={3} gap={4} autoFlow="column">
        <GridItem rowSpan={2}>
          <GridBox className="h-full">Row Span 2</GridBox>
        </GridItem>
        <GridBox>2</GridBox>
        <GridBox>3</GridBox>
        <GridBox>4</GridBox>
        <GridBox>5</GridBox>
      </Grid>
    </div>
  </div>
);

// Grid with auto rows and columns
export const AutoSizing = () => (
  <Grid 
    templateColumns="repeat(3, 1fr)" 
    autoRows="minmax(100px, auto)"
    gap={4}
  >
    <GridBox>Auto height</GridBox>
    <GridBox className="h-40">Taller content</GridBox>
    <GridBox>Auto height</GridBox>
    <GridBox>Auto height</GridBox>
    <GridBox>Auto height</GridBox>
    <GridBox>Auto height</GridBox>
  </Grid>
);

// Complex layout example
export const ComplexLayout = () => (
  <Grid templateColumns="repeat(12, 1fr)" gap={4}>
    <GridItem colSpan={12}>
      <GridBox className="h-16">Header</GridBox>
    </GridItem>
    
    <GridItem colSpan={3}>
      <GridBox className="h-64">Sidebar</GridBox>
    </GridItem>
    
    <GridItem colSpan={9}>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem colSpan={3}>
          <GridBox className="h-24">Main Content Header</GridBox>
        </GridItem>
        
        <GridItem colSpan={2}>
          <GridBox className="h-32">Content Area 1</GridBox>
        </GridItem>
        
        <GridItem colSpan={1}>
          <GridBox className="h-32">Sidebar 1</GridBox>
        </GridItem>
        
        <GridItem colSpan={1}>
          <GridBox className="h-32">Sidebar 2</GridBox>
        </GridItem>
        
        <GridItem colSpan={2}>
          <GridBox className="h-32">Content Area 2</GridBox>
        </GridItem>
      </Grid>
    </GridItem>
    
    <GridItem colSpan={12}>
      <GridBox className="h-16">Footer</GridBox>
    </GridItem>
  </Grid>
);

// Real-world example: Dashboard layout
export const DashboardLayout = () => (
  <Grid templateColumns="repeat(12, 1fr)" gap={4}>
    <GridItem colSpan={12}>
      <div className="bg-white border border-border-light rounded-lg p-4 flex items-center justify-between">
        <div className="font-medium text-text-primary">Atavya Dashboard</div>
        <div className="flex items-center space-x-4">
          <button className="text-text-secondary hover:text-text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
            AT
          </div>
        </div>
      </div>
    </GridItem>
    
    <GridItem colSpan={12} spanLg={3}>
      <div className="bg-white border border-border-light rounded-lg p-4 h-full">
        <div className="font-medium text-text-primary mb-4">Navigation</div>
        <ul className="space-y-2">
          <li className="text-sm text-primary font-medium bg-primary/10 px-3 py-2 rounded">Dashboard</li>
          <li className="text-sm text-text-secondary px-3 py-2 hover:bg-gray-50 rounded">Projects</li>
          <li className="text-sm text-text-secondary px-3 py-2 hover:bg-gray-50 rounded">Tasks</li>
          <li className="text-sm text-text-secondary px-3 py-2 hover:bg-gray-50 rounded">Calendar</li>
          <li className="text-sm text-text-secondary px-3 py-2 hover:bg-gray-50 rounded">Reports</li>
          <li className="text-sm text-text-secondary px-3 py-2 hover:bg-gray-50 rounded">Settings</li>
        </ul>
      </div>
    </GridItem>
    
    <GridItem colSpan={12} spanMd={6} spanLg={3}>
      <div className="bg-white border border-border-light rounded-lg p-4">
        <div className="font-medium text-text-primary mb-2">Total Users</div>
        <div className="text-2xl font-bold text-text-primary">2,543</div>
        <div className="text-xs text-status-success mt-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
          12.5% increase
        </div>
      </div>
    </GridItem>
    
    <GridItem colSpan={12} spanMd={6} spanLg={3}>
      <div className="bg-white border border-border-light rounded-lg p-4">
        <div className="font-medium text-text-primary mb-2">Active Projects</div>
        <div className="text-2xl font-bold text-text-primary">18</div>
        <div className="text-xs text-status-warning mt-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
          </svg>
          3.2% decrease
        </div>
      </div>
    </GridItem>
    
    <GridItem colSpan={12} spanMd={6} spanLg={3}>
      <div className="bg-white border border-border-light rounded-lg p-4">
        <div className="font-medium text-text-primary mb-2">Completed Tasks</div>
        <div className="text-2xl font-bold text-text-primary">842</div>
        <div className="text-xs text-status-success mt-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
          8.7% increase
        </div>
      </div>
    </GridItem>
    
    <GridItem colSpan={12} spanLg={8}>
      <div className="bg-white border border-border-light rounded-lg p-4">
        <div className="font-medium text-text-primary mb-4">Recent Activity</div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-start pb-3 border-b border-border-light last:border-0 last:pb-0">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0"></div>
              <div className="ml-3">
                <div className="text-sm font-medium text-text-primary">User {i} completed a task</div>
                <div className="text-xs text-text-secondary mt-1">2 hours ago</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GridItem>
    
    <GridItem colSpan={12} spanLg={4}>
      <div className="bg-white border border-border-light rounded-lg p-4">
        <div className="font-medium text-text-primary mb-4">Upcoming Deadlines</div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center pb-3 border-b border-border-light last:border-0 last:pb-0">
              <div className={`h-2 w-2 rounded-full ${i === 1 ? 'bg-status-live' : i === 2 ? 'bg-status-warning' : 'bg-status-success'}`}></div>
              <div className="ml-3">
                <div className="text-sm font-medium text-text-primary">Project {i} Deadline</div>
                <div className="text-xs text-text-secondary mt-1">{i === 1 ? 'Tomorrow' : i === 2 ? '3 days' : '1 week'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GridItem>
  </Grid>
);
