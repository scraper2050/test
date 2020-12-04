import { Reducer } from 'redux';
import { EmployeesForJobState, EmployeesForJobActionType, types } from './../actions/employees-for-job/employees-for-job.types';

const initialEmployeesForJob: EmployeesForJobState = {
  loading: false,
  data: [],
}

export const EmployeesForJobReducer: Reducer<any> = (state = initialEmployeesForJob, action) => {
  switch (action.type) {
    case EmployeesForJobActionType.GET:
      return {
        loading: true,
        data: initialEmployeesForJob,
      };
    case EmployeesForJobActionType.SUCCESS:
      let newEmployeesForJobData = [...action.payload.employees, action.payload.superAdmin];
      return {
        loading: false,
        data: newEmployeesForJobData,
      }
    case EmployeesForJobActionType.FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
  }
  return state;
}
