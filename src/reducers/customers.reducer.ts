import { handleActions } from "redux-actions";
import { List, Record } from "immutable";
import { loadCustomersActions } from "actions/customers.action";
// import { Action } from "redux";

const initialState = Record({
  getApi: Record({
    isLoading: false,
    hasErrored: false,
    msg: "",
  })(),
  list: List([]),
})();

export default handleActions(
  {
    [loadCustomersActions.success.toString()]: (state, action) =>
      state
        .setIn(["list"], List(action.payload))
        .setIn(["getApi", "isLoading"], false)
        .setIn(["getApi", "hasErrored"], false),

    [loadCustomersActions.fetching.toString()]: (state, action) =>
      state
        .setIn(["getApi", "isLoading"], true),

    [loadCustomersActions.fault.toString()]: (state, action) =>
      state
        .setIn(["getApi", "isLoading"], false)
        .setIn(["getApi", "hasErrored"], true)
        .setIn(["getApi", "msg"], action.payload),
  },
  initialState
);
