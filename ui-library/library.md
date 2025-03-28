# Atavya UI Components Inventory

This document provides a comprehensive list of all UI components required for the Atavya platform, organized by category and with detailed behavior descriptions.

## Table of Contents

- [1. Core Components](#1-core-components) <span style="color:green">10</span>/<span style="color:red">19</span>
  - [1.1. Form Controls](#11-form-controls) <span style="color:green">3</span>/<span style="color:red">10</span>
  - [1.2. Display Components](#12-display-components) <span style="color:green">7</span>/<span style="color:red">9</span>
- [2. Data Components](#2-data-components) <span style="color:green">9</span>/<span style="color:red">19</span>
  - [2.1. List & Table Components](#21-list--table-components) <span style="color:green">7</span>/<span style="color:red">10</span>
  - [2.2. Configuration Components](#22-configuration-components) <span style="color:green">0</span>/<span style="color:red">4</span>
  - [2.3. Visualization Components](#23-visualization-components) <span style="color:green">2</span>/<span style="color:red">5</span>
- [3. Layout Components](#3-layout-components) <span style="color:green">4</span>/<span style="color:red">9</span>
- [4. Navigation Components](#4-navigation-components) <span style="color:green">6</span>/<span style="color:red">6</span>
- [5. Feedback Components](#5-feedback-components) <span style="color:green">9</span>/<span style="color:red">9</span>
- [6. Communication Components](#6-communication-components) <span style="color:green">3</span>/<span style="color:red">7</span>
- [7. View Components](#7-view-components) <span style="color:green">2</span>/<span style="color:red">8</span>
- [8. Industry-Specific Components](#8-industry-specific-components) <span style="color:green">3</span>/<span style="color:red">7</span>

## 1. Core Components

### 1.1. Form Controls

#### Button
- **Status**: ✅ Completed
- **Description**: Multi-purpose button component with Notion-inspired styling
- **Behavior**:
  - [x] Supports multiple variants: primary, secondary, outline, text
  - [x] Supports multiple sizes: sm, md, lg
  - [x] Can include leading/trailing icons
  - [ ] Can show loading state
  - [x] Can be disabled
  - [x] Supports keyboard navigation and accessibility
  - [ ] Can be rendered as different HTML elements (button, a, etc.)

#### Input
- **Status**: ✅ Completed
- **Description**: Text input field with various states and sizes
- **Behavior**:
  - [x] Supports different input types: text, email, password, number, etc.
  - [x] Includes label, helper text, and error message
  - [x] Can be disabled or read-only
  - [x] Can be required with validation
  - [ ] Supports leading/trailing icons or addons
  - [x] Notion-style focus and hover states

#### Select
- **Status**: ✅ Completed
- **Description**: Dropdown selection component
- **Behavior**:
  - [x] Can have a placeholder
  - [x] Supports disabled state
  - [x] Supports required validation
  - [x] Displays options in a dropdown menu
  - [ ] Supports option grouping
  - [ ] Supports multi-select (with tags)
  - [ ] Supports search/filtering in the dropdown

#### Checkbox
- **Description**: Checkbox input for boolean or multi-select options
- **Behavior**:
  - Can be checked, unchecked, or indeterminate
  - Can be disabled
  - Supports label and helper text
  - Can be part of a checkbox group
  - Supports validation

#### Radio
- **Description**: Radio button input for selecting one option from a group
- **Behavior**:
  - Can be selected or unselected
  - Can be disabled
  - Must be part of a radio group
  - Supports label and helper text
  - Supports validation

#### TextArea
- **Description**: Multi-line text input
- **Behavior**:
  - Auto-resizes based on content
  - Supports character count
  - Includes label, helper text, and error message
  - Can be disabled or read-only
  - Can be required with validation

#### Slider
- **Description**: Range slider for selecting numeric values
- **Behavior**:
  - Can have min/max values and step
  - Can display current value
  - Supports range selection (two handles)
  - Supports marks/ticks
  - Supports disabled state

#### Switch
- **Description**: Toggle switch for boolean options
- **Behavior**:
  - Can be on or off
  - Can be disabled
  - Animated state transition
  - Supports label and helper text

#### DatePicker
- **Description**: Component for selecting dates or date ranges
- **Behavior**:
  - Supports single date selection
  - Supports date range selection
  - Supports time selection
  - Has month and year navigation
  - Can restrict selectable dates
  - Supports keyboard navigation

#### ColorPicker
- **Description**: Component for selecting colors
- **Behavior**:
  - Displays color palette
  - Supports custom color input (hex, rgb, etc.)
  - Remembers recently used colors
  - Supports alpha channel

### 1.2. Display Components

#### Avatar
- **Status**: ✅ Completed
- **Description**: Visual representation of a user or entity
- **Behavior**:
  - [x] Can display image or initials
  - [x] Can have different sizes
  - [x] Shape variants (circle, square, rounded)
  - [x] Status indicators (online, away, busy, offline)
  - [x] Custom badges
  - [x] Borders and click interactions

#### FileUploader
- **Status**: ✅ Completed
- **Description**: Component for uploading files
- **Behavior**:
  - [x] Drag-and-drop functionality
  - [x] File preview with grid or list layouts
  - [x] File type validation and size restrictions
  - [x] Multiple file support with configurable limits
  - [x] Error handling and custom messaging
  - [x] Different visual variants (bordered, minimal, solid)
  - [x] Accessibility features and keyboard support

#### Tags
- **Description**: Component for displaying and managing tags
- **Behavior**:
  - Compact visual representation
  - Color coding
  - Add/remove functionality
  - Grouping
  - Search/filter by tag

#### StatusBadge
- **Status**: ✅ Completed
- **Description**: Colored badges to indicate status or category
- **Behavior**:
  - Visually distinct colors representing different statuses
  - Consistent styling with text labels
  - Configurable colors and text
  - Compact design optimized for lists and tables
  - Accessibility support for color meanings

#### BadgeCounter
- **Status**: ✅ Completed
- **Description**: Numerical indicators for counts
- **Behavior**:
  - Compact circular or pill display
  - Color coding for different categories
  - Overflow handling for large numbers
  - Optional animations for changes
  - Accessibility annotations

#### SkeletonLoader
- **Status**: ✅ Completed
- **Description**: Component for displaying loading states
- **Behavior**:
  - [x] Multiple variants (rectangle, circle, text)
  - [x] Preset sizes for common use cases (avatar, text, heading, button, card, etc.)
  - [x] Animation options (pulse, wave, none)
  - [x] Multi-line support for text placeholders
  - [x] Conditional rendering based on loading state

#### Tooltip
- **Status**: ✅ Completed
- **Description**: Small informational popup
- **Behavior**:
  - [x] Shows on hover or focus
  - [x] Multiple placement options
  - [x] Can contain text or rich content
  - [x] Automatic positioning based on screen edges
  - [x] Customizable delay and duration

#### MarkdownViewer
- **Description**: Component for rendering markdown content
- **Behavior**:
  - Renders all common markdown elements
  - Syntax highlighting for code blocks
  - Supports links and images
  - Properly handles tables
  - Can be themed

#### RichTextEditor
- **Description**: Notion-style rich text editor
- **Behavior**:
  - Supports basic formatting (bold, italic, underline)
  - Supports headings, lists, and quotes
  - Supports links and mentions
  - Supports code blocks with syntax highlighting
  - Slash command interface for inserting blocks
  - Supports images and embeds
  - Auto-save and version history
  - Collaborative editing support

## 2. Data Components

### 2.1. List & Table Components

#### BaseList
- **Status**: ✅ Completed
- **Description**: Foundation component for all list views
- **Behavior**:
  - Manages data fetching and pagination
  - Provides sorting functionality
  - Provides filtering functionality
  - Supports selection of items (single/multi)
  - Supports keyboard navigation
  - Handles loading, empty, and error states
  - Provides grouping capability with collapse/expand
  - Supports batch operations on selected items

#### BaseListItem
- **Status**: ✅ Completed
- **Description**: Base component for all list items
- **Behavior**:
  - Consistent styling and behavior across the app
  - Supports selection
  - Can show different states (active, hover, etc.)
  - Can show actions on hover
  - Supports drag and drop for reordering
  - Can be expanded/collapsed if containing sub-items

#### ListView
- **Status**: ✅ Completed
- **Description**: Specialized view for displaying data lists
- **Behavior**:
  - Configurable list item display
  - Sorting and filtering capabilities
  - Pagination integration
  - Selection features (single/multi)
  - Loading and empty states
  - Action support (item and batch)

#### ListConfigurationPanel
- **Status**: ✅ Completed
- **Description**: Side panel for configuring list settings
- **Behavior**:
  - Toggle between fields, views, filters, and sort panels
  - Field management (add, edit, hide, reorder fields)
  - Type-specific field configuration options
  - View management (save, update, share views)
  - Filter creation and management
  - Sort order configuration
  - Group by settings

#### DataTable
- **Status**: ✅ Completed (as part of DatabaseView)
- **Description**: Advanced table for displaying structured data
- **Behavior**:
  - Builds on BaseList functionality
  - Fixed or auto-sized columns
  - Column resizing and reordering
  - Cell-level customization
  - Header and footer customization
  - Row virtualization for performance
  - Excel-like keyboard navigation
  - Cell editing capabilities
  - Row and column spanning
  - Expandable rows for hierarchical data
  - CSV/Excel export

#### DataGrid
- **Description**: Grid layout for displaying data items as cards
- **Behavior**:
  - Builds on BaseList functionality
  - Responsive grid layout
  - Customizable card rendering
  - Supports different card sizes
  - Masonry layout option
  - Infinite scrolling support

#### KanbanBoard
- **Status**: ✅ Completed
- **Description**: Board for visualizing work in different stages
- **Behavior**:
  - Displays items in columns representing different states
  - Drag and drop between columns
  - Customizable column headers and item rendering
  - Collapsible columns
  - Column width adjustment
  - New item creation directly in board
  - Filtering and searching
  - WIP limits

#### TreeView
- **Description**: Hierarchical view for nested data
- **Behavior**:
  - Expandable/collapsible nodes
  - Custom node rendering
  - Search and filtering
  - Drag and drop for reordering
  - Lazy loading for large trees

#### CheckboxTree
- **Description**: Tree-structured checkboxes for completion or selection
- **Behavior**:
  - Visual hierarchy with indentation
  - Parent-child checkbox relationships
  - Automatic parent state updates based on children
  - Support for partial selection states
  - Keyboard navigation

#### HierarchicalTaskList
- **Description**: Specialized list for displaying parent-child task relationships
- **Behavior**:
  - Visual indentation to show hierarchy
  - Expandable/collapsible sections for parent tasks
  - Progress indicators for task completion
  - Drag and drop reordering within hierarchy
  - Bulk actions on parent tasks with children

### 2.2. Configuration Components

#### ViewSelector
- **Description**: Component for switching between saved views
- **Behavior**:
  - Shows available views
  - Indicates current view
  - Option to create new view
  - Option to update current view
  - View sharing indicators
  - Permissions indicators
  - Default view management

#### FilterBuilder
- **Description**: Interface for creating and managing filters
- **Behavior**:
  - Builds complex filter conditions
  - Field selection by type
  - Operator selection based on field type
  - Value input appropriate to field type
  - AND/OR logic groups
  - Save filters for reuse
  - Apply filters temporarily
  - Combine with saved filters
  - Clear all filters
  - Filter history

#### SortConfigurator
- **Description**: Interface for setting sort order
- **Behavior**:
  - Add multiple sort levels
  - Choose ascending/descending
  - Reorder sort priority
  - Save sort configurations
  - Apply temporarily
  - Clear sort settings
  - Quick sort by column

#### GroupByConfigurator
- **Description**: Interface for configuring grouping
- **Behavior**:
  - Select field to group by
  - Configure group order (ascending/descending)
  - Enable/disable collapsed groups by default
  - Configure nested grouping (multiple levels)
  - Show/hide group headers
  - Show counts and aggregations in group headers
  - Custom group naming

### 2.3. Visualization Components

#### Calendar
- **Status**: ✅ Completed (as part of ServiceCalendar)
- **Description**: Calendar view for time-based data
- **Behavior**:
  - Multiple views: day, week, month, agenda
  - Resource view (e.g., by user/technician)
  - Event creation/editing via drag and drop
  - Event resizing
  - Recurring events support
  - Time zone handling
  - External calendar integration

#### Timeline
- **Description**: Horizontal timeline for visualizing sequential data
- **Behavior**:
  - Zoomable time scale
  - Draggable items
  - Grouping by resources
  - Customizable item rendering
  - Markers for important dates
  - Today marker

#### Charts
- **Description**: Various chart types for data visualization
- **Behavior**:
  - Bar, line, pie, area, scatter, etc.
  - Responsive sizing
  - Interactive tooltips
  - Animation
  - Legend customization
  - Export as image

#### Pagination
- **Status**: ✅ Completed
- **Description**: Controls for navigating through paginated data
- **Behavior**:
  - Page navigation
  - Items per page selection
  - Displaying page info
  - Responsive design

#### Progress
- **Status**: ✅ Completed
- **Description**: Progress indicator for tasks or processes
- **Behavior**:
  - Shows progress percentage
  - Can include label
  - Multiple variants (linear, circular)

## 3. Layout Components

#### AppShell
- **Status**: ✅ Completed
- **Description**: Main application layout wrapper
- **Behavior**:
  - Contains sidebar, header, and content area
  - Responsive layout management
  - Manages fixed vs. fluid layout

#### Sidebar
- **Description**: Application navigation sidebar
- **Behavior**:
  - Can be expanded, collapsed, or hidden
  - Contains navigation links
  - Supports nested navigation
  - Shows active state
  - Responsive design

#### Header
- **Description**: Application header with controls and info
- **Behavior**:
  - Shows current section/page
  - Contains global actions
  - Shows user info and actions
  - Contains search
  - Has fixed positioning

#### TabLayout
- **Status**: ✅ Completed (as part of Tabs)
- **Description**: Tab-based layout for entity details
- **Behavior**:
  - Shows entity title and key info in header
  - Contains tabs for different aspects (details, comments, files, etc.)
  - Preserves tab state
  - Handles overflow with scrolling/dropdown

#### SplitPane
- **Description**: Resizable split view
- **Behavior**:
  - Divides space between two or more panels
  - Allows resizing via drag handle
  - Can be oriented horizontally or vertically
  - Can be nested for complex layouts

#### Card
- **Status**: ✅ Completed
- **Description**: Container for grouped content
- **Behavior**:
  - Consistent styling with title and content areas
  - Can have header, body, and footer sections
  - Can show actions
  - Can be elevated with shadow
  - Can show various loading states

#### GridLayout
- **Description**: Grid-based page layout
- **Behavior**:
  - Responsive grid with breakpoints
  - Auto-placement of items
  - Ordering control
  - Custom cell spanning

#### Accordion
- **Status**: ✅ Completed
- **Description**: Vertically stacked expandable sections
- **Behavior**:
  - [x] Sections can be expanded or collapsed
  - [x] Can have single or multiple sections open
  - [ ] Animated transitions
  - [x] Custom icons and positioning
  - [x] Various sizes and styles
  - [x] Disabled states

#### Drawer
- **Description**: Slide-out panel for secondary content
- **Behavior**:
  - Can slide from any edge (left, right, top, bottom)
  - Can be overlay or push content
  - Can be persistent or dismissible
  - Supports different sizes

## 4. Navigation Components

#### Breadcrumbs
- **Status**: ✅ Completed
- **Description**: JSX-based breadcrumb navigation with component composition
- **Behavior**:
  - Uses BreadcrumbItem child components for rendering each item
  - Automatically adds home item if not present
  - Supports clickable links with href attributes
  - Handles overflow with different collapse strategies (start, end, center)
  - Customizable separators and icons
  - SEO-friendly navigation with proper link structure

#### BreadcrumbPath
- **Status**: ✅ Completed
- **Description**: Data-driven breadcrumb navigation with simpler API
- **Behavior**:
  - Accepts array of item objects for dynamic path generation
  - Uses buttons with click handlers instead of links
  - Supports programmatic navigation through onItemClick callback
  - Customizable item styling with color options
  - Ideal for application interfaces with custom navigation patterns
  - More lightweight implementation for SPA navigation

#### Menu
- **Status**: ✅ Completed
- **Description**: Dropdown or context menu
- **Behavior**:
  - [x] Multiple trigger types (click, hover, context menu)
  - [x] Various placement options
  - [x] Support for controlled and uncontrolled usage
  - [x] Keyboard navigation and accessibility features
  - [x] MenuItems with icons, selection states, and disabled states
  - [x] MenuDivider for visual separation

#### Tabs
- **Status**: ✅ Completed
- **Description**: Horizontal tabs for switching between views
- **Behavior**:
  - Shows active state
  - Supports icons and badges
  - Handles overflow with scrolling/dropdown
  - Can be controlled or uncontrolled
  - URL integration

#### Stepper
- **Description**: Shows progress through a multi-step process
- **Behavior**:
  - Displays steps sequentially
  - Shows active, completed, and upcoming steps
  - Supports linear and non-linear flows
  - Can include descriptions and substeps

#### Pagination
- **Status**: ✅ Completed
- **Description**: Controls for navigating through pages
- **Behavior**:
  - Shows current page and total pages
  - Provides previous/next buttons
  - Allows jumping to specific pages
  - Handles large page counts with ellipsis

## 5. Feedback Components

#### Alert
- **Status**: ✅ Completed
- **Description**: Informational message
- **Behavior**:
  - Multiple variants: info, success, warning, error
  - Can be dismissible
  - Can contain actions
  - Supports icons

#### Toast
- **Status**: ✅ Completed
- **Description**: Temporary notification
- **Behavior**:
  - Appears and disappears automatically
  - Multiple variants for different message types
  - Can be manually dismissed
  - Can be shown for varying durations
  - Can be nested for complex layouts

#### Modal
- **Status**: ✅ Completed
- **Description**: Dialog for focused interaction
- **Behavior**:
  - Can be opened and closed programmatically
  - Can be dismissible
  - Can block interaction with the rest of the page
  - Can have custom sizing
  - Supports focus trapping for accessibility

#### Spinner
- **Status**: ✅ Completed
- **Description**: Loading indicator
- **Behavior**:
  - [x] Multiple sizes (xs through 2xl)
  - [x] Color variants (primary, secondary, success, danger, etc.)
  - [x] Border thickness options
  - [x] Optional labels with positioning control
  - [x] Overlay and full-page display options

#### SkeletonLoader
- **Status**: ✅ Completed
- **Description**: Placeholder for loading content
- **Behavior**:
  - [x] Mimics the shape of the content being loaded
  - [x] Animated to indicate loading
  - [x] Can be customized for different content types
  - [x] Works with light and dark themes

#### Popover
- **Status**: ✅ Completed
- **Description**: Contextual overlay content
- **Behavior**:
  - Appears next to a trigger element
  - Multiple positioning options
  - Can be triggered by hover or click
  - Focus management for accessibility
  - Supports different animation options
  - Can be controlled or uncontrolled

#### EmptyState
- **Status**: ✅ Completed
- **Description**: Placeholder for empty content
- **Behavior**:
  - Shows message and optional actions
  - Can be customized with different layouts
  - Supports different states (e.g., loading, error)

#### ActionButtonBar
- **Status**: ✅ Completed
- **Description**: Horizontal bar containing multiple action buttons
- **Behavior**:
  - Consistent spacing and styling
  - Responsive design that collapses to menu on small screens
  - Optional dividers between button groups
  - Tooltips for button actions
  - Support for keyboard navigation

#### ProgressIndicator
- **Description**: Shows progress through a process or task
- **Behavior**:
  - Linear or circular variants
  - Determinate or indeterminate states
  - Optional label and percentage
  - Color customization based on state or progress
  - Animation for transitions

## 6. Communication Components

#### MessageItem
- **Status**: ✅ Completed
- **Description**: Individual message item in an inbox or messaging interface
- **Behavior**:
  - Displays sender information with avatar
  - Shows message preview/content
  - Timestamp display
  - Read/unread status indication
  - Reply and reaction actions
  - Forward functionality
  - Shows recipients
  - Handles attachments and media
  - Expandable/collapsible for longer messages

#### ThreadItem
- **Status**: ✅ Completed
- **Description**: Grouped conversation thread in an inbox
- **Behavior**:
  - Groups related messages together
  - Shows latest message preview
  - Participant indicators
  - Unread count indicator
  - Expandable to show full conversation
  - Thread-level actions (mute, archive, etc.)
  - Visual hierarchy for replies
  - Timestamps for each message

#### AudioMessagePlayer
- **Description**: Specialized player for voice/audio messages
- **Behavior**:
  - Play/pause controls
  - Progress visualization with waveform
  - Duration display
  - Playback speed control
  - Download option
  - Compact integration in message streams

#### FilterBar
- **Description**: Horizontal bar for quick filtering options
- **Behavior**:
  - Predefined filter options as buttons/chips
  - Active filter indicator
  - Multiple filter support
  - Clear filters option
  - Compact design optimized for top of lists
  - Mobile responsive design

#### ConnectTaskButton
- **Description**: Button to associate messages with tasks
- **Behavior**:
  - Creates task from message content
  - Links message to existing task
  - Shows connection status
  - Quick access to related task
  - Maintains bidirectional reference

#### ReactionButton
- **Description**: Button for providing quick reactions to content
- **Behavior**:
  - Multiple reaction options
  - Count display for each reaction
  - Toggle between reaction states
  - Shows who reacted
  - Compact design for message interfaces

#### MultiUserAvatarGroup
- **Description**: Compact display of multiple user avatars
- **Behavior**:
  - Stacked or horizontal layout options
  - Overflow indicator for additional users
  - Tooltip with full list on hover
  - Click to expand full list of users
  - Configurable maximum visible avatars
  - on hover we can delete avatar
  - on hover we can add avatar

## 7. View Components

#### EntityDetailView
- **Description**: Comprehensive view for entity details
- **Behavior**:
  - Shows all entity properties in a form-like layout
  - Supports editing (inline or modal)
  - Shows related entities
  - Supports comments and history
  - Can be customized per entity type
  - Responsive layout for different screen sizes
  - Can be displayed as a sidepanel rather than a modal

#### DatabaseView
- **Status**: ✅ Completed
- **Description**: Main interface for working with database entities
- **Behavior**:
  - Combines BaseList with configuration panels
  - Shows data in table, grid, or kanban view
  - Saved views management
  - Field configuration
  - Global and view-specific settings
  - Import/export capabilities

#### ActivityFeed
- **Description**: Timeline of activities or updates
- **Behavior**:
  - Shows chronological list of activities
  - Grouped by day or type
  - Infinite scrolling
  - Filters for activity types
  - Highlights new activities since last view
  - Action buttons for relevant items

#### CommentThread
- **Description**: Thread of comments on an entity
- **Behavior**:
  - Nested replies
  - Rich text formatting
  - Mentions and notifications
  - Editing and deletion
  - Reactions
  - Attachment support

#### InboxView
- **Description**: Email/message inbox interface
- **Behavior**:
  - Shows threads in conversation view
  - Supports folders/labels
  - Unified inbox across channels
  - Search and filter capabilities
  - Batch actions
  - Integration with messaging system

#### CalendarView
- **Description**: Interface for viewing and managing calendar events
- **Behavior**:
  - Shows events in daily, weekly, monthly views
  - Resource scheduling view
  - Event creation and editing
  - Drag and drop for rescheduling
  - Multiple calendars with color coding
  - Time zone support

#### DashboardView
- **Description**: Customizable overview of key information
- **Behavior**:
  - Widget-based layout
  - Drag and drop organization
  - Multiple dashboard support
  - Data visualization widgets
  - Responsive layout
  - Saved configurations

#### ReportView
- **Description**: Structured view for analytics and reporting
- **Behavior**:
  - Configurable metrics and dimensions
  - Multiple visualization options
  - Filtering and time range selection
  - Export to various formats
  - Scheduled reports
  - Interactive drill-down capabilities

## 8. Industry-Specific Components

### Real Estate Components

#### PropertyCard
- **Description**: Card displaying property information
- **Behavior**:
  - Shows key property details
  - Thumbnail image with gallery
  - Price and status indicators
  - Quick action buttons
  - Responsive design for different sizes

#### PropertyMapView
- **Description**: Map-based property visualization
- **Behavior**:
  - Shows properties as pins on map
  - Clustering for dense areas
  - Filters for property types
  - Details on hover/click
  - Drawing tools for area selection
  - Street view integration

#### UnitBoard
- **Description**: Kanban-style board for unit status
- **Behavior**:
  - Columns for unit states (vacant, occupied, maintenance, etc.)
  - Visual indicators for unit attributes
  - Drag and drop for status changes
  - Filtering by property or attributes
  - Summary statistics by status

### Field Service Components

#### ServiceCalendar
- **Status**: ✅ Completed
- **Description**: Specialized calendar for service appointments
- **Behavior**:
  - Multiple views: day, week, month, agenda
  - Resource view (e.g., by user/technician)
  - Event creation/editing via drag and drop
  - Event resizing
  - Recurring events support
  - Time zone handling
  - External calendar integration

#### DispatchBoard
- **Status**: ✅ Completed
- **Description**: Interface for managing service dispatch operations
- **Behavior**:
  - Real-time view of technician availability and assignments
  - Drag and drop job assignment
  - Status tracking of service calls
  - Technician location visualization
  - Priority-based job queueing
  - Filter and search capabilities
  - Job detail access

#### ServiceMap
- **Description**: Map view of service locations
- **Behavior**:
  - Shows service locations as pins
  - Technician locations and routes
  - Time-based animation for daily routes
  - Traffic and travel time information
  - Clustering and filtering
  - Click for appointment details

#### RoutePlanner
- **Description**: Interface for optimizing technician routes
- **Behavior**:
  - Drag and drop appointments
  - Auto-optimization suggestions
  - Travel time calculations
  - Break scheduling
  - Capacity constraints
  - Multi-day planning
