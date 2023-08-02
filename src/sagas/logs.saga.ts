import { getLogs } from './../api/logs.api';
import { loadInvoiceLogs } from 'actions/invoicing/logs/logs.action';
import { all, call, cancelled, put, takeLatest } from 'redux-saga/effects';


export function* handleGetLogs(action: { payload: any }) {
  try {
    const [logsResult]:any = yield all([
      call(getLogs, action.payload)
    ]);
    yield all([
      put(loadInvoiceLogs.success(logsResult.invoiceLogs))
    ]);
  } catch (error) {
    yield all([
      put(loadInvoiceLogs.fault(error.toString()))
    ]);
  } finally {
    if (yield cancelled()) {
      yield put(loadInvoiceLogs.cancelled());
    }
  }
}



export default function *watchInvoiceLogsLoad() {
  yield all([
    takeLatest(loadInvoiceLogs.fetch, handleGetLogs)
  ]);
}


