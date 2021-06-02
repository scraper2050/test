import { getItems, updateItem } from 'api/items.api';
import { loadInvoiceItems, updateInvoiceItem } from 'actions/invoicing/items/items.action';
import { all, call, cancelled, put, takeLatest } from 'redux-saga/effects';


export function *handleGetItems() {
  try {
    const result = yield call(getItems);
    yield put(loadInvoiceItems.success(result.items));
  } catch (error) {
    yield put(loadInvoiceItems.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(loadInvoiceItems.cancelled());
    }
  }
}

export function *handleUpdateItem(action: { payload:any }) {
  // Yield console.log(action.payload);

  try {
    const result = yield call(updateItem, action.payload);
    yield put(updateInvoiceItem.success(action.payload));
  } catch (error) {
    yield put(updateInvoiceItem.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(updateInvoiceItem.cancelled());
    }
  }
}

export default function *watchInvoiceItemsLoad() {
  yield all([
    takeLatest(loadInvoiceItems.fetch, handleGetItems),
    takeLatest(updateInvoiceItem.fetch, handleUpdateItem)
  ]);
}


