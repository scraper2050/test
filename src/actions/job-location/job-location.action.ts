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
    if (data !== '') {

      const jobLocations: any = await getJobLocations(data);
      if (jobLocations.hasOwnProperty('msg')) {
        dispatch({ type: JobLocationActionType.FAILED, payload: jobLocations.msg });
      } else {
        dispatch(setJobLocations(jobLocations));
      }
    } else if (data == '') {
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
    if (jobLocation.hasOwnProperty('msg')) {
      dispatch({ type: JobLocationActionType.ADD_NEW_JOB_LOCATION_FAILED, payload: jobLocation.msg });
    } else {
      const {status, message} = jobLocation;
      dispatch(setJobLocationNew(jobLocation));
      callback({status, message});
    }
  }
}

export const updateJobLocationAction = (data: any, callback: any) => {
  return async (dispatch: any) => {
    const jobLocation: any = await updateJobLocation(data);
    if (jobLocation.hasOwnProperty('msg')) {
      dispatch({ type: JobLocationActionType.UPDATE_JOB_LOCATION_FAILED, payload: jobLocation.msg });
    } else {
      const {status, message} = jobLocation;
      dispatch(updateJobLocationOld(jobLocation));
      callback({status, message});
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





