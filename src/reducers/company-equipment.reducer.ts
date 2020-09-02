import { handleActions } from "redux-actions";
import { loadCompanyEquipmentsActions } from "actions/company-equipment/company-equipment.action";
import { List, Record } from "immutable";
// Import { Action } from "redux";

const initialState = Record({
  getApi: Record({
    hasErrored: false,
    isLoading: false,
    msg: "",
  })(),
  list: List([]),
})();

export default handleActions(
  {
    [loadCompanyEquipmentsActions.success.toString()]: (state, action) =>
      state
        .setIn(["list"], List(action.payload))
        .setIn(["getApi", "isLoading"], false)
        .setIn(["getApi", "hasErrored"], false),

    [loadCompanyEquipmentsActions.fetching.toString()]: (state, action) =>
      state.setIn(["getApi", "isLoading"], true),

    [loadCompanyEquipmentsActions.fault.toString()]: (state, action) =>
      state
        .setIn(["getApi", "isLoading"], false)
        .setIn(["getApi", "hasErrored"], true)
        .setIn(["getApi", "msg"], action.payload),
  },
  initialState
);
