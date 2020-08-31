import { handleActions } from 'redux-actions';
import { loadCustomersActions } from 'actions/customer/customer.action';
import { List, Record } from 'immutable';
// Import { Action } from "redux";

const initialState = Record({
  'getApi': Record({
    'hasErrored': false,
    'isLoading': false,
    'msg': ''
  })(),
  'list': List([])
})();

export default handleActions(
  {
    [loadCustomersActions.success.toString()]: (state, action) =>
      state
        .setIn(
          ['list'],
          List(action.payload)
        )
        .setIn(
          ['getApi', 'isLoading'],
          false
        )
        .setIn(
          ['getApi', 'hasErrored'],
          false
        ),

    [loadCustomersActions.fetching.toString()]: (state, action) =>
      state
        .setIn(
          ['getApi', 'isLoading'],
          true
        ),

    [loadCustomersActions.fault.toString()]: (state, action) =>
      state
        .setIn(
          ['getApi', 'isLoading'],
          false
        )
        .setIn(
          ['getApi', 'hasErrored'],
          true
        )
        .setIn(
          ['getApi', 'msg'],
          action.payload
        )
  },
  initialState
);
