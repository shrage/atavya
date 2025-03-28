import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

/**
 * DispatchBoard component for managing HVAC service jobs and technician assignments
 * 
 * @component
 * @example
 * ```jsx
 * <DispatchBoard
 *   jobs={[
 *     {
 *       id: 1,
 *       customer: 'Smith Residence',
 *       address: '123 Main St',
 *       serviceType: 'AC Repair',
 *       priority: 'high',
 *       status: 'pending',
 *     },
 *   ]}
 *   technicians={[
 *     {
 *       id: 1,
 *       name: 'John Doe',
 *       status: 'available',
 *       currentJob: null,
 *     },
 *   ]}
 *   onAssignJob={(jobId, techId) => console.log('Assigned:', jobId, 'to:', techId)}
 * />
 * ```
 */
const DispatchBoard = ({
  jobs,
  technicians,
  onAssignJob,
  onUpdateJobStatus,
  className,
}) => {
  const [draggedJob, setDraggedJob] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDragStart = (job) => {
    setDraggedJob(job);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (techId) => {
    if (draggedJob) {
      onAssignJob?.(draggedJob.id, techId);
      setDraggedJob(null);
    }
  };

  return (
    <div className={twMerge('flex flex-col h-full bg-white rounded-lg shadow-sm', className)}>
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Unassigned Jobs */}
        <div className="flex flex-col">
          <h2 className="text-lg font-medium mb-4">Unassigned Jobs</h2>
          <div className="space-y-3">
            {jobs
              .filter(job => job.status === 'pending')
              .map(job => (
                <div
                  key={job.id}
                  draggable
                  onDragStart={() => handleDragStart(job)}
                  className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-move"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium">{job.customer}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(job.priority)}`}>
                      {job.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{job.address}</p>
                  <p className="text-sm font-medium">{job.serviceType}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Technicians */}
        <div className="flex flex-col">
          <h2 className="text-lg font-medium mb-4">Technicians</h2>
          <div className="space-y-4">
            {technicians.map(tech => (
              <div
                key={tech.id}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(tech.id)}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{tech.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tech.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {tech.status}
                  </span>
                </div>
                {tech.currentJob && (
                  <div className="p-3 bg-white rounded border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium">{tech.currentJob.customer}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tech.currentJob.status)}`}>
                        {tech.currentJob.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{tech.currentJob.serviceType}</p>
                    {onUpdateJobStatus && (
                      <div className="mt-2 flex space-x-2">
                        <button
                          onClick={() => onUpdateJobStatus(tech.currentJob.id, 'in-progress')}
                          className="px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                        >
                          Start
                        </button>
                        <button
                          onClick={() => onUpdateJobStatus(tech.currentJob.id, 'completed')}
                          className="px-2 py-1 text-xs font-medium text-green-600 hover:text-green-800"
                        >
                          Complete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

DispatchBoard.propTypes = {
  /** Array of service jobs */
  jobs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    customer: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    serviceType: PropTypes.string.isRequired,
    priority: PropTypes.oneOf(['low', 'medium', 'high']).isRequired,
    status: PropTypes.oneOf(['pending', 'assigned', 'in-progress', 'completed']).isRequired,
  })).isRequired,
  /** Array of technicians */
  technicians: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['available', 'busy']).isRequired,
    currentJob: PropTypes.object,
  })).isRequired,
  /** Job assignment handler */
  onAssignJob: PropTypes.func,
  /** Job status update handler */
  onUpdateJobStatus: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default DispatchBoard;
