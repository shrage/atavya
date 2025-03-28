import DispatchBoard from './DispatchBoard';

const jobs = [
  {
    id: 1,
    customer: 'Smith Residence',
    address: '123 Main St, Anytown, USA',
    serviceType: 'AC Repair',
    priority: 'high',
    status: 'pending',
  },
  {
    id: 2,
    customer: 'Johnson Home',
    address: '456 Oak Ave, Anytown, USA',
    serviceType: 'Furnace Maintenance',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 3,
    customer: 'Brown Building',
    address: '789 Pine St, Anytown, USA',
    serviceType: 'Ductwork Inspection',
    priority: 'low',
    status: 'pending',
  },
];

const technicians = [
  {
    id: 1,
    name: 'John Doe',
    status: 'available',
    currentJob: null,
  },
  {
    id: 2,
    name: 'Jane Smith',
    status: 'busy',
    currentJob: {
      id: 4,
      customer: 'Wilson Estate',
      serviceType: 'Heat Pump Installation',
      status: 'in-progress',
    },
  },
  {
    id: 3,
    name: 'Bob Wilson',
    status: 'available',
    currentJob: null,
  },
];

export default {
  title: "Industry/Field Service/DispatchBoard",
  component: DispatchBoard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Dispatch board for managing HVAC service jobs and technician assignments.',
      },
    },
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    jobs,
    technicians,
  },
};

export const WithInteractions = {
  args: {
    jobs,
    technicians,
    onAssignJob: (jobId, techId) => {
      console.log('Job assigned:', {
        jobId,
        techId,
        job: jobs.find(j => j.id === jobId),
        technician: technicians.find(t => t.id === techId),
      });
    },
    onUpdateJobStatus: (jobId, status) => {
      console.log('Job status updated:', {
        jobId,
        status,
      });
    },
  },
};

