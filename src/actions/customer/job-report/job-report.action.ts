import { createApiAction } from "../../action.utils";
import { JobReportActionType, types } from "../../../reducers/job-report.types";
import { getJobReportDetail } from "api/job-report.api";
//import { error } from "actions/snackbar/snackbar.action";

export const loadJobReportActions = createApiAction(types.LOAD_JOBREPORT);

export const loadingJobReport = () => {
  return {
    type: JobReportActionType.GET,
  };
};

export const loadSingleJobReport = () => {
  return {
    type: types.GET_SINGLE_JOBREPORT,
  };
};

// export const getJobReports = (data: any) => {
//   return async (dispatch: any) => {
//     const jobReports: any = await fetchJobReports(data);
//     if (jobReports.status === 0) {
//       dispatch(error(jobReports.description));
//       dispatch(setJobReports([]));
//     } else {
//       dispatch(setJobReports(jobReports.jobReports));
//     }
//   };
// };

export const setJobReports = (jobReports: any) => {
  return {
    type: types.SET_JOBREPORTS,
    payload: jobReports,
  };
};

export const getJobReportDetailAction = (data: any) => {
  return async (dispatch: any) => {
    const jobReport: any = await getJobReportDetail(data);
    console.log(jobReport);
    dispatch({ type: types.SET_SINGLE_JOBREPORT, payload: jobReport });
  };
};
