import { createApiAction } from "../../action.utils";
import { JobReportActionType, types } from "./job-report.types";
import { getJobReport } from "api/job-report.api";
//import { error } from "actions/snackbar/snackbar.action";

export const loadJobReportActions = createApiAction(types.LOAD_JOBREPORT);

export const loadJobReport = () => {
  return {
    type: JobReportActionType.GET,
  };
};

export const loadSingleJobReport = () => {
  return {
    type: types.GET_JOBREPORT,
  };
};

// export const getJobReports = (data: any) => {
//   return async (dispatch: any) => {
//     const jobReports: any = await getJobReport(data);
//     if (jobReports.status === 0) {
//       dispatch(error(jobReports.description));
//       dispatch(setJobReports([]));
//     } else {
//       dispatch(setJobReports(jobReports.jobReports));
//     }
//   };
// };

export const setJobReports = (jobReport: any) => {
  return {
    type: types.SET_JOBREPORTS,
    payload: jobReport,
  };
};

export const getJobReportAction = (data: any) => {
  return async (dispatch: any) => {
    const jobReport: any = await getJobReport(data);
    console.log(jobReport);
    dispatch({ type: types.SET_JOBREPORT, payload: jobReport });
  };
};
