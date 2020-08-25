
import { createApiAction } from "./actionUtil";
// import { createAction } from "redux-actions";

export const customersLoad = createApiAction("customersLoad");
export const customerAdd = createApiAction("customerAdd");
export const customerRemove = createApiAction("customerRemove");
