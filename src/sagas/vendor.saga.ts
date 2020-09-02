import { getCompanyContracts } from 'api/vendor.api';
import { loadCompanyContractsActions } from 'actions/vendor/vendor.action';
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

export function *handleCompanyContractsTypes(action: { payload: any }) {
  yield put(loadCompanyContractsActions.fetching());
  try {
    const result = yield call(
      getCompanyContracts
    );
    yield put(loadCompanyContractsActions.success(result));
  } catch (error) {
    yield put(loadCompanyContractsActions.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(loadCompanyContractsActions.cancelled());
    }
  }
}

export function *watchCompanyContractsLoad() {
  while (true) {
    const fetchAction = yield take(loadCompanyContractsActions.fetch);
    yield fork(
      handleCompanyContractsTypes,
      fetchAction
    );
  }
}
