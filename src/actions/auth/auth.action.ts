
import { createAction } from 'redux-actions';
import { createApiAction } from '../action.utils';
import { types } from './auth.types';

export const loginActions = createApiAction(types.USER_LOGIN);
export const logoutAction = createAction(types.USER_LOGOUT);
export const setAuthAction = createAction(types.SET_AUTH);
