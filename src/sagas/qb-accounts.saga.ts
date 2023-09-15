import { quickbooksGetAccounts } from '../api/quickbooks.api';
import { loadQBAccounts } from 'actions/quickbookAccount/quickbook.action';
import { all, call, cancelled, put, takeLatest } from 'redux-saga/effects';


export function* handleGetQBAccount(action: { payload: any }) {
  // pending integrations not in use currently
  // try {
  //   const [qbAccountsResult]:any = yield all([
  //     call(quickbooksGetAccounts, action.payload)
  //   ]);
  //   yield all([
  //     put(loadQBAccounts.success(qbAccountsResult.data.accounts))
  //   ]);
  // } catch (error) {
  //   yield all([
  //     put(loadQBAccounts.fault(error.toString()))
  //   ]);
  // } finally {
  //   if (yield cancelled()) {
  //     yield put(loadQBAccounts.cancelled());
  //   }
  // }
}



export default function*watchQBAccountLoad() {
  yield all([
    takeLatest(loadQBAccounts.fetch, handleGetQBAccount)
  ]);
}


