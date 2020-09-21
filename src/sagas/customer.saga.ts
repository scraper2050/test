import { getCustomers } from 'api/customer.api';
import { loadCustomersActions } from 'actions/customer/customer.action';
import {
  call,
  cancelled,
  fork,
  put,
  take
} from 'redux-saga/effects';

export function* handleGetCustomers(action: { payload: any }) {
  yield put(loadCustomersActions.fetching());
  try {
    const result = yield call(
      getCustomers,
      action.payload
    );
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
    // Const task = yield fork(handleGetCustomers, fetchAction);
    yield fork(
      handleGetCustomers,
      fetchAction
    );
  }
}
