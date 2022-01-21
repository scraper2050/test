import { createApiAction } from 'actions/action.utils';
import { error } from 'actions/snackbar/snackbar.action';
import { JobActionType, types } from './job.types';
import { getAllJobAPI, getjobDetailAPI } from 'api/job.api';


export const loadJobsActions = createApiAction(types.JOB_LOADING);

export const loadingJobs = () => {
  return {
    'type': JobActionType.GET
  };
};

export const setJobs = (jobs: any) => {
  return {
    'payload': jobs,
    'type': types.SET_JOBS
  };
};
export const setJobLoading = (isLoading: any) => {
  return {
    'payload': isLoading,
    'type': types.SET_JOB_LOADING
  };
};

export const loadSingleJob = () => {
  return {
    'type': types.GET_SINGLE_JOB
  };
};

export const getJobs = () => {
  return async (dispatch: any) => {
    const jobs: any = await getAllJobAPI();
    if (jobs.status === 0) {
      dispatch(error(jobs.message));
      dispatch(setJobs([]));
    } else {
      dispatch(setJobs(jobs.jobs));
    }
  };
};

export const getJobDetailAction = (data: any) => {
  return async (dispatch: any) => {
    const job: any = await getjobDetailAPI(data);
    dispatch({
      'payload': job,
      'type': types.SET_SINGLE_JOB });
  };
};

export const refreshJobs = (refresh: any) => {
  return {
    'payload': refresh,
    'type': types.SET_REFRESH_JOB_STATUS
  };
};

export const streamJobs = (isStreaming: boolean) => {
  return {
    'payload': isStreaming,
    'type': types.SET_STREAM_JOB_STATUS
  };
};
