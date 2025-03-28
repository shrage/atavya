import ServiceCalendar from './ServiceCalendar';

const technicians = [
  { id: 1, name: 'John Doe', color: '#4F46E5' },
  { id: 2, name: 'Jane Smith', color: '#10B981' },
  { id: 3, name: 'Bob Wilson', color: '#F59E0B' },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const events = [
  {
    id: 1,
    title: "Industry/Field Service/ServiceCalendar",
    start: `${today.toISOString().split('T')[0]}T09:00:00`,
    end: `${today.toISOString().split('T')[0]}T10:30:00`,
    technicianId: 1,
    customer: 'Smith Residence',
    status: 'scheduled',
  },
  {
    id: 2,
    title: "Industry/Field Service/ServiceCalendar",
    start: `${today.toISOString().split('T')[0]}T11:00:00`,
    end: `${today.toISOString().split('T')[0]}T12:30:00`,
    technicianId: 2,
    customer: 'Johnson Home',
    status: 'in-progress',
  },
  {
    id: 3,
    title: "Industry/Field Service/ServiceCalendar",
    start: `${today.toISOString().split('T')[0]}T14:00:00`,
    end: `${today.toISOString().split('T')[0]}T15:00:00`,
    technicianId: 3,
    customer: 'Brown Building',
    status: 'completed',
  },
  {
    id: 4,
    title: "Industry/Field Service/ServiceCalendar",
    start: `${tomorrow.toISOString().split('T')[0]}T10:00:00`,
    end: `${tomorrow.toISOString().split('T')[0]}T14:00:00`,
    technicianId: 1,
    customer: 'Wilson Estate',
    status: 'scheduled',
  },
];

export default {
  title: "Industry/Field Service/ServiceCalendar",
  component: ServiceCalendar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Calendar component for managing HVAC service appointments and technician schedules.',
      },
    },
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    technicians,
    events,
  },
};

export const WithInteractions = {
  args: {
    technicians,
    events,
    onEventClick: (event) => {
      console.log('Event clicked:', {
        title: event.title,
        customer: event.extendedProps.customer,
        start: event.start,
        end: event.end,
        technician: technicians.find(t => t.id === event.resourceId).name,
      });
    },
    onEventDrop: (event, oldEvent) => {
      console.log('Event moved:', {
        title: event.title,
        newStart: event.start,
        oldStart: oldEvent.start,
        newTechnician: technicians.find(t => t.id === event.resourceId).name,
        oldTechnician: technicians.find(t => t.id === oldEvent.resourceId).name,
      });
    },
    onDateSelect: (info) => {
      console.log('Time slot selected:', {
        start: info.start,
        end: info.end,
        technician: technicians.find(t => t.id === info.resource.id).name,
      });
    },
  },
};

