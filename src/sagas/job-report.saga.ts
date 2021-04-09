import { getJobReports } from 'api/job-report.api';
import { loadJobReportsActions } from 'actions/customer/job-report/job-report.action';
import { call, cancelled, fork, put, take } from 'redux-saga/effects';

export function *handleGetJobReport(action: { payload: any }) {
  try {
    const result = yield call(getJobReports, action.payload);
    yield put(loadJobReportsActions.success(result));
  } catch (error) {
    yield put(loadJobReportsActions.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(loadJobReportsActions.cancelled());
    }
  }
}

export default function *watchJobReportLoad() {
  while (true) {
    const fetchAction = yield take(loadJobReportsActions.fetch);
    yield fork(handleGetJobReport, fetchAction);
  }
}
