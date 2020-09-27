import { types } from './job.types';
export const setJobs = (jobs: any) => {
  return {
    'payload': jobs,
    'type': types.SET_JOB
  };
};
export const setJobLoading = (isLoading: any) => {
  return {
    'payload': isLoading,
    'type': types.SET_JOB_LOADING
  };
};
export const refreshJobs = (refresh: any) => {
  return {
    'payload': refresh,
    'type': types.SET_REFRESH_JOB_STATUS
  };
};
