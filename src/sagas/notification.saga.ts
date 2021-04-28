import {
  all,
  call,
  cancelled,
  fork,
  put,
  take,
  takeLatest

} from 'redux-saga/effects';
import { dismissNotificationAction, loadNotificationsActions, markNotificationAsRead } from 'actions/notifications/notifications.action';
import { getNotifications, updateNotification } from 'api/notifications.api';


export function *handleGetNotifications(action: { payload: any }) {
  yield put(loadNotificationsActions.fetching());
  try {
    const result = yield call(getNotifications);
    yield put(loadNotificationsActions.success(result.notifications));
  } catch (error) {
    yield put(loadNotificationsActions.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(loadNotificationsActions.cancelled());
    }
  }
}

export function *handleNotificationMarkAsRead(action: {payload: string}) {
  yield put(markNotificationAsRead.fetching());
  try {
    const result = yield call(updateNotification, action.payload);
    yield put(markNotificationAsRead.success(result.notification));
  } catch (error) {
    yield put(markNotificationAsRead.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(markNotificationAsRead.cancelled());
    }
  }
}

export function *handleNotificationDismiss(action: {payload: string}) {
  yield put(markNotificationAsRead.fetching());
  try {
    const result = yield call(updateNotification, action.payload);
    yield put(markNotificationAsRead.success(result.notification));
  } catch (error) {
    yield put(markNotificationAsRead.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(markNotificationAsRead.cancelled());
    }
  }
}

export default function *watchNotifications() {
  yield all([
    takeLatest(loadNotificationsActions.fetch, handleGetNotifications),
    takeLatest(markNotificationAsRead.fetch, handleNotificationMarkAsRead),
    takeLatest(dismissNotificationAction.fetch, handleNotificationDismiss)
  ]);
}
