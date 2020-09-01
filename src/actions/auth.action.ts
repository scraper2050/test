
import { createApiAction } from "./action.utils";
import { createAction } from "redux-actions";

export const loginActions = createApiAction("login");
export const logoutAction = createAction("logout");
export const setAuthAction = createAction("setAuth");
