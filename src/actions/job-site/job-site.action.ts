import { createApiAction } from '../action.utils';
import { getJobSites as fetchJobSites, createJobSite, updateJobSite } from 'api/job-site.api';
import { JobSiteActionType, types } from './job-site.types';



export const loadJobSiteActions = createApiAction(types.JOB_SITE_LOAD);
export const newJobSiteActions = createApiAction(types.JOB_SITE_NEW);

export const loadingJobSites = () => {
    return {
        type: JobSiteActionType.GET
    }
}

export const getJobSites = (data: any) => {
    return async (dispatch: any) => {
        const jobSites: any = await fetchJobSites(data);
        if(jobSites.hasOwnProperty('msg')){
            dispatch({type: JobSiteActionType.FAILED,  payload: jobSites.msg });
        }else{
            dispatch(setJobSites(jobSites));
        }
    };
}

export const setJobSites = (jobSites: any) => {
    return {
        type: JobSiteActionType.SET,
        payload: jobSites
    }
}

export const createJobSiteAction = (data: any, callback: any) => {
    return async (dispatch: any) => {
        const jobSite: any = await createJobSite(data);
        if(jobSite.hasOwnProperty('msg')){
            dispatch({type: JobSiteActionType.ADD_NEW_JOB_FAILED,  payload: jobSite.msg });
        }else{
            dispatch(setJobSiteNew(jobSite));
            callback();
        }  
        
    }
}

export const setJobSiteNew = (jobSite: any) => {
    return {
        type: JobSiteActionType.ADD_NEW_JOB_SITE,
        payload: jobSite
    }
}

export const updateJobSiteAction = (data: any, callback?: any) => {
    return async (dispatch: any) => {
        const jobSite: any = await updateJobSite(data);
        if (jobSite.hasOwnProperty('msg')) {
            dispatch({ type: JobSiteActionType.UPDATE_JOB_SITE_FAILED, payload: jobSite.msg });
            if (callback)
                callback();
        } else {
            dispatch({ type: JobSiteActionType.UPDATE_JOB_SITE, payload: jobSite });
            if (callback)
                callback();
        }
    };
}

export const clearJobSiteStore = () => {
    return {
        type: JobSiteActionType.CLEAR_JOB_SITE_STORE
    }
}



