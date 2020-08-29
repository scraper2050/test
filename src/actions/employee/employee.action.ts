
import { createApiAction } from '../action.utils';
import { types } from './employee.types';

export const loadAllEmployeesActions = createApiAction(types.EMPLOYEE_LOAD);
