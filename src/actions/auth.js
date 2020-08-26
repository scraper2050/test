
import { createApiAction } from "./actionUtil";
import { createAction } from "redux-actions";

export const loginActions = createApiAction("login");
export const logoutAction = createAction("logout");
export const setAuthAction = createAction("setAuth");
