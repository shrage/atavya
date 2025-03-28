# Atavya Core Features Requirements

## Overview

This document defines the core features and capabilities of the Atavya platform that are common across all industry implementations. These features form the foundation of the platform and ensure consistency across different industry specializations.

## Base Entity System

### [REQ-CORE-ENT-001]: Base Entity Framework
- **Priority**: Critical
- **Description**: All core components must be built on a common entity framework with the following base types:
  - **BaseEntity**: Common properties for all entities (ID, created date, modified date, etc.)
  - **BaseList**: Management of collections with filtering, sorting, etc.
  - **BaseListItem**: Common behaviors for all list items
  - **Person**: Base type for all person-related entities (Customer, User, etc.)

### [REQ-CORE-ENT-002]: Common Entities
- **Priority**: High
- **Description**: The following common entities must be available across all industries:
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

## Industry Specialization

### [REQ-CORE-IND-001]: Industry Templates
- **Priority**: High
- **Description**: System must include mechanisms to specialize for specific industries:
  - **Industry Templates**: Pre-configured entity models, lists, fields, and workflows for a specific industry
  - **Custom Entity Types**: Industry-specific entity types (e.g., "Property" for real estate, "Service Job" for HVAC)
  - **Specialized UI Views**: Custom UI components tailored to specific entity types
  - **Industry-Specific Workflows**: Pre-configured workflows relevant to the industry

## Flexible UI System

### [REQ-CORE-UI-001]: UI Component Architecture
- **Priority**: Critical
- **Description**: Core design principles for the UI system:
  - **Base UI Component Library**: Common UI patterns for all entity types
  - **UI Registry System**: Maps entity types to appropriate UI components
  - **Specialized UI Components**: Industry or entity-specific UI components
  - **UI Composition Rules**: Defines how common UI components combine with specialized ones

### [REQ-CORE-UI-002]: List View UI
- **Priority**: High
- **Description**: List view UI requirements:
  - Common framework for all lists (filtering, sorting, etc.)
  - Ability to override with specialized views for specific list types
  - Standard controls for list operations

### [REQ-CORE-UI-003]: Entity Detail UI
- **Priority**: High
- **Description**: Entity detail UI requirements:
  - Common tabbed interface with standard tabs
  - Main tab content area can be replaced with specialized UI for specific entity types
  - Consistent header, sidebar, and footer across all entity types

## Entity Communication System

### [REQ-CORE-COM-001]: Commenting System
- **Priority**: Medium
- **Description**: Embedded commenting system for internal discussion and external messaging:
  - Staff can leave internal-only comments or public messages
  - External parties only see messages tied to their records and marked as public
  - Supports file attachments via S3-based storage (documents, photos, etc.)
  - Supports text, image, voice note, and video message formats
  - WhatsApp conversations can be automatically attached to relevant threads

## Dashboards & Analytics

### [REQ-CORE-DASH-001]: Dashboard Architecture
- **Priority**: High
- **Description**: Dashboard requirements:
  - Department-first design — dashboards are scoped to each department
  - Industry-specific dashboard templates
  - Custom dashboard capabilities for unique business needs
  - Goal tracking with comparative metrics
  - Historical comparisons (month-over-month, year-over-year)

## Last Updated

2025-03-28: Initial creation
