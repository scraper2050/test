import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import { emailJobReport, getJobReportDetail, getJobReports } from 'api/job-report.api';
import { loadJobReportActions, loadJobReportsActions, updateEmailHistory } from 'actions/customer/job-report/job-report.action';


export function *handleGetJobReport(action: { payload: any }) {
  try {
    const result = yield call(getJobReportDetail, action.payload);
    yield put(loadJobReportActions.success(result));
  } catch (error) {
    yield put(loadJobReportActions.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(loadJobReportActions.cancelled());
    }
  }
}

export function *handleGetJobReports(action: { payload: any }) {
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
  yield takeLatest(loadJobReportsActions.fetch, handleGetJobReports);
  yield takeLatest(loadJobReportActions.fetch, handleGetJobReport);
}


