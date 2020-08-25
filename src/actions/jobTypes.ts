
import { createApiAction } from "./actionUtil";
// import { createAction } from "redux-actions";

export const jobTypesLoad = createApiAction("jobTypesLoad");
export const jobTypeAdd = createApiAction("jobTypeAdd");
export const jobTypeRemove = createApiAction("jobTypeRemove");
