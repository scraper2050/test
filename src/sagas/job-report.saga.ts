import { getJobReports } from "api/job-report.api";
import { loadJobReportActions } from "actions/customer/job-report/job-report.action";
import { call, cancelled, fork, put, take } from "redux-saga/effects";

export function* handleGetJobReport(action: { payload: any }) {
  yield put(loadJobReportActions.fetching());
  try {
    const result = yield call(getJobReports, action.payload);
    yield put(loadJobReportActions.success(result));
  } catch (error) {
    yield put(loadJobReportActions.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(loadJobReportActions.cancelled());
    }
  }
}

export default function* watchJobReportLoad() {
  while (true) {
    const fetchAction = yield take(loadJobReportActions.fetch);

    yield fork(handleGetJobReport, fetchAction);
  }
}
