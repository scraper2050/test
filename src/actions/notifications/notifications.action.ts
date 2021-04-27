import { NotificationACtionTypes } from './notifications.types';
import { createApiAction } from 'actions/action.utils';


export const loadNotificationsActions = createApiAction(NotificationACtionTypes.LOAD_NOTIFICATIONS);
export const markNotificationAsRead = createApiAction(NotificationACtionTypes.UPDATE_NOTIFICATION);

