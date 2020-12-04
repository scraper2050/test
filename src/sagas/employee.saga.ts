import { getEmployeesForJob } from 'api/employee.api';
import { loadAllEmployeesActions } from 'actions/employee/employee.action';
import {
  call,
  cancelled,
  fork,
  put,
  take
  /*
   * TakeEvery,
   * delay,
   * takeLatest,
   */
} from 'redux-saga/effects';
// Import { Action } from "redux-actions";

export function *handleGetCustomers(action: { payload: any }) {
  yield put(loadAllEmployeesActions.fetching());
  try {
    const result = yield call(
      getEmployeesForJob
    );
    yield put(loadAllEmployeesActions.success(result));
  } catch (error) {
    yield put(loadAllEmployeesActions.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(loadAllEmployeesActions.cancelled());
    }
  }
}

export default function *watchLoadAll() {
  while (true) {
    const fetchAction = yield take(loadAllEmployeesActions.fetch);
    // Const task = yield fork(handleGetCustomers, fetchAction);
    yield fork(
      handleGetCustomers,
      fetchAction
    );
  }
}
