export const types = {
    'EMPLOYEE_LOAD_FOR_JOB': 'loadEmployeesForJobActions',
    'SET_EMPLOYEE_FOR_JOB': 'setEmployeesForJob'
};

export interface EmployeesForJobState {
    readonly loading: boolean
    readonly data?: any[]
    readonly error?: string
}

export enum EmployeesForJobActionType {
    GET = 'getEmployeesForJob',
    SUCCESS = 'getEmployeesForJobSuccess',
    FAILED = 'getEmployeesForJobFailed',
}
