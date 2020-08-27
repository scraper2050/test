import {
  put,
  call,
  take,
  fork,
  cancelled,
  // takeEvery,
  // delay,
  // takeLatest,
} from "redux-saga/effects";
// import { Action } from "redux-actions";

import { loadCustomersActions } from "actions/customers.action";
import { getCustomers } from "api/customers.api";

export function* handleGetCustomers(action: { payload: any }) {
  yield put(loadCustomersActions.fetching());
  try {
    const result = yield call(getCustomers, action.payload);
    yield put(loadCustomersActions.success(result));
  } catch (error) {
    yield put(loadCustomersActions.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(loadCustomersActions.cancelled());
    }
  }
}

export default function* watchCustomersLoad() {
  while (true) {
    const fetchAction = yield take(loadCustomersActions.fetch);
    // const task = yield fork(handleGetCustomers, fetchAction);
    yield fork(handleGetCustomers, fetchAction);
  }
}
