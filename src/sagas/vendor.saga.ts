import {
  all,
  call,
  cancelled,
  fork,
  put,
  take,
  takeLatest
} from 'redux-saga/effects';
import { cancelOrFinishContractActions } from 'actions/vendor/vendor.action';
import { finishVendorApi } from 'api/vendor.api';
import { vendorStatusToNumber } from 'actions/vendor/vendor.types';


/*
 * Export function *handleCompanyContractsTypes(action: { payload: any }) {
 *   yield put(loadCompanyContractsActions.fetching());
 *   try {
 *     const result = yield call(getCompanyContracts);
 *     yield put(loadCompanyContractsActions.success(result));
 *   } catch (error) {
 *     yield put(loadCompanyContractsActions.fault(error.toString()));
 *   } finally {
 *     if (yield cancelled()) {
 *       yield put(loadCompanyContractsActions.cancelled());
 *     }
 *   }
 * }
 */

export function *handleCancelOrFinish(action: { payload: any }) {
  yield put(cancelOrFinishContractActions.fetching());
  try {
    const result = yield call(finishVendorApi, action.payload);
    if (result.status !== 0) {
      yield put(cancelOrFinishContractActions.success({ '_id': action.payload.contractId,
        'message': result.message,
        'status': vendorStatusToNumber[action.payload.status] }));
    } else {
      yield put(cancelOrFinishContractActions.fault(result.message));
    }
  } catch (error) {
    yield put(cancelOrFinishContractActions.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(cancelOrFinishContractActions.cancelled());
    }
  }
}

export default function *watchCompanyContractsLoad() {
  yield all([
    // TakeLatest(loadCompanyContractsActions.fetch, handleCompanyContractsTypes),
    takeLatest(cancelOrFinishContractActions.fetch, handleCancelOrFinish)
  ]);
}
