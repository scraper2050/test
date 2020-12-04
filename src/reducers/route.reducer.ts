import { Record } from 'immutable';
import { handleActions } from 'redux-actions';

import { setRouteDataAction, setRouteTitleAction } from 'actions/route/route.action';

const initialState = Record({
  'title': '',
  'actionData': null
})();

export default handleActions(
  {
    [setRouteTitleAction.toString()]: (state, action) =>
      state
        .setIn(['title'], action.payload),
    [setRouteDataAction.toString()]: (state, action) =>
      state
        .setIn(['actionData'], action.payload),
  },
  initialState
);
