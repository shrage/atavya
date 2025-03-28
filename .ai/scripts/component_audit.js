/**
 * Component Documentation Audit Script
 * 
 * This script scans the component source directories and compares them against
 * the UI Component Status Registry to identify documentation gaps.
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('yaml');

// Configuration
const SOURCE_DIRS = [
  'ui-library/components/core',
  'ui-library/components/common',
  'ui-library/components/communication',
  'ui-library/components/data',
  'ui-library/components/feedback',
  'ui-library/components/framework',
  'ui-library/components/industries',
  'ui-library/components/industry-specific',
  'ui-library/components/layout',
  'ui-library/components/navigation',
  'ui-library/components/view'
];
const REGISTRY_PATH = '.ai/documentation/technical/registries/ui_component_status.md';
const USER_STORIES_PATH = '.ai/requirements/user-stories/component_user_stories.md';
const OUTPUT_PATH = '.ai/reports/component_audit_report.md';

// Component detection patterns
const COMPONENT_PATTERNS = [
  /export\s+(?:default\s+)?(?:function|const)\s+([A-Z][A-Za-z0-9]+)/g,
  /class\s+([A-Z][A-Za-z0-9]+)\s+extends\s+React\.Component/g,
  /React\.(?:memo|forwardRef)\(\s*(?:function|const)?\s*([A-Z][A-Za-z0-9]+)/g,
];

/**
 * Scans source directories to find all implemented components
 * @returns {Array<Object>} List of component objects with metadata
 */
function scanSourceComponents() {
  const components = [];
  
  SOURCE_DIRS.forEach(dir => {
    try {
      scanDirectory(dir, components);
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error);
    }
  });
  
  return components;
}

/**
 * Recursively scans a directory for component files
 * @param {string} dir Directory to scan
 * @param {Array<Object>} components Array to collect component objects
 */
function scanDirectory(dir, components) {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory does not exist: ${dir}`);
    return;
  }
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      scanDirectory(filePath, components);
    } else if (isComponentFile(file)) {
      const fileComponents = extractComponentsFromFile(filePath);
      components.push(...fileComponents);
    }
  });
}

/**
 * Determines if a file is likely a component file
 * @param {string} filename Filename to check
 * @returns {boolean} True if file is likely a component
 */
function isComponentFile(filename) {
  return /\.(jsx|tsx)$/.test(filename) && 
         /^[A-Z]/.test(path.basename(filename, path.extname(filename)));
}

/**
 * Extracts component names from a file
 * @param {string} filePath Path to the file
 * @returns {Array<Object>} Component objects with metadata
 */
function extractComponentsFromFile(filePath) {
  const components = [];
  const content = fs.readFileSync(filePath, 'utf8');
  const directory = path.dirname(filePath);
  const type = getCategoryFromPath(directory);
  
  COMPONENT_PATTERNS.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const name = match[1];
      components.push({
        name,
        filePath,
        directory,
        type,
        lastModified: new Date(fs.statSync(filePath).mtime).toISOString().split('T')[0]
      });
    }
  });
  
  return components;
}

/**
 * Determines component category from file path
 * @param {string} filePath Path to component file
 * @returns {string} Component category
 */
function getCategoryFromPath(filePath) {
  if (filePath.includes('/core/')) return 'Core';
  if (filePath.includes('/common/')) return 'Common';
  if (filePath.includes('/communication/')) return 'Communication';
  if (filePath.includes('/data/')) return 'Data';
  if (filePath.includes('/feedback/')) return 'Feedback';
  if (filePath.includes('/framework/')) return 'Framework';
  if (filePath.includes('/industries/')) return 'Industries';
  if (filePath.includes('/industry-specific/')) return 'Industry-Specific';
  if (filePath.includes('/layout/')) return 'Layout';
  if (filePath.includes('/navigation/')) return 'Navigation';
  if (filePath.includes('/view/')) return 'View';
  return 'Other';
}

/**
 * Extracts components from the UI Component Status Registry
 * @returns {Array<Object>} Component objects from registry
 */
function extractRegistryComponents() {
  const components = [];
  
  if (!fs.existsSync(REGISTRY_PATH)) {
    console.error(`Registry file not found: ${REGISTRY_PATH}`);
    return components;
  }
  
  const content = fs.readFileSync(REGISTRY_PATH, 'utf8');
  const sections = content.split(/^## [A-Za-z\- ]+$/m);
  
  let currentType = '';
  
  sections.forEach(section => {
    const typeMatch = section.match(/^## ([A-Za-z\- ]+)$/m);
    if (typeMatch) {
      currentType = typeMatch[1].trim();
    }
    
    // Extract table rows
    const tableRows = section.match(/^\| [^|]+ \| [^|]+ \| [^|]+ \| [^|]+ \| [^|]+ \| [^|]+ \|$/gm);
    if (tableRows) {
      tableRows.forEach(row => {
        const cells = row.split('|').map(cell => cell.trim());
        if (cells.length >= 7 && cells[1] !== 'Component') {
          components.push({
            name: cells[1],
            type: currentType,
            sourceCode: cells[2] === '✅',
            storybook: cells[3] === '✅',
            userStories: cells[4] === '✅',
            tests: cells[5] === '✅',
            lastUpdated: cells[6]
          });
        }
      });
    }
  });
  
  return components;
}

/**
 * Extracts user stories from the component user stories file
 * @returns {Array<Object>} User story objects
 */
function extractUserStories() {
  const userStories = [];
  
  if (!fs.existsSync(USER_STORIES_PATH)) {
    console.error(`User stories file not found: ${USER_STORIES_PATH}`);
    return userStories;
  }
  
  const content = fs.readFileSync(USER_STORIES_PATH, 'utf8');
  const sections = content.split(/^## [A-Za-z\- ]+$/m);
  
  let currentComponent = '';
  
  sections.forEach(section => {
    const componentMatch = section.match(/^## ([A-Za-z\- ]+)$/m);
    if (componentMatch) {
      currentComponent = componentMatch[1].trim();
    }
    
    // Extract user stories
    const storyMatches = section.match(/^### \[US-COMP-[A-Z]+-\d+\]: .+$/gm);
    if (storyMatches) {
      storyMatches.forEach(storyMatch => {
        const idMatch = storyMatch.match(/\[([A-Z-0-9]+)\]/);
        const titleMatch = storyMatch.match(/\]: (.+)$/);
        
        if (idMatch && titleMatch) {
          const id = idMatch[1];
          const title = titleMatch[1];
          
          // Find acceptance criteria
          const storyIndex = section.indexOf(storyMatch);
          const nextStoryIndex = section.indexOf('### [US-', storyIndex + 1);
          const storyContent = nextStoryIndex > -1 
            ? section.substring(storyIndex, nextStoryIndex)
            : section.substring(storyIndex);
          
          const criteriaMatches = storyContent.match(/^\d+\. .+$/gm);
          const criteriaCount = criteriaMatches ? criteriaMatches.length : 0;
          
          userStories.push({
            id,
            title,
            component: currentComponent,
            criteriaCount,
            hasAcceptanceCriteria: criteriaCount > 0,
            hasSufficientCriteria: criteriaCount >= 5 && criteriaCount <= 7
          });
        }
      });
    }
  });
  
  return userStories;
}

/**
 * Compares source components with registry components to identify gaps
 * @param {Array<Object>} sourceComponents Components from source code
 * @param {Array<Object>} registryComponents Components from registry
 * @param {Array<Object>} userStories User stories
 * @returns {Object} Gap analysis results
 */
function identifyGaps(sourceComponents, registryComponents, userStories) {
  const missingFromRegistry = [];
  const missingFromSource = [];
  const missingUserStories = [];
  const insufficientAcceptanceCriteria = [];
  
  // Find components in source but not in registry
  sourceComponents.forEach(sourceComp => {
    const inRegistry = registryComponents.some(regComp => 
      regComp.name.toLowerCase() === sourceComp.name.toLowerCase());
    
    if (!inRegistry) {
      missingFromRegistry.push(sourceComp);
    }
  });
  
  // Find components in registry but not in source
  registryComponents.forEach(regComp => {
    const inSource = sourceComponents.some(sourceComp => 
      sourceComp.name.toLowerCase() === regComp.name.toLowerCase());
    
    if (!inSource && regComp.sourceCode) {
      missingFromSource.push(regComp);
    }
  });
  
  // Find components without user stories
  registryComponents.forEach(regComp => {
    const hasUserStories = userStories.some(story => 
      story.component.toLowerCase().includes(regComp.name.toLowerCase()) ||
      regComp.name.toLowerCase().includes(story.component.toLowerCase()));
    
    if (!hasUserStories && regComp.userStories) {
      missingUserStories.push(regComp);
    }
  });
  
  // Find user stories with insufficient acceptance criteria
  userStories.forEach(story => {
    if (!story.hasSufficientCriteria) {
      insufficientAcceptanceCriteria.push(story);
    }
  });
  
  return {
    missingFromRegistry,
    missingFromSource,
    missingUserStories,
    insufficientAcceptanceCriteria
  };
}

/**
 * Generates a markdown report of the audit results
 * @param {Object} gapAnalysis Gap analysis results
 * @param {Array<Object>} sourceComponents Components from source code
 * @param {Array<Object>} registryComponents Components from registry
 * @param {Array<Object>} userStories User stories
 * @returns {string} Markdown report
 */
function generateReport(gapAnalysis, sourceComponents, registryComponents, userStories) {
  const {
    missingFromRegistry,
    missingFromSource,
    missingUserStories,
    insufficientAcceptanceCriteria
  } = gapAnalysis;
  
  let report = `# Component Documentation Audit Report

## Overview

This report identifies gaps in the documentation coverage for UI components in the Atavya platform.

- **Date Generated**: ${new Date().toISOString().split('T')[0]}
- **Source Components**: ${sourceComponents.length}
- **Registry Components**: ${registryComponents.length}
- **User Stories**: ${userStories.length}

## Summary

- **Components missing from registry**: ${missingFromRegistry.length}
- **Components marked as implemented but missing from source**: ${missingFromSource.length}
- **Components marked as having user stories but none found**: ${missingUserStories.length}
- **User stories with insufficient acceptance criteria**: ${insufficientAcceptanceCriteria.length}

## Detailed Findings

### Components Missing from Registry

These components were found in the source code but are not listed in the UI Component Status Registry:

| Component Name | Type | File Path | Last Modified |
|---------------|------|-----------|--------------|
${missingFromRegistry.map(comp => `| ${comp.name} | ${comp.type} | ${comp.filePath} | ${comp.lastModified} |`).join('\n')}

### Components Missing from Source

These components are marked as implemented in the registry but were not found in the source code:

| Component Name | Type | Last Updated |
|---------------|------|--------------|
${missingFromSource.map(comp => `| ${comp.name} | ${comp.type} | ${comp.lastUpdated} |`).join('\n')}

### Components Missing User Stories

These components are marked as having user stories in the registry but no matching user stories were found:

| Component Name | Type | Last Updated |
|---------------|------|--------------|
${missingUserStories.map(comp => `| ${comp.name} | ${comp.type} | ${comp.lastUpdated} |`).join('\n')}

### User Stories with Insufficient Acceptance Criteria

These user stories have fewer than 5 or more than 7 acceptance criteria:

| User Story ID | Title | Component | Criteria Count |
|--------------|-------|-----------|---------------|
${insufficientAcceptanceCriteria.map(story => `| ${story.id} | ${story.title} | ${story.component} | ${story.criteriaCount} |`).join('\n')}

## Recommendations

1. Add the ${missingFromRegistry.length} missing components to the UI Component Status Registry
2. Verify the implementation status of the ${missingFromSource.length} components marked as implemented but not found in source
3. Create user stories for the ${missingUserStories.length} components that are missing them
4. Update the ${insufficientAcceptanceCriteria.length} user stories with insufficient acceptance criteria

## Next Steps

1. Update the UI Component Status Registry with accurate information
2. Create missing user stories with proper acceptance criteria
3. Ensure all components have proper documentation coverage
4. Implement regular documentation audits to maintain coverage

`;

  return report;
}

/**
 * Main function to run the audit
 */
function runAudit() {
  console.log('Starting component documentation audit...');
  
  const sourceComponents = scanSourceComponents();
  console.log(`Found ${sourceComponents.length} components in source code`);
  
  const registryComponents = extractRegistryComponents();
  console.log(`Found ${registryComponents.length} components in registry`);
  
  const userStories = extractUserStories();
  console.log(`Found ${userStories.length} user stories`);
  
  const gapAnalysis = identifyGaps(sourceComponents, registryComponents, userStories);
  console.log('Gap analysis complete');
  
  const report = generateReport(gapAnalysis, sourceComponents, registryComponents, userStories);
  
  // Ensure directory exists
  const reportDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  fs.writeFileSync(OUTPUT_PATH, report);
  console.log(`Audit report written to ${OUTPUT_PATH}`);
}

// Run the audit
runAudit();
