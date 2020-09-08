import { getJobTypes } from 'api/job.api';
import { loadJobTypesActions } from 'actions/job-type/job-type.action';
import {
  call,
  cancelled,
  fork,
  put,
  take
} from 'redux-saga/effects';

export function *handleGetJobTypes(action: { payload: any }) {
  yield put(loadJobTypesActions.fetching());
  try {
    const result = yield call(
      getJobTypes,
      action.payload
    );
    yield put(loadJobTypesActions.success(result));
  } catch (error) {
    yield put(loadJobTypesActions.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(loadJobTypesActions.cancelled());
    }
  }
}

export default function *watchJobTypesLoad() {
  while (true) {
    const fetchAction = yield take(loadJobTypesActions.fetch);
    // Const task = yield fork(handleGetJobTypes, fetchAction);
    yield fork(
      handleGetJobTypes,
      fetchAction
    );
  }
}
