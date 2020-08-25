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

import { jobTypesLoad } from "actions/jobTypes";
import { getJobTypes } from "api/jobTypes";

export function* handleGetJobTypes(action: { payload: any }) {
  yield put(jobTypesLoad.fetching());
  try {
    const result = yield call(getJobTypes, action.payload);
    yield put(jobTypesLoad.success(result));
  } catch (error) {
    yield put(jobTypesLoad.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(jobTypesLoad.cancelled());
    }
  }
}

export default function* watchJobTypesLoad() {
  while (true) {
    const fetchAction = yield take(jobTypesLoad.fetch);
    // const task = yield fork(handleGetJobTypes, fetchAction);
    yield fork(handleGetJobTypes, fetchAction);
  }
}
