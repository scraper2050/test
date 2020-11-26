
import { createApiAction } from '../action.utils';
import { UsersActionType, types } from './employee.types';
import { getEmployees as fetchEmployees } from 'api/employee.api';

export const loadAllEmployeesActions = createApiAction(types.EMPLOYEE_LOAD);
export const newCustomerAction = createApiAction(types.EMPLOYEE_NEW);
export const deleteCustomerActions = createApiAction(types.EMPLOYEE_REMOVE);

export const loadingEmployees = () => {
    return {
        type: UsersActionType.GET
    }
}

export const getEmployees = () => {
    return async (dispatch: any) => {
        const employees: any = await fetchEmployees();
        dispatch(setEmployees(employees));
    };
}

export const setEmployees = (employees: any) => {
    return {
        type: types.SET_EMPLOYEES,
        payload: employees
    }
}