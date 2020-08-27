import { customersLoad } from 'actions/customer/customer.action';
import { handleActions } from 'redux-actions';
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
    [customersLoad.success.toString()]: (state, action) =>
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

    [customersLoad.fetching.toString()]: (state, action) =>
      state
        .setIn(
          ['getApi', 'isLoading'],
          true
        ),

    [customersLoad.fault.toString()]: (state, action) =>
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
