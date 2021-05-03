import { NotificationItem } from 'app/components/bc-header/bc-header-notification';

type ServiceTicketNotification = {
  _id: string;
  scheduleDate: string;
  createdAt: string;
  technician: string;
  image: string;
  customer: string;
  customerPO: string;
  customerContactId: string;
  note: string;
  comment: string;
  createdBy: string;
  company: string;
  ticketId: string;
};

export type Notification = {
  _id: string;
  company: string;
  notificationType: string;
  message: {
    title: string;
    body: string;
  };
  readStatus: {
    isRead: true;
    readBy: {
      _id: string;
      auth: {
        email: string;
        password: string;
      };
      profile: {
        firstName: string;
        lastName: string;
        displayName: string;
      };
      address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
      };
      contact: {
        phone: string;
      };
      permissions: {
        role: 0;
      };
      info: {
        companyName: string;
        logoUrl: string;
        industry: string;
      };
      company: string;
    };
    readAt: string;
  };
  dismissedStatus: {
    isDismissed: true;
    dismissedBy: {
      _id: string;
      auth: {
        email: string;
        password: string;
      };
      profile: {
        firstName: string;
        lastName: string;
        displayName: string;
      };
      address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
      };
      contact: {
        phone: string;
      };
      permissions: {
        role: number;
    };
      info: {
        companyName: string;
        logoUrl: string;
        industry: string;
      };
      company: string;
    };
    dismissedAt: string;
  };
  createdAt: string;
  metadata: ServiceTicketNotification;
};

export interface NotificationState {
  error: string;
  notifications: Notification[];
  loading: boolean;
  notificationObj: {
    loading: boolean;
    error: string;
    response: string;
  }
}
