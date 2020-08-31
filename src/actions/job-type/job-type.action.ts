import { createApiAction } from '../action.utils';
import { types } from './job-type.types';

export const loadJobTypesActions = createApiAction(types.JOB_TYPES_LOAD);
export const newJobTypeActions = createApiAction(types.JOB_TYPES_NEW);
export const deleteJobTypeActions = createApiAction(types.JOB_TYPES_REMOVE);
