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

import { loadJobTypesActions } from "actions/job-types.action";
import { getJobTypes } from "api/job-types.api";

export function* handleGetJobTypes(action: { payload: any }) {
  yield put(loadJobTypesActions.fetching());
  try {
    const result = yield call(getJobTypes, action.payload);
    yield put(loadJobTypesActions.success(result));
  } catch (error) {
    yield put(loadJobTypesActions.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(loadJobTypesActions.cancelled());
    }
  }
}

export default function* watchJobTypesLoad() {
  while (true) {
    const fetchAction = yield take(loadJobTypesActions.fetch);
    // const task = yield fork(handleGetJobTypes, fetchAction);
    yield fork(handleGetJobTypes, fetchAction);
  }
}
