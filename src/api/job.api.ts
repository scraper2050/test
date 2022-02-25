import request from 'utils/http.service';
import { formatDateYMD } from 'helpers/format';
import buildFormData from 'utils/build-formdata';
import {
  refreshJobTypes,
  setJobTypes,
  setJobTypesLoading
} from 'actions/job-type/job-type.action';
import { refreshJobs, setJobLoading, setJobs } from 'actions/job/job.action';

const compareByDate = (a: any, b: any) => {
  if (new Date(a.updatedAt) > new Date(b.updatedAt)) {
    return 1;
  }
  if (new Date(a.updatedAt) < new Date(b.updatedAt)) {
    return -1;
  }
  return 0;
};

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

export const getAllJobTypes = () => {
  return new Promise((resolve, reject) => {
    request(`/getJobTypes`, 'post', null)
      .then((res: any) => {
        return resolve(res.data.types);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const getAllJobsAPI = () => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setJobLoading(true));
      request(`/getJobs`, 'post', null)
        .then((res: any) => {
          let tempJobs = res.data.jobs?.filter((job: {status:number}) => job.status !== 3);
          tempJobs = tempJobs.map((tempJob: {updatedAt?:string;createdAt:string})=>({
            ...tempJob, 
            updatedAt: tempJob.updatedAt ? tempJob.updatedAt : tempJob.createdAt
          }));
          tempJobs.sort(compareByDate);
          dispatch(setJobs(tempJobs.reverse()));
          dispatch(setJobLoading(false));
          dispatch(refreshJobs(false));
          return resolve(res.data);
        })
        .catch(err => {
          dispatch(setJobLoading(false));
          return reject(err);
        });
    });
  };
};

export const getAllJobAPI = async (param?: {}) => {
  const body = {};
  let responseData;
  try {
    const response: any = await request('/getJobs', 'POST', body, false);
    responseData = response.data;
  } catch (err) {
    responseData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
        err.data.message ||
        `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return responseData;
};

export const getjobDetailAPI = async (data: any) => {
  const body = {
    'jobId': data.jobId,
    'companyId': data.companyId
  };
  let responseData;
  try {
    const response: any = await request('/getJobDetails', 'POST', body, false);
    responseData = response.data;
  } catch (err) {
    responseData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
        err.data.message ||
        `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return responseData.job;
};

export const callCreateJobAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    buildFormData(formData, data);

    request(`/createJob`, 'post', formData)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        return reject(err);
      });
  });
};

export const callEditJobAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    buildFormData(formData, data);

    request(`/editJob`, 'post', formData)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const callUpdateJobAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/updateJob`, 'post', data, false)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const saveJobType = async (body: { title: string, description?: string }) => {
  let responseData;
  try {
    const response: any = await request('/createJobType', 'POST', body, false);
    responseData = response.data;
  } catch (err) {
    responseData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
        err.data.message ||
        `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return responseData;
};

export const editJobType = async (body: { jobTypeId: string, title: string, description?: string }) => {
  let responseData;
  try {
    const response: any = await request('/editJobType', 'POST', body, false);
    responseData = response.data;
  } catch (err) {
    responseData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
        err.data.message ||
        `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return responseData;
};


export const getSearchJobs = async (data: {
  page?: number,
  pageSize?: number,
  customerNames?: any,
  jobId?: string,
  schedule_date?: string
}) => {
  const { page } = data;
  const { pageSize } = data;
  delete data.page;
  delete data.pageSize;

  const requestLink = `/searchJobs?page=${page}&pageSize=${pageSize}`;

  return new Promise(async (resolve, reject) => {
    try {
      const res: any = await request(requestLink, 'post', data);

      if (res.status === 200) {
        return resolve(res);
      }
      /*
       * If (today) {
       *   return resolve(res.data?.filter((job: any) => formatDateYMD(job.scheduleDate) === formatDateYMD(new Date())));
       * } else {
       *   return resolve(res.data?.filter((job: any) => formatDateYMD(job.scheduleDate) !== formatDateYMD(new Date())));
       * }
       */
    } catch (err) {
      return reject(err);
    }
  });
};


