import { JobLocationActionType, JobLocationState } from 'actions/job-location/job-location.types';
import { Reducer } from 'redux';

const initialJobLocations: JobLocationState = {
  loading: false,
  refresh: true,
  data: []
}

export const JobLocationReducer: Reducer<any> = (state = initialJobLocations, action) => {
  switch (action.type) {
    case JobLocationActionType.GET:
      return {
        loading: true,
        data: state.data,
      };
    case JobLocationActionType.SUCCESS:
      return {
        loading: false,
        data: [...action.payload],
      }
    case JobLocationActionType.SET_REFRESH_JOB_LOCATION_STATUS:
      return {
        ...state,
        refresh: action.payload
      }
    case JobLocationActionType.SET:
      return {
        loading: false,
        refresh: false,
        data: [...action.payload],
      }
    case JobLocationActionType.ADD_NEW_JOB_LOCATION:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      }
    case JobLocationActionType.ADD_NEW_JOB_LOCATION:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload
      }
    case JobLocationActionType.FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
      }
    case JobLocationActionType.CLEAR_JOB_LOCATION_STORE:
      return {
        ...state,
        loading: false,
        data: []
      }
  }
  return state;
}