import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

/**
 * ServiceCalendar component for HVAC service scheduling
 * Shows technician availability and service jobs in a calendar view
 * 
 * @component
 * @example
 * ```jsx
 * <ServiceCalendar
 *   technicians={[
 *     { id: 1, name: 'John Doe', color: '#4F46E5' },
 *     { id: 2, name: 'Jane Smith', color: '#10B981' },
 *   ]}
 *   events={[
 *     {
 *       id: 1,
 *       title: 'AC Repair',
 *       start: '2025-03-25T10:00:00',
 *       end: '2025-03-25T11:30:00',
 *       technicianId: 1,
 *       customer: 'Smith Residence',
 *       status: 'scheduled',
 *     },
 *   ]}
 *   onEventClick={(event) => console.log('Clicked event:', event)}
 *   onEventDrop={(event) => console.log('Moved event:', event)}
 * />
 * ```
 */
const ServiceCalendar = ({
  technicians,
  events,
  onEventClick,
  onEventDrop,
  onEventResize,
  onDateSelect,
  className,
}) => {
  const [currentView, setCurrentView] = useState('timeGridWeek');

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return '#4F46E5'; // Indigo
      case 'in-progress':
        return '#10B981'; // Green
      case 'completed':
        return '#6B7280'; // Gray
      case 'cancelled':
        return '#EF4444'; // Red
      default:
        return '#4F46E5';
    }
  };

  const resources = technicians.map(tech => ({
    id: tech.id,
    title: tech.name,
    eventColor: tech.color,
  }));

  const formattedEvents = events.map(event => ({
    ...event,
    resourceId: event.technicianId,
    backgroundColor: getStatusColor(event.status),
    borderColor: getStatusColor(event.status),
    extendedProps: {
      customer: event.customer,
      status: event.status,
    },
  }));

  const handleEventClick = (info) => {
    onEventClick?.(info.event);
  };

  const handleEventDrop = (info) => {
    onEventDrop?.(info.event, info.oldEvent);
  };

  const handleEventResize = (info) => {
    onEventResize?.(info.event, info.oldEvent);
  };

  const handleDateSelect = (info) => {
    onDateSelect?.(info);
  };

  return (
    <div className={twMerge('bg-white rounded-lg shadow-sm p-4', className)}>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView={currentView}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay',
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        resources={resources}
        events={formattedEvents}
        allDaySlot={false}
        slotMinTime="06:00:00"
        slotMaxTime="20:00:00"
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        select={handleDateSelect}
        resourceAreaWidth="15%"
        height="auto"
        eventContent={(arg) => (
          <div className="p-1">
            <div className="font-medium text-sm truncate">{arg.event.title}</div>
            <div className="text-xs truncate text-gray-600">
              {arg.event.extendedProps.customer}
            </div>
          </div>
        )}
      />
    </div>
  );
};

ServiceCalendar.propTypes = {
  /** Array of technicians */
  technicians: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
  })).isRequired,
  /** Array of service events */
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    technicianId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    customer: PropTypes.string,
    status: PropTypes.oneOf(['scheduled', 'in-progress', 'completed', 'cancelled']),
  })).isRequired,
  /** Event click handler */
  onEventClick: PropTypes.func,
  /** Event drop handler */
  onEventDrop: PropTypes.func,
  /** Event resize handler */
  onEventResize: PropTypes.func,
  /** Date selection handler */
  onDateSelect: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default ServiceCalendar;
