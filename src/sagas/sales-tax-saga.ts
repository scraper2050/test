import { all, call, cancelled, put, takeLatest } from 'redux-saga/effects';
import { SalesTaxProps, createSalesTax, updateSalesTax } from 'api/tax.api';
import { createSalesTaxAction, updateSalesTaxAction } from 'actions/tax/tax.action';


export function *handleCreateSalesTAx(action: { payload: SalesTaxProps }) {
  try {
    const result = yield call(createSalesTax, action.payload);
    yield put(createSalesTaxAction.success(result));
  } catch (error) {
    yield put(createSalesTaxAction.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(createSalesTaxAction.cancelled());
    }
  }
}

export function *handleUpdateSalesTax(action: { payload: SalesTaxProps }) {
  try {
    yield call(updateSalesTax, action.payload);
    yield put(updateSalesTaxAction.success(action.payload));
  } catch (error) {
    yield put(updateSalesTaxAction.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(updateSalesTaxAction.cancelled());
    }
  }
}


export default function *watchSalesTax() {
  yield all([
    takeLatest(createSalesTaxAction.fetch, handleCreateSalesTAx),
    takeLatest(updateSalesTaxAction.fetch, handleUpdateSalesTax)
  ]);
}


