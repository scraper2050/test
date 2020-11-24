import { JobSiteActionType, JobSiteState } from 'actions/job-site/job-site.types';
import { Reducer } from 'redux';

const initialJobSites: JobSiteState = {
  loading: false,
  data: []
}

export const JobSiteReducer: Reducer<any> = (state = initialJobSites, action) => {
  switch (action.type) {
    case JobSiteActionType.GET:
      return {
        loading: true,
        data: state.data,
      };
    case JobSiteActionType.SUCCESS:
      return {
        loading: false,
        data: [...action.payload],
      }
    case JobSiteActionType.SET:
      return {
        loading: false,
        data:[...action.payload],
      }
    case JobSiteActionType.ADD_NEW_JOB_SITE:
      return {
        ...state,
        loading: false,
        data:[...state.data, action.payload],
      }
    case JobSiteActionType.ADD_NEW_JOB_FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload
      }
    case JobSiteActionType.FAILED:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
      }
    case JobSiteActionType.CLEAR_JOB_SITE_STORE:
      return {
        ...state,
        loading: false,
        data:[]
      }
  }
  return state;
}