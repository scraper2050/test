import { getAllSubscriptions } from 'api/subscriptions.api';
import { loadSubscriptions } from 'actions/subscription/subscription.action';
import { call, cancelled, put, takeLatest } from 'redux-saga/effects';


export function *handleGetAllSubscriptions() {
  try {
    const result = yield call(getAllSubscriptions);
    if (result.status) {
      delete result.status;
    }
    const subscriptionArray = Object.keys(result).map(key => ({ 'label': key,
      'value': result[key] }));
    yield put(loadSubscriptions.success(subscriptionArray));
  } catch (error) {
    yield put(loadSubscriptions.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(loadSubscriptions.cancelled());
    }
  }
}


export default function *watchSubscription() {
  yield takeLatest(loadSubscriptions.fetch, handleGetAllSubscriptions);
}
