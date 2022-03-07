import { createApiAction } from '../action.utils';
import { getJobLocations, createJobLocation, updateJobLocation, } from 'api/job-location.api';
import { JobLocationActionType, types } from './job-location.types';


export const loadingJobLocations = () => {
  return {
    type: JobLocationActionType.GET
  }
}

export const getJobLocationsAction = (data: any) => {
  return async (dispatch: any) => {
    if (data.customerId !== '') {
      const jobLocations: any = await getJobLocations(data);
      if (jobLocations.status === 0) {
        dispatch({ type: JobLocationActionType.FAILED, payload: jobLocations.message});
      } else {
        dispatch(setJobLocations(jobLocations));
      }
    } else {
      dispatch(setJobLocations([]))
    }
  };
}

export const refreshJobLocation = (refresh: boolean) => {
  return {
    payload: refresh,
    type: JobLocationActionType.SET_REFRESH_JOB_LOCATION_STATUS
  }
}

export const setJobLocations = (jobLocations: any) => {
  return {
    type: JobLocationActionType.SET,
    payload: jobLocations
  }
}

export const createJobLocationAction = (data: any, callback: any) => {
  return async (dispatch: any) => {
    const jobLocation: any = await createJobLocation(data);
    if (jobLocation.status === 0) {
      dispatch({ type: JobLocationActionType.ADD_NEW_JOB_LOCATION_FAILED, payload: jobLocation.message });
    } else {
      const {status, message} = jobLocation;
      dispatch(setJobLocationNew(jobLocation));
      callback({status, message});
    }
  }
}

export const updateJobLocationAction = (data: any, callback: any) => {
  return async (dispatch: any) => {
    const jobLocationUpdated: any = await updateJobLocation(data);
    if (jobLocationUpdated.status === 0) {
      dispatch({ type: JobLocationActionType.UPDATE_JOB_LOCATION_FAILED, payload: jobLocationUpdated.message });
      const {status, message, jobLocation} = jobLocationUpdated;
      callback({status, message, jobLocation});
    } else {
      const {status, message, jobLocation} = jobLocationUpdated;
      dispatch(updateJobLocationOld(jobLocationUpdated));
      callback({status, message, jobLocation});
    }
  }
}

export const setJobLocationNew = (jobLocation: any) => {
  return {
    type: JobLocationActionType.ADD_NEW_JOB_LOCATION,
    payload: jobLocation
  }
}

export const updateJobLocationOld = (jobLocation: any) => {
  return {
    type: JobLocationActionType.UPDATE_JOB_LOCATION,
    payload: jobLocation
  }
}

export const clearJobLocationStore = () => {
  return {
    type: JobLocationActionType.CLEAR_JOB_LOCATION_STORE
  }
}





