import { combineReducers } from "redux";
import countReducer from "./countReducer";
import customers from "./customers";
import jobTypes from "./jobTypes";
import auth from "./auth";

export default combineReducers({
  countReducer,
  customers,
  jobTypes,
  auth
});
