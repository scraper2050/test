import {  EmployeesForJobActionType } from './employees-for-job.types';
import { getEmployeesForJob } from 'api/employee.api';


export const loadingEmployeesForJob = () => {
    return {
        type: EmployeesForJobActionType.GET
    }
}

export const getEmployeesForJobAction = () => {
    return async (dispatch: any) => {
        const employeesForJob: any = await getEmployeesForJob();
        dispatch(setEmployeesForJob(employeesForJob));
    };
}

export const setEmployeesForJob = (employeesForJob: any) => {
    return {
        type: EmployeesForJobActionType.SUCCESS,
        payload: employeesForJob
    }
}


