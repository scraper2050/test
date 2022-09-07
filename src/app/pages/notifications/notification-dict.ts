import { Dispatch } from 'redux';
import { Notification, NotificationTypeTypes } from 'reducers/notifications.types';
import { openContractModal, openDetailJobModal, openDetailTicketModal, openJobRequestModal, openJobRequestModalFromChat } from './notification-click-handlers';


export const getNotificationValues = (notificationType: string, notification:Notification) => {
  const notificationTypes:any = {
    [NotificationTypeTypes.SERVICE_TICKET_CREATED]: {
      'details': notification.metadata?.ticketId,
      'typeText': 'Service Ticket'
    },
    [NotificationTypeTypes.JOB_REQUEST_CREATED]: {
      'details': notification.metadata?.requestId,
      'typeText': 'Job Request'
    },
    [NotificationTypeTypes.JOB_RESCHEDULED]: {
      'details': notification.metadata?.jobId,
      'typeText': 'Job Rescheduled'
    },
    [NotificationTypeTypes.CONTRACT_ACCEPTED]: {
      'details': notification.message?.body,
      'typeText': 'Contract Accepted'
    },
    [NotificationTypeTypes.CONTRACT_INVITATION]: {
      'details': notification.message?.body,
      'typeText': 'Contract Invitation'
    },
    [NotificationTypeTypes.CONTRACT_REJECTED]: {
      'details': notification.message?.body,
      'typeText': 'Contract Rejected'
    },
    [NotificationTypeTypes.CONTRACT_CANCELLED]: {
      'details': notification.message?.body,
      'typeText': 'Contract Cancelled'
    },
    [NotificationTypeTypes.CONTRACT_FINISHED]: {
      'details': notification.message?.body,
      'typeText': 'Contract Finished,'
    },
    [NotificationTypeTypes.NEW_CHAT]: {
      'details': notification.message?.title,
      'typeText': 'New Job Request Comment'
    },
  };
  
  return notificationTypes[notificationType] || '';
};

export const getNotificationMethods = (dispatch:Dispatch, notificationType: string, notification:Notification) => {
  const notificationTypes:any = {
    [NotificationTypeTypes.SERVICE_TICKET_CREATED]: () => openDetailJobModal(dispatch, notification),
    [NotificationTypeTypes.JOB_REQUEST_CREATED]: () => openJobRequestModal(dispatch, notification),
    [NotificationTypeTypes.NEW_CHAT]: () => openJobRequestModalFromChat(dispatch, notification),
    [NotificationTypeTypes.JOB_RESCHEDULED]: () => openDetailTicketModal(dispatch, notification),
    [NotificationTypeTypes.CONTRACT_ACCEPTED]: () => openContractModal(dispatch, notification),
    [NotificationTypeTypes.CONTRACT_INVITATION]: () => openContractModal(dispatch, notification),
    [NotificationTypeTypes.CONTRACT_REJECTED]: () => openContractModal(dispatch, notification),
    [NotificationTypeTypes.CONTRACT_CANCELLED]: () => openContractModal(dispatch, notification),
    [NotificationTypeTypes.CONTRACT_FINISHED]: () => openContractModal(dispatch, notification)
  };

  return notificationTypes[notificationType] || (() => null);
};

