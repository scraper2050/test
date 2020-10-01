import { types } from './job-type.types';
export const setJobTypes = (jobTypes: any) => {
  return {
    'payload': jobTypes,
    'type': types.SET_JOB_TYPES
  };
};
export const setJobTypesLoading = (isLoading: any) => {
  return {
    'payload': isLoading,
    'type': types.SET_JOB_TYPES_LOADING
  };
};
export const refreshJobTypes = (refresh: any) => {
  return {
    'payload': refresh,
    'type': types.SET_REFRESH_JOB_TYPES_STATUS
  };
};
