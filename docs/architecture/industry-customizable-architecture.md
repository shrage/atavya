# Atavya - Industry-Customizable Architecture

## Overview

Atavya is designed as a flexible platform that can be customized for different industries while maintaining a consistent core architecture. This document outlines the architectural approach for supporting industry-specific customizations.

```mermaid
flowchart TB
    subgraph "Core Platform"
        subgraph "Base Entity Framework"
            BE["BaseEntity"]
            BL["BaseList"]
            BLI["BaseListItem"]
            Person["Person"]
        end
        
        subgraph "Core Services"
            CS1["Authentication"]
            CS2["Authorization"]
            CS3["Messaging"]
            CS4["Workflow Engine"]
            CS5["Notification System"]
            CS6["File Management"]
            CS7["Custom Fields Engine"]
            CS8["Search Service"]
        end
        
        subgraph "UI Component Registry"
            UI1["Component Registry Service"]
            UI2["Default UI Components"]
            UI3["UI Mapping Rules"]
            UI4["UI Composition Engine"]
        end
    end
    
    subgraph "Industry Templates"
        IT1["HVAC Industry Template"]
        IT2["Property Management Template"]
        IT3["Professional Services Template"]
        IT4["Template Registry Service"]
    end
    
    subgraph "Organization Layer"
        OL1["Organization Settings"]
        OL2["Custom Entity Types"]
        OL3["Custom UI Mappings"]
        OL4["Custom Workflows"]
    end
    
    subgraph "Implementation Layer"
        IL1["HVAC Organization"]
        IL2["Property Management Organization"]
        IL3["Professional Services Organization"]
    end
    
    Core Platform --> Industry Templates
    Industry Templates --> Organization Layer
    Organization Layer --> Implementation Layer
```

## Architectural Principles

1. **Core Platform**: Provides base functionality used by all industries
2. **Industry Templates**: Pre-configured sets of entities, fields, workflows, and UI components
3. **Organization Layer**: Customization layer for specific client implementations
4. **Implementation Layer**: Actual deployed instances for each client

## Component Architecture

### 1. Base Entity Framework

The foundation of the platform is a consistent entity model:

```mermaid
classDiagram
    BaseEntity <|-- BaseListItem
    BaseList *-- BaseListItem
    BaseListItem <|-- Person
    Person <|-- Customer
    Person <|-- User
    BaseListItem <|-- Task
    BaseListItem <|-- Document
    
    class BaseEntity {
        +uuid id
        +datetime createdAt
        +datetime updatedAt
        +uuid createdBy
        +uuid updatedBy
        +int version
        +bool isArchived
    }
    
    class BaseList {
        +uuid id
        +string name
        +string description
        +string entityType
        +json viewSettings
        +json filterSettings
        +bool isSystemList
    }
    
    class BaseListItem {
        +uuid id
        +uuid listId
        +string title
        +string status
        +int sortOrder
    }
    
    class Person {
        +string firstName
        +string lastName
        +string email
        +string phone
    }
    
    class Customer {
        +string customerType
        +float lifetimeValue
    }
    
    class User {
        +string username
        +string[] roles
        +json permissions
    }
    
    class Task {
        +uuid assignedTo
        +datetime dueDate
        +string priority
    }
    
    class Document {
        +string documentType
        +string storagePath
        +int fileSize
    }
```

### 2. UI Component Registry

The UI Component Registry system enables flexible UI mapping to entity types:

```mermaid
flowchart TB
    CR["Component Registry"]
    EM["Entity Type Mapping"]
    DC["Default Components"]
    IC["Industry Components"]
    OC["Organization Custom Components"]
    
    subgraph "Component Types"
        LV["List View Components"]
        DV["Detail View Components"]
        FE["Form/Edit Components"]
        CT["Custom Tab Components"]
    end
    
    CR --> EM
    EM --> DC
    EM --> IC
    EM --> OC
    
    DC & IC & OC --> LV & DV & FE & CT
```

The registry follows these rules:
1. Default components are used unless overridden
2. Industry components override default components
3. Organization custom components override industry components
4. Component resolution is done at runtime based on entity type

### 3. Industry Template System

Industry templates provide pre-configured settings:

```mermaid
classDiagram
    class IndustryTemplate {
        +string industryCode
        +string industryName
        +string description
        +EntityTypeDefinition[] entityTypes
        +UIComponentMapping[] uiMappings
        +WorkflowDefinition[] workflows
        +DashboardTemplate[] dashboards
    }
    
    class EntityTypeDefinition {
        +string entityType
        +string baseType
        +CustomField[] fields
        +string[] statuses
        +string[] tags
    }
    
    class UIComponentMapping {
        +string entityType
        +string listComponent
        +string detailComponent
        +string formComponent
        +TabDefinition[] tabs
    }
    
    class WorkflowDefinition {
        +string name
        +string entityType
        +json workflowDefinition
    }
    
    class DashboardTemplate {
        +string name
        +string departmentCode
        +json dashboardDefinition
    }
    
    IndustryTemplate *-- EntityTypeDefinition
    IndustryTemplate *-- UIComponentMapping
    IndustryTemplate *-- WorkflowDefinition
    IndustryTemplate *-- DashboardTemplate
```

### 4. Customizable UI Structure

All entity detail views follow a consistent structure that allows for customization:

```mermaid
flowchart TB
    subgraph "Entity Detail View"
        Header["Entity Header (Common)"]
        
        subgraph "Tab Container"
            MT["Main Tab (Customizable)"]
            CT["Communication Tab (Common)"]
            FT["Files Tab (Common)"]
            CFT["Custom Fields Tab (Common)"]
            HT["History Tab (Common)"]
            ET["Extra Tabs (Customizable)"]
        end
        
        Actions["Action Panel (Customizable)"]
    end
    
    Header --> MT & CT & FT & CFT & HT & ET
    MT & CT & FT & CFT & HT & ET --> Actions
```

The Main Tab content is the primary area for industry-specific customization, while maintaining consistent UI patterns for common functionality.

## Implementation Process

When implementing Atavya for a specific organization:

1. **Select Industry Template**: Choose the appropriate industry template
2. **Configure Organization**: Set up organization settings, users, and permissions
3. **Customize Entity Types**: Modify or extend entity types as needed
4. **Define Custom UI Mappings**: Override UI components if required
5. **Configure Workflows**: Set up or modify workflow definitions
6. **Import Initial Data**: Populate the system with organization data
7. **Deploy & Train**: Deploy the customized instance and train users

This architecture allows for rapid deployment of industry-specific solutions while maintaining a consistent core platform.