
import { types } from './route.types';
import { Action, ActionFunctionAny, createAction } from 'redux-actions';
export type ApiAction = {
  setRouteTitle: ActionFunctionAny<Action<any>>
}

export const createApiAction = (baseAction: string) => ({
  'setRouteTitle': createAction(`${baseAction}`),
});

export const setRouteTitleAction = createAction(types.SET_ROUTE_TITLE);
export const setRouteDataAction = createAction(types.SET_ROUTE_ACTION_DATA);
