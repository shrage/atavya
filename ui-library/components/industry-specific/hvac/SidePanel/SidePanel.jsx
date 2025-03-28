import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaThermometerHalf, FaTools, FaChartLine, FaMapMarkerAlt, FaExclamationTriangle, 
         FaFileAlt, FaUsersCog, FaExchangeAlt, FaCog } from 'react-icons/fa';
import { Stack } from '../../../layout/Stack/Stack';

/**
 * HVAC Side Panel component for navigation and access to HVAC-specific functionality
 * 
 * @component
 * @example
 * ```jsx
 * <SidePanel 
 *   activeSection="equipment"
 *   onSectionChange={(section) => console.log(`Changed to ${section}`)}
 *   companyName="Atavya HVAC Solutions"
 *   companyLogo="/path/to/logo.png"
 * />
 * ```
 */
const SidePanel = ({ 
  activeSection, 
  onSectionChange, 
  companyName, 
  companyLogo,
  notifications = {},
  className = '',
  ...props 
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const sections = [
    { id: 'equipment', label: 'Equipment Status', icon: <FaThermometerHalf />, count: notifications.equipment || 0 },
    { id: 'maintenance', label: 'Maintenance Schedule', icon: <FaTools />, count: notifications.maintenance || 0 },
    { id: 'analytics', label: 'Energy Analytics', icon: <FaChartLine />, count: notifications.analytics || 0 },
    { id: 'zones', label: 'Temperature Zones', icon: <FaMapMarkerAlt />, count: notifications.zones || 0 },
    { id: 'faults', label: 'Fault Detection', icon: <FaExclamationTriangle />, count: notifications.faults || 0 },
    { id: 'compliance', label: 'Compliance Reports', icon: <FaFileAlt />, count: notifications.compliance || 0 },
    { id: 'users', label: 'User Management', icon: <FaUsersCog />, count: notifications.users || 0 },
    { id: 'integration', label: 'BMS Integration', icon: <FaExchangeAlt />, count: notifications.integration || 0 },
    { id: 'settings', label: 'Settings', icon: <FaCog />, count: notifications.settings || 0 },
  ];

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={`bg-gray-900 text-white h-full flex flex-col ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Header with company info */}
      <div className="p-4 border-b border-gray-700 flex items-center">
        {companyLogo && (
          <img 
            src={companyLogo} 
            alt={`${companyName} logo`} 
            className={`${collapsed ? 'w-8 h-8' : 'w-8 h-8 mr-3'} rounded-full`}
          />
        )}
        {!collapsed && <h2 className="text-lg font-semibold truncate">{companyName}</h2>}
        <button 
          onClick={handleToggleCollapse}
          className="ml-auto text-gray-400 hover:text-white"
          aria-label={collapsed ? 'Expand side panel' : 'Collapse side panel'}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation sections */}
      <nav className="flex-1 overflow-y-auto py-4">
        <Stack direction="vertical" spacing="none">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`flex items-center px-4 py-3 ${
                activeSection === section.id 
                  ? 'bg-blue-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              } transition-colors w-full text-left`}
              onClick={() => onSectionChange(section.id)}
            >
              <span className="text-xl">{section.icon}</span>
              {!collapsed && (
                <>
                  <span className="ml-3 flex-1">{section.label}</span>
                  {section.count > 0 && (
                    <span className="bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1 min-w-[1.5rem] text-center">
                      {section.count}
                    </span>
                  )}
                </>
              )}
              {collapsed && section.count > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {section.count}
                </span>
              )}
            </button>
          ))}
        </Stack>
      </nav>

      {/* Organization selector at bottom */}
      <div className="p-4 border-t border-gray-700">
        <button 
          className="flex items-center w-full text-gray-300 hover:text-white"
          aria-label="Change organization"
        >
          {companyLogo && (
            <img 
              src={companyLogo} 
              alt={`${companyName} logo`} 
              className="w-6 h-6 rounded-full"
            />
          )}
          {!collapsed && (
            <>
              <span className="ml-2 text-sm truncate flex-1">{companyName}</span>
              <span className="text-xs text-gray-400">Switch</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

SidePanel.propTypes = {
  /** Currently active section ID */
  activeSection: PropTypes.string.isRequired,
  /** Callback function when section is changed */
  onSectionChange: PropTypes.func.isRequired,
  /** Company/organization name */
  companyName: PropTypes.string.isRequired,
  /** URL to company logo */
  companyLogo: PropTypes.string,
  /** Notification counts for each section */
  notifications: PropTypes.shape({
    equipment: PropTypes.number,
    maintenance: PropTypes.number,
    analytics: PropTypes.number,
    zones: PropTypes.number,
    faults: PropTypes.number,
    compliance: PropTypes.number,
    users: PropTypes.number,
    integration: PropTypes.number,
    settings: PropTypes.number,
  }),
  /** Additional class names */
  className: PropTypes.string,
};

export default SidePanel;
