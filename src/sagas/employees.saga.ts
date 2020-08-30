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

import { loadAllEmployeesActions } from "actions/employees.action";
import { getAllEmployees } from "api/employees.api";

export function* handleGetCustomers(action: { payload: any }) {
  yield put(loadAllEmployeesActions.fetching());
  try {
    const result = yield call(getAllEmployees, action.payload);
    yield put(loadAllEmployeesActions.success(result));
  } catch (error) {
    yield put(loadAllEmployeesActions.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(loadAllEmployeesActions.cancelled());
    }
  }
}

export default function* watchLoad() {
  while (true) {
    const fetchAction = yield take(loadAllEmployeesActions.fetch);
    // const task = yield fork(handleGetCustomers, fetchAction);
    yield fork(handleGetCustomers, fetchAction);
  }
}
