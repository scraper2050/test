import { NotificationState } from './notifications.types';
import { Reducer } from 'redux';
import { loadNotificationsActions, markNotificationAsRead } from 'actions/notifications/notifications.action';
import { NotificationItem } from 'app/components/bc-header/bc-header-notification';

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


      return {
        ...state,
        'notifications': state.notifications.map((notification:NotificationItem) =>
          notification._id === action.payload._id
            ? action.payload
            : notification)
      };

    default:
      return state;
  }
};
