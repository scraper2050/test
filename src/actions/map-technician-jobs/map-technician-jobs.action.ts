import {
  MapTechnicianJobsActionType,
} from './map-technician-jobs.types';

export const setMapTechnicianJobs = (jobs: any) => {
  return {
    'payload': {jobs},
    'type': MapTechnicianJobsActionType.SET_MAP_TECHNICIAN_JOBS
  };
};
