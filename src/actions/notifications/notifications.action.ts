import { createAction } from 'redux-actions';
import { NotificationActionTypes } from './notifications.types';
import { NotificationItem } from 'app/components/bc-header/bc-header-notification';
import { createApiAction } from 'actions/action.utils';


export const loadNotificationsActions = createApiAction(NotificationActionTypes.LOAD_NOTIFICATIONS);
export const markNotificationAsRead = createApiAction(NotificationActionTypes.UPDATE_NOTIFICATION);
export const dismissNotificationAction = createApiAction(NotificationActionTypes.DISMISS_NOTIFICATION);
export const acceptOrRejectContractNotificationAction = createApiAction(NotificationActionTypes.ACCEPT_REJECT_CONTRACT_NOTIFICATION);
export const showNotificationPopup = createAction(NotificationActionTypes.SHOW_NOTIFICATION_POPUP);

export const pushNotification = (payload: NotificationItem[]) => {
  return {
    payload,
    'type': NotificationActionTypes.PUSH_NOTIFICATION
  };
};
