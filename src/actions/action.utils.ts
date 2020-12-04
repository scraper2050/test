
import { Action, ActionFunctionAny, createAction } from 'redux-actions';

export type ApiAction = {
  fetch: ActionFunctionAny<Action<any>>,
  fetching: ActionFunctionAny<Action<any>>,
  success: ActionFunctionAny<Action<any>>,
  fault: ActionFunctionAny<Action<any>>,
  cancelled: ActionFunctionAny<Action<any>>,
}

export const createApiAction = (baseAction: string) => ({
  'cancelled': createAction(`${baseAction}/cancelled`),
  'fault': createAction(`${baseAction}/fault`),
  'fetch': createAction(`${baseAction}/fetch`),
  'fetching': createAction(`${baseAction}/fetching`),
  'success': createAction(`${baseAction}/success`)
});
