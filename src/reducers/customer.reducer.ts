
import { handleActions } from 'redux-actions';
import { loadCustomersActions } from 'actions/customer/customer.action';
import { List, Record } from 'immutable';
import { Reducer } from 'redux'
import {CustomersState, CustomersActionType} from './customer.types'

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
    [loadCustomersActions.success.toString()]: (state, action) =>
      state
        .setIn(["list"], List(action.payload))
        .setIn(["getApi", "isLoading"], false)
        .setIn(["getApi", "hasErrored"], false),

    [loadCustomersActions.fetching.toString()]: (state, action) =>
      state.setIn(["getApi", "isLoading"], true),

    [loadCustomersActions.fault.toString()]: (state, action) =>
      state
        .setIn(["getApi", "isLoading"], false)
        .setIn(["getApi", "hasErrored"], true)
        .setIn(["getApi", "msg"], action.payload),
  },
  initialState
);

const initialCustomers: CustomersState = {
    loading: false
}
export const CustomersReducer: Reducer<CustomersState> = (state=initialCustomers, action) => {
    switch (action.type) {
        case CustomersActionType.GET:
            return {loading: true}
        case CustomersActionType.SUCCESS:
            return {
                loading: false,
                customers: action.payload,
            }
        case CustomersActionType.FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
    }
    return state
}
