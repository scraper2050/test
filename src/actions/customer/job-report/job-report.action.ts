import { createApiAction } from '../../action.utils';
import { getJobReportDetail } from 'api/job-report.api';
import { JobReportActionType, types } from '../../../reducers/job-report.types';


export const loadJobReportActions = createApiAction(types.LOAD_JOBREPORT);
export const loadJobReportsActions = createApiAction(types.LOAD_JOBREPORTS);

export const loadingJobReport = () => {
  return {
    'type': JobReportActionType.GET
  };
};

export const loadSingleJobReport = () => {
  return {
    'type': types.GET_SINGLE_JOBREPORT
  };
};


export const setJobReports = (jobReports: any) => {
  return {
    'payload': jobReports,
    'type': types.SET_JOBREPORTS
  };
};

export const getJobReportDetailAction = (data: any) => {
  return async (dispatch: any) => {
    const jobReport: any = await getJobReportDetail(data);
    dispatch({ 'payload': jobReport,
      'type': types.SET_SINGLE_JOBREPORT
    });
  };
};
