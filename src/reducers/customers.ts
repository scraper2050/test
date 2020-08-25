import { handleActions } from "redux-actions";
import { List, Record } from "immutable";
import { customersLoad } from "actions/customers";
// import { Action } from "redux";

interface ICustomers {
  isLoading: boolean;
  hasErrored: boolean;
  msg: string;
  result: List<never>;
}

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
    [customersLoad.success.toString()]: (state, action) =>
      state
        .setIn(["list"], List(action.payload))
        .setIn(["getApi", "isLoading"], false)
        .setIn(["getApi", "hasErrored"], false),

    [customersLoad.fetching.toString()]: (state, action) =>
      state
        .setIn(["getApi", "isLoading"], true),

    [customersLoad.fault.toString()]: (state, action) =>
      state
        .setIn(["getApi", "isLoading"], false)
        .setIn(["getApi", "hasErrored"], true)
        .setIn(["getApi", "msg"], action.payload),
  },
  initialState
);
