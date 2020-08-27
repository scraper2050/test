import auth from './auth.reducer';
import { combineReducers } from 'redux';
import customers from './customers.reducer';
import employees from './employees.reducer';
import jobTypes from './job-types.reducer';

export default combineReducers({
  auth,
  customers,
  employees,
  jobTypes
});
