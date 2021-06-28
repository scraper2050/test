import { createApiAction } from '../../action.utils';
import { types } from '../../../reducers/job-report.types';


export const loadJobReportActions = createApiAction(types.LOAD_JOBREPORT);
export const loadJobReportsActions = createApiAction(types.LOAD_JOBREPORTS);
// Export const emailJobReportActions = createApiAction(types.EMAIL_JOBREPORTS);

interface UpdateEmailProps {
  id: string;
  email: string
}

export const updateEmailHistory = ({ id, email }:UpdateEmailProps) => {
  return { 'payload': { email,
    id
  },
  'type': types.UPDATE_EMAIL_HISTORY
  };
};

