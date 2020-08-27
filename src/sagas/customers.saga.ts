import { customersLoad } from 'actions/customer/customer.action';
import { getCustomers } from 'api/customers';
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

export function *handleGetCustomers(action: { payload: any }) {
  yield put(customersLoad.fetching());
  try {
    const result = yield call(
      getCustomers,
      action.payload
    );
    yield put(customersLoad.success(result));
  } catch (error) {
    yield put(customersLoad.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(customersLoad.cancelled());
    }
  }
}

export default function *watchCustomersLoad() {
  while (true) {
    const fetchAction = yield take(customersLoad.fetch);
    // Const task = yield fork(handleGetCustomers, fetchAction);
    yield fork(
      handleGetCustomers,
      fetchAction
    );
  }
}
