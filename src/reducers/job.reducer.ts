import { handleActions } from 'redux-actions';
import { jobTypesLoad } from 'actions/job/job.action';
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
    [jobTypesLoad.success.toString()]: (state, action) =>
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

    [jobTypesLoad.fetching.toString()]: (state, action) =>
      state
        .setIn(
          ['getApi', 'isLoading'],
          true
        ),

    [jobTypesLoad.fault.toString()]: (state, action) =>
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
