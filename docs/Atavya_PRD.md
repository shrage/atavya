**Product Requirements Document (PRD)**

**Product Name:** Atavya
**Core Objective:** Provide a flexible, industry-adaptable automation and efficiency platform with customizable modules for various business sectors, built on a common entity framework with dashboard-first architecture.

---

### 1. **Overview**
Atavya is a configurable process-automation system that provides a core set of capabilities that can be tailored to specific industry needs. The platform allows specialized configurations for different industries (HVAC services, property management, professional services, etc.) while maintaining a consistent core architecture. The entire application is structured to support departmental dashboards built in Apache Superset, with deep integrations into n8n automation, PostgreSQL data storage, and event-driven architecture. The backend is built in .NET (C#) with Entity Framework, frontend in ReactJS, and scheduling/dispatch powered by FullCalendar.

The design approach takes inspiration from **Notion-style design**: clean, minimal, block-based, and highly flexible. It emphasizes clarity, ease of navigation, and responsive layouts while allowing structured content to be created and manipulated fluidly. Layouts are soft, whitespace-optimized, with a strong focus on typography and user clarity.

---

### 2. **Goals**
- Create a flexible platform with a strong core that can be tailored to various industries
- Design every workflow to feed clean, actionable data into departmental dashboards
- Provide industry-specific configurations with minimal engineering effort
- Empower each department to track its efficiency and growth
- Support seamless entity management, task creation, assignment, and specialized workflows
- Provide full automation integration via n8n and eventing
- Enable secure authentication/authorization (role-based access control)
- Display real-time progress toward team and individual goals
- Motivate data entry and task efficiency through transparent metrics
- Facilitate internal and external communication across all key business entities
- Enable customer and client self-service through a dedicated portal
- Support daily metric recalculations and historical comparisons
- Deliver mobile and tablet-friendly interfaces for field workers
- Establish a structured and consistent user interface experience for each module
- Apply a consistent Notion-style visual system to all app modules for simplicity and elegance
- Provide extensibility through custom fields, dynamic lists, and reusable entity architecture
- Enable a seamless onboarding and configuration process for new organizations and users
- Establish observable system behavior with clear diagnostics and logs
- Provide robust testing and sandbox capabilities for safe experimentation

---

### 3. **Core Platform Features**

#### 3.1 Base Entity System
- All core components built on a common entity framework:
  - **BaseEntity** - Common properties for all entities
  - **BaseList** - Management of collections with filtering, sorting, etc.
  - **BaseListItem** - Common behaviors for all list items
  - **Person** - Base type for all person-related entities (Customer, User, etc.)
- Common entities available across all industries:
  - Person
  - Customer
  - User
  - Task
  - Document
  - Vendor
  - Message
  - Comment
  - Notification
  - Invoice

#### 3.2 Industry Specialization
- System includes mechanisms to specialize for specific industries:
  - **Industry Templates**: Pre-configured entity models, lists, fields, and workflows for a specific industry
  - **Custom Entity Types**: Industry-specific entity types (e.g., "Property" for real estate, "Service Job" for HVAC)
  - **Specialized UI Views**: Custom UI components tailored to specific entity types
  - **Industry-Specific Workflows**: Pre-configured workflows relevant to the industry

#### 3.3 Flexible UI System
- Core design principles:
  - **Base UI Component Library**: Common UI patterns for all entity types
  - **UI Registry System**: Maps entity types to appropriate UI components
  - **Specialized UI Components**: Industry or entity-specific UI components
  - **UI Composition Rules**: Defines how common UI components combine with specialized ones

#### 3.4 UI Structure & Composition
- **List View UI**:
  - Common framework for all lists (filtering, sorting, etc.)
  - Ability to override with specialized views for specific list types
  - Standard controls for list operations
- **Entity Detail UI**:
  - Common tabbed interface with standard tabs:
    - Main tab (customizable per entity type)
    - Comments/Communication tab
    - Files/Attachments tab
    - Custom Fields tab
    - History/Audit tab
  - Main tab content area can be replaced with specialized UI for specific entity types
  - Consistent header, sidebar, and footer across all entity types

#### 3.5 Entity Communication System
- Embedded commenting system for internal discussion and external messaging:
  - Staff can leave internal-only comments or public messages
  - External parties only see messages tied to their records and marked as public
  - Supports file attachments via S3-based storage (documents, photos, etc.)
  - Supports text, image, voice note, and video message formats
  - WhatsApp conversations (matched by phone number) can be automatically attached to relevant threads

#### 3.6 Dashboards & Analytics
- Department-first design — dashboards are scoped to each department
- Industry-specific dashboard templates
- Custom dashboard capabilities for unique business needs
- Goal tracking with comparative metrics (team goal, team average, top performer)
- Historical comparisons (month-over-month, year-over-year)

---

### 4. **Industry-Specific Implementations**

#### 4.1 HVAC Service Industry
- **Specialized Entities**:
  - Service Job (specialized Task)
  - Technician (specialized User)
  - Equipment/Unit (specialized Asset)
  - Maintenance Schedule (specialized Calendar)
- **Custom UI Components**:
  - Service Calendar with technician availability
  - Dispatch Board
  - Equipment Specification View
  - Technician Mobile Interface
- **Industry-Specific Metrics**:
  - On-time arrival %
  - Travel time between jobs
  - Jobs completed per day
  - Time per job (actual vs estimated)
  - Customer satisfaction ratings

#### 4.2 Property Management Industry
- **Specialized Entities**:
  - Property (specialized Asset)
  - Unit/Apartment (specialized Asset)
  - Tenant (specialized Customer)
  - Lease (specialized Contract)
  - Maintenance Request (specialized Task)
- **Custom UI Components**:
  - Property Portfolio View
  - Lease Calendar
  - Tenant Portal
  - Maintenance Request Tracker
- **Industry-Specific Metrics**:
  - Occupancy rates
  - Rent collection efficiency
  - Maintenance resolution times
  - Tenant satisfaction scores
  - Property profitability

#### 4.3 Professional Services
- **Specialized Entities**:
  - Project (specialized Task)
  - Time Entry (specialized Record)
  - Deliverable (specialized Document)
  - Client (specialized Customer)
- **Custom UI Components**:
  - Project Tracker
  - Time Sheet
  - Deliverables Board
  - Client Portal
- **Industry-Specific Metrics**:
  - Billable hours
  - Project profitability
  - Resource utilization
  - Client satisfaction

---

### 5. **Architecture & Stack**
- **Frontend:** ReactJS with Notion-inspired components
- **Backend:** .NET (C#) + Entity Framework
- **Database:** PostgreSQL
- **Automation:** n8n (event-driven via webhooks)
- **Dashboards:** Apache Superset
- **Auth:** JWT-based authentication
- **Eventing:** Internal event bus or webhook engine
- **Media Storage:** S3-based storage system
- **Integrations:** Industry-specific API connections

#### 5.1 Dynamic Entities & Extensibility
- Every entity (Task, Customer, etc.) inherits from a common **BaseEntity**
  - Shared capabilities: comments, attachments, audit log, lookup fields, status history
  - Each entity includes a **basic rich text document field** for descriptions and notes
- Each list view inherits from a common **BaseList**
  - Shared UI behaviors: filtering, grouping, sorting, batch editing
- Entities can be extended with **custom fields** of various types:
  - Text, Number, Phone, Email, Dropdown, Labels, Color pickers
  - Lookup (1:1 or 1:many to other entities), Status pickers, Formula fields
  - Rich Text fields for advanced formatting
  - File Attachment fields
- Formula fields can:
  - Calculate values dynamically (on-the-fly display only)
  - Or persist their output to the database (for automation or indexing)
- Lists can include lookup columns to link entities across the system
- Data model follows a **hybrid schema**:
  - One central table stores common metadata for all entities
  - Entity-specific data is stored in normalized separate tables per entity type

#### 5.2 UI Component Registry System
- Core UI components are registered in a central registry
- Registry maps entity types to UI components
- Default mapping provided for all basic entity types
- Industry-specific mappings can override defaults
- Custom mappings can be defined at the organization level
- Each mapping contains:
  - Entity type
  - UI component for list view
  - UI component for detail view
  - UI component for creation/editing
  - Custom tabs configuration
  - Related entity configurations

#### 5.3 Workflow and List-Specific Logic
- Each list can define and manage its own workflow independently
- **Elsa Workflows** will be the workflow engine for all lists and list items
- Workflows will support:
  - State machines, branching, conditions
  - Human interaction steps (approvals, actions)
  - Time-based transitions and scheduled triggers
  - Integration with external systems via HTTP, Kafka, or webhooks
- Industry templates include pre-configured workflows
- Organizations can customize workflows for their specific needs

#### 5.4 Multi-Tenant Platform Structure
- Platform designed as multi-tenant with industry isolation:
  - Each organization has its own isolated data
  - Industry templates applied at organization creation
  - Cross-industry capabilities available to all organizations
  - Organizations can customize their instance within industry parameters
- **Organization Onboarding**:
  - Select industry template
  - Configure organization details
  - Import initial data
  - Set up users and permissions
  - Customize entity types and fields
  - Apply branding elements

---

### 6. **Security & Permissions**
- Multi-tenant platform with organization isolation
- Role-Based Access Control within each organization
- Permission Management:
  - Permissions configured on both built-in lists and custom-created lists
  - Access levels from Guest to Admin with graduated capabilities
- **Superlists Concept**:
  - A Superlist is a new list based on an existing list (base list)
  - Adds custom fields, workflow, permissions, and views on top of the base list
  - Lower-level users may only have access to the base list
  - Staff or higher-tier users can access the Superlist with its extended capabilities
  - Allows layered visibility and multi-level data handling

---

### 7. **Success Metrics**
- Platform supports at least 3 distinct industry templates within 6 months
- 90%+ of organization-specific customizations possible without code changes
- 100% of core entities using the BaseEntity/BaseList inheritance model
- 90%+ automation trigger reliability via n8n
- Reduction in implementation time by 50% compared to custom solutions

---

### 8. **Future Features**
- Visual template builder for industry customization
- AI-assisted workflow recommendations
- Cross-industry benchmarking
- Marketplace for third-party industry templates and integrations
- Mobile app framework with industry-specific capabilities

---

Prepared by: Product Team
Last Updated: March 24, 2025