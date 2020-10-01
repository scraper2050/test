import request from 'utils/http.service';
import { refreshJobTypes, setJobTypes, setJobTypesLoading } from 'actions/job-type/job-type.action';
import { refreshJobs, setJobLoading, setJobs } from 'actions/job/job.action';

export const getAllJobTypesAPI = () => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setJobTypesLoading(true));
      request(`/getJobTypes`, 'post', null)
        .then((res: any) => {
          dispatch(setJobTypes(res.data.types));
          dispatch(setJobTypesLoading(false));
          dispatch(refreshJobTypes(false));
          return resolve(res.data);
        })
        .catch(err => {
          dispatch(setJobTypesLoading(false));
          return reject(err);
        });
    });
  };
};

export const getAllJobAPI = () => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setJobLoading(true));
      request(`/getJobs`, 'post', null)
        .then((res: any) => {
          console.log(res.data.jobs);
          dispatch(setJobs(res.data.jobs));
          dispatch(setJobLoading(false));
          dispatch(refreshJobs(false));
          return resolve(res.data);
        })
        .catch(err => {
          dispatch(setJobTypesLoading(false));
          return reject(err);
        });
    });
  };
};

export const callCreateJobAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/createJob`, 'post', data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
export const callEditJobAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/editJob`, 'post', data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
