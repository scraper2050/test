export const types = {
  'JOB_SITE_LOAD': 'loadJobSiteActions',
  'JOB_SITE_NEW': 'newJobSiteAction',
  'JOB_SITE_REMOVE': 'deleteJobSiteActions',
  'SET_JOB_SITE': 'setJobSite'
};


export interface JobSiteState {
  readonly loading: boolean
  readonly data?: any[]
  readonly error?: string
}

export enum JobSiteActionType {
  GET = 'getJobSite',
  SET = 'setJobSite',
  ADD_NEW_JOB_SITE = 'addNewJobSite',
  ADD_NEW_JOB_FAILED = 'addNewJobSiteFailed',
  UPDATE_JOB_SITE_FAILED = 'updateJobSiteFailed',
  UPDATE_JOB_SITE = 'updateJobSite',
  SUCCESS = 'getJobSiteSuccess',
  FAILED = 'getJobSiteFailed',
  CLEAR_JOB_SITE_STORE = 'clearJobSiteStore'
}
