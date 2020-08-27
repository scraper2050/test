import { getJobTypes } from 'api/jobTypes';
import { jobTypesLoad } from 'actions/job/job.action';
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


export function *handleGetJobTypes(action: { payload: any }) {
  yield put(jobTypesLoad.fetching());
  try {
    const result = yield call(
      getJobTypes,
      action.payload
    );
    yield put(jobTypesLoad.success(result));
  } catch (error) {
    yield put(jobTypesLoad.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(jobTypesLoad.cancelled());
    }
  }
}

export default function *watchJobTypesLoad() {
  while (true) {
    const fetchAction = yield take(jobTypesLoad.fetch);
    // Const task = yield fork(handleGetJobTypes, fetchAction);
    yield fork(
      handleGetJobTypes,
      fetchAction
    );
  }
}
