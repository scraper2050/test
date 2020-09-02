import { handleActions } from 'redux-actions';
import { loadAllEmployeesActions } from 'actions/employee/employee.action';
import { List, Record } from 'immutable';

const initialState = Record({
  list: List([]),
  'getAllApi': Record({
    'hasErrored': false,
    'isLoading': false,
    'msg': ''
  })()
})();

export default handleActions(
  {
    [loadAllEmployeesActions.success.toString()]: (state, action) =>
      state
        .setIn(
          ['list'],
          List(action.payload)
        )
        .setIn(
          ['getAllApi', 'isLoading'],
          false
        )
        .setIn(
          ['getAllApi', 'hasErrored'],
          false
        ),

    [loadAllEmployeesActions.fetching.toString()]: (state, action) =>
      state
        .setIn(
          ['getAllApi', 'isLoading'],
          true
        ),

    [loadAllEmployeesActions.fault.toString()]: (state, action) =>
      state
        .setIn(
          ['getAllApi', 'isLoading'],
          false
        )
        .setIn(
          ['getAllApi', 'hasErrored'],
          true
        )
        .setIn(
          ['getAllApi', 'msg'],
          action.payload
        )
  },
  initialState
);
