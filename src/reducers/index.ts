import auth from './auth.reducer';
import { combineReducers } from 'redux';
import countReducer from './count.reducer';
import customers from './customers.reducer';
import jobTypes from './job.reducer';

export default combineReducers({
  auth,
  countReducer,
  customers,
  jobTypes
});
