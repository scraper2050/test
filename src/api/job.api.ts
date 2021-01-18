import request from "utils/http.service";
import {
  refreshJobTypes,
  setJobTypes,
  setJobTypesLoading,
} from "actions/job-type/job-type.action";
import { refreshJobs, setJobs } from "actions/job/job.action";

export const getAllJobTypesAPI = () => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setJobTypesLoading(true));
      request(`/getJobTypes`, "post", null)
        .then((res: any) => {
          dispatch(setJobTypes(res.data.types));
          dispatch(setJobTypesLoading(false));
          dispatch(refreshJobTypes(false));
          return resolve(res.data);
        })
        .catch((err) => {
          dispatch(setJobTypesLoading(false));
          return reject(err);
        });
    });
  };
};

// export const getAllJobAPI = () => {
//   return (dispatch: any) => {
//     return new Promise((resolve, reject) => {
//       dispatch(setJobLoading(true));
//       request(`/getJobs`, "post", null)
//         .then((res: any) => {
//           console.log(res.data.jobs);
//           dispatch(setJobs(res.data.jobs));
//           dispatch(setJobLoading(false));
//           dispatch(refreshJobs(false));
//           return resolve(res.data);
//         })
//         .catch((err) => {
//           dispatch(setJobTypesLoading(false));
//           return reject(err);
//         });
//     });
//   };
// };

export const getAllJobAPI = async (param?: {}) => {
  const body = {};
  let responseData;
  try {
    const response: any = await request("/getJobs", "POST", body, false);
    responseData = response.data;
    console.log(response.data.jobs);
  } catch (err) {
    responseData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(
        err.data.errors ||
          err.data.message ||
          `${err.data["err.user.incorrect"]}\nYou have ${err.data.retry} attempts left`
      );
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return responseData;
};

export const getjobDetailAPI = async (data: any) => {
  const body = {
    jobId: data.jobId,
    companyId: data.companyId,
  };
  let responseData;
  try {
    const response: any = await request("/getJobDetails", "POST", body, false);
    responseData = response.data;

    console.log(response.data.job);
  } catch (err) {
    responseData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(
        err.data.errors ||
          err.data.message ||
          `${err.data["err.user.incorrect"]}\nYou have ${err.data.retry} attempts left`
      );
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return responseData.job;
};

export const callCreateJobAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/createJob`, "post", data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

export const callEditJobAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    request(`/editJob`, "post", data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

export const saveJobType = async (body: { title: string }) => {
  let responseData;
  try {
    const response: any = await request("/createJobType", "POST", body, false);
    responseData = response.data;
  } catch (err) {
    responseData = err.data;
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(
        err.data.errors ||
          err.data.message ||
          `${err.data["err.user.incorrect"]}\nYou have ${err.data.retry} attempts left`
      );
    } else {
      throw new Error(`Something went wrong`);
    }
  }
  return responseData;
};
