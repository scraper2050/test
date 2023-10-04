import request from 'utils/http.service';
import axios from 'axios'
import moment from 'moment';
import {
  refreshJobRequests,
  setJobRequestsLoading,
  setJobRequests,
  setPreviousJobRequestsCursor,
  setNextJobRequestsCursor,
  setLastPageJobRequestsCursor,
  setTotal,
  setNumberOfOpenJobRequest,
} from 'actions/job-request/job-request.action';

const compareByDate = (a: any, b: any) => {
  if (new Date(a.updatedAt) > new Date(b.updatedAt)) {
    return 1;
  }
  if (new Date(a.updatedAt) < new Date(b.updatedAt)) {
    return -1;
  }
  return 0;
};

let cancelTokenGetAllJobRequestAPI:any;
export const getAllJobRequestAPI = (pageSize = 15, previousCursor = '', nextCursor = '', status = '-1', keyword?: string, selectionRange?:{startDate:Date;endDate:Date}|null, lastPageCursor = '') => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setJobRequestsLoading(true));
      const optionObj:any = {
        pageSize,
        previousCursor,
        nextCursor
      };
      if(lastPageCursor){
        delete optionObj.previousCursor;
        optionObj.nextCursor = lastPageCursor;
      }
      if(status !== '-1'){
        optionObj.status = Number(status);
      }
      if(keyword){
        optionObj.keyword = keyword
      }
      if(selectionRange){
        optionObj.startDate = moment(selectionRange.startDate).format('YYYY-MM-DD');
        optionObj.endDate = moment(selectionRange.endDate).format('YYYY-MM-DD');
      }
      if(cancelTokenGetAllJobRequestAPI) {
        cancelTokenGetAllJobRequestAPI.cancel('axios canceled');
        setTimeout(() => {
          dispatch(setJobRequestsLoading(true));
        }, 0);
      }

      cancelTokenGetAllJobRequestAPI = axios.CancelToken.source();

      request(`/getJobRequests`, 'OPTIONS', optionObj, undefined, undefined, cancelTokenGetAllJobRequestAPI, true)
        .then((res: any) => {
          let tempJobRequests = res.data.jobRequests || [];
          tempJobRequests = tempJobRequests.map((tempJob: {updatedAt?:string;createdAt:string})=>({
            ...tempJob,
            updatedAt: tempJob.updatedAt ? tempJob.updatedAt : tempJob.createdAt
          }));
          tempJobRequests.sort(compareByDate);
          dispatch(setJobRequests(tempJobRequests.reverse()));
          dispatch(setPreviousJobRequestsCursor(res.data?.pagination?.previousCursor ? res.data?.pagination?.previousCursor : ''));
          dispatch(setNextJobRequestsCursor(res.data?.pagination?.nextCursor ? res.data?.pagination?.nextCursor : ''));
          dispatch(setLastPageJobRequestsCursor(res.data?.pagination?.lastPageCursor ? res.data?.pagination?.lastPageCursor : ''));
          dispatch(setTotal(res.data.total ? res.data.total : 0));
          dispatch(setNumberOfOpenJobRequest(res.data.totalPending ? res.data.totalPending : 0));
          dispatch(setJobRequestsLoading(false));
          dispatch(refreshJobRequests(false));
          return resolve(res.data);
        })
        .catch(err => {
          dispatch(setJobRequestsLoading(false));
          dispatch(setJobRequests([]));
          if(err.message !== 'axios canceled'){
            return reject(err);
          }
        });
    });
  };
};
