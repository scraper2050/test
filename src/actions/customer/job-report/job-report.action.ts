import { createApiAction } from '../../action.utils';
import { types } from '../../../reducers/job-report.types';


export const loadJobReportActions = createApiAction(types.LOAD_JOBREPORT);
export const loadJobReportsActions = createApiAction(types.LOAD_JOBREPORTS);
export const emailJobReportActions = createApiAction(types.EMAIL_JOBREPORTS);


export const resetEmailState = () => {
  return { 'type': types.RESET_EMAIL_STATE };
};
