import { all, call, cancelled, put, takeLatest } from 'redux-saga/effects';
import { getInvoiceDetail } from 'api/invoicing.api';
import { loadInvoiceDetail } from 'actions/invoicing/invoicing.action';


export function *handleGetInvoiceDetail(action: {payload:any}) {
  try {
    const result = yield call(getInvoiceDetail, action.payload);
    yield put(loadInvoiceDetail.success(result.invoice));
  } catch (error) {
    yield put(loadInvoiceDetail.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(loadInvoiceDetail.cancelled());
    }
  }
}

export default function *watchLoadInvoiceDetail() {
  yield all([takeLatest(loadInvoiceDetail.fetch, handleGetInvoiceDetail)]);
}


