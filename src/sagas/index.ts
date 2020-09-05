import { all } from 'redux-saga/effects';
import authFlow from './auth.saga';
import bcModalSaga from './bc-modal.saga';
import customersSaga from './customer.saga';
import jobTypesSaga from './job-type.saga';
import jobSaga from './job.saga';
import watchGetTaxs from './tax.saga'

export default function *rootSaga() {
  yield all([
    customersSaga(),
    jobTypesSaga(),
    authFlow(),
    jobSaga(),
    watchGetTaxs(),
    bcModalSaga(),
  ]);
}
