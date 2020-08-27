import { handleActions } from "redux-actions";
import { List, Record } from "immutable";
import { loadAllEmployeesActions } from "actions/employees.action";

const initialState = Record({
  getAllApi: Record({
    isLoading: false,
    hasErrored: false,
    msg: "",
  })(),
  allEmployees: List([]),
})();

export default handleActions(
  {
    [loadAllEmployeesActions.success.toString()]: (state, action) =>
      state
        .setIn(["allEmployees"], List(action.payload))
        .setIn(["getAllApi", "isLoading"], false)
        .setIn(["getAllApi", "hasErrored"], false),

    [loadAllEmployeesActions.fetching.toString()]: (state, action) =>
      state
        .setIn(["getAllApi", "isLoading"], true),

    [loadAllEmployeesActions.fault.toString()]: (state, action) =>
      state
        .setIn(["getAllApi", "isLoading"], false)
        .setIn(["getAllApi", "hasErrored"], true)
        .setIn(["getAllApi", "msg"], action.payload),
  },
  initialState
);
