import { NotificationState } from './notifications.types';
import { Reducer } from 'redux';
import { dismissNotificationAction, loadNotificationsActions, markNotificationAsRead } from 'actions/notifications/notifications.action';
import { NotificationItem } from 'app/components/bc-header/bc-header-notification';
import { types } from 'actions/auth/auth.types';
import { NotificationActionTypes } from 'actions/notifications/notifications.types';

const initialNotificationState: NotificationState = {
  'error': '',
  'loading': false,
  'notifications': []
};

export const NotificationsReducer: Reducer<any> = (
  state = initialNotificationState,
  action
) => {
  switch (action.type) {
    case loadNotificationsActions.fetch.toString():
      return {
        ...state,
        'loading': true
      };
    case loadNotificationsActions.fetching.toString():
      return {
        ...state,
        'loading': true
      };
    case loadNotificationsActions.success.toString():
      return {
        ...state,
        'loading': false,
        'notifications': action.payload
      };
    case loadNotificationsActions.fault.toString():
      return {
        ...state,
        'error': action.payload,
        'loading': false
      };
    case loadNotificationsActions.cancelled.toString():
      return {
        ...state,
        'loading': false
      };
    case markNotificationAsRead.success.toString():
    case dismissNotificationAction.success.toString():

      return {
        ...state,
        'notifications': state.notifications.map((notification:NotificationItem) =>
          notification._id === action.payload._id
            ? action.payload
            : notification)
      };

    case NotificationActionTypes.PUSH_NOTIFICATION:
      return {
        ...state,
        'notifications': [action.payload, ...state.notifications]
      };
    default:
      return state;
  }
};
