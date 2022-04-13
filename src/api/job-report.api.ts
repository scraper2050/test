import moment from 'moment';
import axios from 'axios';
import request from 'utils/http.service';
import { 
  setJobReportLoading,
  setJobReport,
  setPreviousJobReportsCursor,
  setNextJobReportsCursor,
  setJobReportsTotal
} from 'actions/customer/job-report/job-report.action';

let cancelTokenGetAllJobReportsAPI:any;
export const getAllJobReportsAPI = (pageSize = 10, previousCursor = '', nextCursor = '', keyword?: string, selectionRange?:{startDate:Date;endDate:Date}|null) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(setJobReportLoading(true));
      const optionObj:any = {
        pageSize,
        previousCursor,
        nextCursor
      };
      if(keyword){
        optionObj.keyword = keyword
      }
      if(selectionRange){
        optionObj.startDate = moment(selectionRange.startDate).format('YYYY-MM-DD');
        optionObj.endDate = moment(selectionRange.endDate).format('YYYY-MM-DD');
      }
      if(cancelTokenGetAllJobReportsAPI) {
        cancelTokenGetAllJobReportsAPI.cancel('axios canceled');
        setTimeout(() => {
          dispatch(setJobReportLoading(true));
        }, 0);
      }
      
      cancelTokenGetAllJobReportsAPI = axios.CancelToken.source();
      request(`/getAllJobReports`, 'OPTIONS', optionObj, undefined, undefined, cancelTokenGetAllJobReportsAPI)
        .then((res: any) => {
          let tempReports = res.data.reports;
          dispatch(setJobReport(tempReports));
          dispatch(setPreviousJobReportsCursor(res.data.previousCursor ? res.data.previousCursor : ''));
          dispatch(setNextJobReportsCursor(res.data.nextCursor ? res.data.nextCursor : ''));
          dispatch(setJobReportsTotal(res.data.total ? res.data.total : 0));
          dispatch(setJobReportLoading(false));
          return resolve(res.data);
        })
        .catch(err => {
          dispatch(setJobReportLoading(false));
          dispatch(setJobReport([]));
          if(err.message !== 'axios canceled'){
            return reject(err);
          }
        });
    });
  };
};

export const getJobReports = async (data: any) => {
  try {
    const response: any = await request('/getAllJobReports', 'GET', false);
    return response.data;
  } catch (err) {
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
          err.data.message ||
          `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
};

export const emailJobReport = async (data: any) => {
  try {
    const response: any = await request(`/sendJobReportEmail`, 'POST', { 'jobReportId': data.id }, false);
    return response.data;
  } catch (err) {
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
          err.data.message ||
          `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
};

export const getJobReportDetail = async (data: any) => {
  try {
    const response: any = await request(`/getJobReport?jobReportId=${data.jobReportId}`, 'GET', false);
    return response.data.report;
  } catch (err) {
    if (err.response.status >= 400 || err.data.status === 0) {
      throw new Error(err.data.errors ||
          err.data.message ||
          `${err.data['err.user.incorrect']}\nYou have ${err.data.retry} attempts left`);
    } else {
      throw new Error(`Something went wrong`);
    }
  }
};

// Export const getJobReportDetail = async (data: any) => {};
