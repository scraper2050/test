import { combineReducers } from "redux";
import customers from "./customers.reducer";
import jobTypes from "./job-types.reducer";
import auth from "./auth.reducer";
import employees from "./employees.reducer";

export default combineReducers({
  customers,
  jobTypes,
  auth,
  employees
});
