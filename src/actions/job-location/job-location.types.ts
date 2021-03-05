export const types = {
  'JOB_LOCATION_LOAD': 'loadJobSiteActions',
};


export interface JobLocationState {
  readonly loading: boolean
  readonly refresh: boolean
  readonly data?: any[]
  readonly error?: string
}

export enum JobLocationActionType {
  GET = 'getJobLocation',
  SET = 'setJobLocations',
  ADD_NEW_JOB_LOCATION = 'addNewJobLocation',
  ADD_NEW_JOB_LOCATION_FAILED = 'addNewJobLocationFailed',
  UPDATE_JOB_LOCATION_FAILED = 'updateJobLocationFailed',
  UPDATE_JOB_LOCATION = 'updateJobLocation',
  SUCCESS = 'getJobLocationSuccess',
  FAILED = 'getJobLocationFailed',
  CLEAR_JOB_LOCATION_STORE = 'clearJobLocationStore',
  SET_REFRESH_JOB_LOCATION_STATUS = 'setRefreshJobLocationStatus'
}