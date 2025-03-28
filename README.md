# Atavya - Industry-Customizable Automation Platform

Atavya is a flexible, industry-adaptable automation and efficiency platform with customizable modules for various business sectors, built on a common entity framework with dashboard-first architecture.

## Project Overview

This repository contains the architecture documentation, data models, and code templates for implementing Atavya - a platform that can be customized for different industries while maintaining a consistent core architecture. The platform includes industry-specific templates for HVAC services, property management, professional services, and more.

## Repository Structure

```
atavya/
├── docs/
│   ├── Atavya_PRD.md           # Updated Product Requirements Document
│   ├── component-library-requirements.md  # Component library requirements
│   ├── README.md               # Documentation overview
│   └── images/                 # Conceptual diagrams
│
├── architecture/
│   ├── high-level-architecture.md         # High-level system architecture
│   ├── industry-customizable-architecture.md  # Industry customization architecture 
│   └── component-library-architecture.md  # Component library architecture
│
├── data-models/
│   ├── base-entity-model.md            # BaseEntity and BaseList models
│   ├── ui-component-registry-model.md  # UI component registry data model
│
└── code-templates/
    ├── ui-component-resolver.cs        # C# component for UI resolution
    ├── react-entity-detail.jsx         # React component for entity details
    ├── use-component-registry-hook.jsx # React hook for component registry
    └── component-example/              # Example component with documentation
        └── CustomerCard/               # Example customer card component
```

## Core Features

- **Base Entity Framework**: Common entity model with inheritance
- **Industry Templates**: Pre-configured entity types, fields, and UI
- **UI Component Registry**: Dynamic mapping of UI components to entity types
- **Customizable UI Structure**: Common framework with industry-specific variations
- **Multi-Tenant Architecture**: Organization isolation with shared core platform
- **Component Library & Viewer**: Comprehensive component development and testing system

## Industry Templates

The platform includes templates for various industries:

- **HVAC Service Industry**: Service jobs, technicians, equipment tracking
- **Property Management**: Properties, units, tenants, leases, maintenance
- **Professional Services**: Projects, time tracking, deliverables

## Getting Started

1. Review the PRD in `docs/Atavya_PRD.md` to understand the requirements
2. Explore the architecture designs in the `architecture/` directory
3. Study the data models to understand the entity relationships
4. Review the code templates for implementation patterns
5. Examine the component library requirements and example components

## Component Library & Viewer

The Atavya platform includes a comprehensive component library and viewer application:

- **Structured Component Directory**: Organized by component type and industry
- **Component Viewer Application**: Standalone app for testing and showcasing components
- **Component Documentation**: Standardized documentation format for all components
- **Sample Data**: Realistic data for testing components in various states
- **Development Workflow**: Clear process for component creation and integration

See `docs/component-library-requirements.md` for detailed requirements and `architecture/component-library-architecture.md` for the technical architecture.

## Implementation with AI Code Generators

This repository is structured to be used with AI code generators like Windsurf AI:

1. Provide the PRD and architecture documents as context
2. Use the data models to define the database schema
3. Implement the base entity framework following the inheritance patterns
4. Build the UI component registry system for dynamic UI mapping
5. Create industry-specific entity types and UI components
6. Implement the component library and viewer application

## Development Guidelines

- Follow the BaseEntity/BaseList inheritance pattern for all entities
- Use the UI Component Registry for dynamic UI resolution
- Implement industry templates as configuration rather than code changes
- Maintain separation between core platform and industry-specific code
- Add all UI components to the component library with proper documentation
- Test components in isolation using the component viewer before integration
