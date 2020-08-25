import { combineReducers } from "redux";
import countReducer from "./countReducer";
import customers from "./customers";

export default combineReducers({
  countReducer,
  customers
});
