import { handleActions } from "redux-actions";
import { loadCompanyContractsActions } from "actions/vendor/vendor.action";
import { List, Record } from "immutable";
// Import { Action } from "redux";

const initialState = Record({
  getCompanyContractsApi: Record({
    hasErrored: false,
    isLoading: false,
    msg: "",
  })(),
  companyContracts: List([]),
})();

export default handleActions(
  {
    [loadCompanyContractsActions.success.toString()]: (state, action) =>
      state
        .setIn(["companyContracts"], List(action.payload))
        .setIn(["getCompanyContractsApi", "isLoading"], false)
        .setIn(["getCompanyContractsApi", "hasErrored"], false),

    [loadCompanyContractsActions.fetching.toString()]: (state, action) =>
      state.setIn(["getCompanyContractsApi", "isLoading"], true),

    [loadCompanyContractsActions.fault.toString()]: (state, action) =>
      state
        .setIn(["getCompanyContractsApi", "isLoading"], false)
        .setIn(["getCompanyContractsApi", "hasErrored"], true)
        .setIn(["getCompanyContractsApi", "msg"], action.payload),
  },
  initialState
);
