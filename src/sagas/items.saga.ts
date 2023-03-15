import { getItemTierList, getItems, updateItem } from 'api/items.api';
import { loadInvoiceItems, loadTierListItems, updateInvoiceItem } from 'actions/invoicing/items/items.action';
import { all, call, cancelled, put, takeLatest } from 'redux-saga/effects';


export function *handleGetItems() {
  try {
    const [itemsResult, tierListResult]:any = yield all([
      call(getItems),
      call(getItemTierList)
    ]);
    yield all([
      put(loadInvoiceItems.success(itemsResult.items)),
      put(loadTierListItems.success(tierListResult.itemTierList))
    ]);
  } catch (error) {
    yield all([
      put(loadInvoiceItems.fault(error.toString())),
      put(loadTierListItems.fault(error.toString()))
    ]);
  } finally {
    if (yield cancelled()) {
      yield put(loadInvoiceItems.cancelled());
    }
  }
}


export function *handleGetTiers() {
  try {
    const result = yield call(getItemTierList);
    yield put(loadTierListItems.success(result.itemTierList));
  } catch (error) {
    yield put(loadTierListItems.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(loadTierListItems.cancelled());
    }
  }
}

export function *handleUpdateItem(action: { payload:any }) {
  try {
    yield call(updateItem, action.payload);
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
    takeLatest(updateInvoiceItem.fetch, handleUpdateItem),
    takeLatest(loadInvoiceItems.fetch, handleGetItems),
    takeLatest(loadTierListItems.fetch, handleGetTiers)
  ]);
}


