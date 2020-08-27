import { all } from 'redux-saga/effects';
import authFlow from './auth.saga';
import customersSaga from './customers.saga';
import jobTypesSaga from './job.saga';

export default function *rootSaga() {
  yield all([
    customersSaga(),
    jobTypesSaga(),
    authFlow()
  ]);
}
