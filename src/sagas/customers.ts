import { put, call, take, fork, cancelled, takeEvery, delay, takeLatest } from "redux-saga/effects";
import { Action } from "redux-actions";

import { customersLoad } from "actions/customers";
import { getCustomers } from "api/customers";


export function* handleGetCustomers(action:{payload: any}) {
  yield put(customersLoad.fetching());
  try {
    const result = yield call(getCustomers, action.payload);
    yield put(customersLoad.success(result));
  } catch (error) {
    yield put(customersLoad.fault(error.toString()));
  }
  finally {
    if (yield cancelled()) {
      yield put(customersLoad.cancelled());
    }
  }
}

export default function* watchCustomersLoad() {
  const fetchAction = yield take(customersLoad.fetch);
  const task = yield fork(handleGetCustomers, fetchAction);
}
