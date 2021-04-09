import { createApiAction } from '../../action.utils';
import { types } from '../../../reducers/job-report.types';


export const loadJobReportActions = createApiAction(types.LOAD_JOBREPORT);
export const loadJobReportsActions = createApiAction(types.LOAD_JOBREPORTS);

