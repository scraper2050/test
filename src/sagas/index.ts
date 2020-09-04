import { all } from 'redux-saga/effects';
import authFlow from './auth.saga';
import bcModalSaga from './bc-modal.saga';
import customersSaga from './customer.saga';
import jobTypesSaga from './job-type.saga';

export default function *rootSaga() {
  yield all([
    customersSaga(),
    jobTypesSaga(),
    authFlow(),
    bcModalSaga()
  ]);
}
