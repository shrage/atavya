# Script to set up the Atavya UI Component Library structure

# Create necessary directories
$libraryRoot = "c:\Users\shrag\source\repos\Atavya-Fresh\library"
$componentsDir = "c:\Users\shrag\source\repos\Atavya-Fresh\src\components"
$libraryComponentsDir = "$libraryRoot\components"

# Create category directories in the library
$categories = @(
    "core\form-controls",
    "core\display",
    "layout",
    "navigation",
    "feedback",
    "data\lists-tables",
    "data\configuration",
    "data\visualization",
    "communication",
    "industry-specific"
)

foreach ($category in $categories) {
    $dir = "$libraryComponentsDir\$category"
    if (-not (Test-Path $dir)) {
        New-Item -Path $dir -ItemType Directory -Force | Out-Null
        Write-Host "Created directory: $dir"
    }
}

# Create README files for each category to explain the components
$categoryDescriptions = @{
    "core\form-controls" = "Form control components for user input"
    "core\display" = "Components for displaying content and information"
    "layout" = "Components for page and content layout"
    "navigation" = "Components for navigation and wayfinding"
    "feedback" = "Components for user feedback and notifications"
    "data\lists-tables" = "Components for displaying and managing tabular data"
    "data\configuration" = "Components for configuring data views and settings"
    "data\visualization" = "Components for data visualization"
    "communication" = "Components for user communication"
    "industry-specific" = "Components specific to industry verticals"
}

foreach ($category in $categories) {
    $readmePath = "$libraryComponentsDir\$category\README.md"
    $categoryName = $category.Split('\')[-1]
    $description = $categoryDescriptions[$category]
    
    $content = @"
# $categoryName Components

$description

## Components in this Category

"@

    # Find implemented components in this category
    $sourcePath = "$componentsDir\$category"
    if (Test-Path $sourcePath) {
        $implementedComponents = Get-ChildItem -Path $sourcePath -Directory | Select-Object -ExpandProperty Name
        
        foreach ($component in $implementedComponents) {
            $componentPath = "$sourcePath\$component"
            $hasJsxFile = Test-Path "$componentPath\$component.jsx"
            
            if ($hasJsxFile) {
                $status = "✅ Implemented"
            } else {
                $status = "⬜ Not implemented"
            }
            
            $content += @"

### $component
- Status: $status
- Path: `src/components/$category/$component`

"@
        }
    }
    
    Set-Content -Path $readmePath -Value $content
    Write-Host "Created README: $readmePath"
}

# Create a component index file
$indexPath = "$libraryRoot\component-index.md"
$indexContent = @"
# Atavya UI Component Index

This document provides a quick reference to all components in the Atavya UI Component Library.

## Component Status

| Component | Category | Status | Path |
|-----------|----------|--------|------|
"@

# Find all implemented components
$allComponents = @()
foreach ($category in $categories) {
    $sourcePath = "$componentsDir\$category"
    if (Test-Path $sourcePath) {
        $components = Get-ChildItem -Path $sourcePath -Directory | Select-Object -ExpandProperty Name
        
        foreach ($component in $components) {
            $componentPath = "$sourcePath\$component"
            $hasJsxFile = Test-Path "$componentPath\$component.jsx"
            
            if ($hasJsxFile) {
                $status = "✅ Implemented"
            } else {
                $status = "⬜ Not implemented"
            }
            
            $allComponents += [PSCustomObject]@{
                Name = $component
                Category = $category.Replace('\', '/')
                Status = $status
                Path = "src/components/$($category.Replace('\', '/'))/$component"
            }
        }
    }
}

# Sort components by name
$allComponents = $allComponents | Sort-Object -Property Name

# Add components to index
foreach ($component in $allComponents) {
    $indexContent += "`n| $($component.Name) | $($component.Category) | $($component.Status) | $($component.Path) |"
}

Set-Content -Path $indexPath -Value $indexContent
Write-Host "Created component index: $indexPath"

# Create a symbolic link to the original components directory
# Note: This requires admin privileges on Windows
# New-Item -Path "$libraryRoot\src" -ItemType Directory -Force | Out-Null
# New-Item -Path "$libraryRoot\src\components" -ItemType SymbolicLink -Value $componentsDir -Force | Out-Null

Write-Host "Library structure setup complete!"
