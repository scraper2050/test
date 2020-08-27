import { createApiAction } from '../action.utils';
import { types } from './job.types';

export const jobTypesLoad = createApiAction(types.JOB_TYPES_LOAD);
export const jobTypeAdd = createApiAction(types.JOB_TYPES_ADD);
export const jobTypeRemove = createApiAction(types.JOB_TYPES_REMOVE);
