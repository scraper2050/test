import auth from './auth.reducer';
import { combineReducers } from 'redux';
import customers from './customer.reducer';
import employees from './employee.reducer';
import jobTypes from './job-type.reducer';

export default combineReducers({
  auth,
  customers,
  employees,
  jobTypes
});
