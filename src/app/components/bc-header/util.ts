import { NotificationItem } from './bc-header-notification';

export const computeUnreadNotifications = (notifications:NotificationItem[]) => {
  return notifications.reduce((acc, notif:NotificationItem) => notif.readStatus.isRead
    ? acc
    : acc + 1, 0);
};
