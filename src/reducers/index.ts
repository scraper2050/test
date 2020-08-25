import { combineReducers } from "redux";
import countReducer from "./countReducer";
import customers from "./customers";
import jobTypes from "./jobTypes";

export default combineReducers({
  countReducer,
  customers,
  jobTypes
});
