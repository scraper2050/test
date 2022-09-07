import React from 'react';
import BCCircularLoader from '../bc-circular-loader/bc-circular-loader';
import ContractNotification from './header-notifications/bc-header-contract-notification';
import ServiceTicketNotication from './header-notifications/bc-header-service-ticket-notification';
import JobRequestNotication from './header-notifications/bc-header-job-request-notification';
import NewChatJobRequestNotication from './header-notifications/bc-header-new-chat-job-request-notification';
import JobRescheduledNotication from './header-notifications/bc-header-job-rescheduled';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Button, MenuList } from '@material-ui/core';
import { SECONDARY_CARD_BLUE, SECONDARY_DARK_GREY, SECONDARY_GREY, PRIMARY_DARK } from '../../../constants';

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
  jobId: string;
  requestId: string;
  track: any[];
  status?: number;
};


export enum NotificationTypeTypes {
  CONTRACT_ACCEPTED = 'ContractAccepted',
  CONTRACT_CANCELLED = 'ContractCanceled',
  CONTRACT_FINISHED = 'ContractFinished',
  CONTRACT_INVITATION = 'ContractInvitation',
  CONTRACT_REJECTED = 'ContractRejected',
  SERVICE_TICKET_CREATED = 'ServiceTicketCreated',
  JOB_REQUEST_CREATED = 'JobRequestCreated',
  JOB_RESCHEDULED = 'JobRescheduled',
  NEW_CHAT = 'NewChat',
}

type Notification = {
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
  metadata: ServiceTicketNotification | any;
};

export type NotificationItem = Notification
export interface NotificationItemWithHandler extends Notification {
  openModalHandler: (type:any, data:any, itemId:any, metadata?:any) => void;
  jobRequests?: any;
}
interface HeaderNotification {
    items: NotificationItem[];
    close: () => void;
    loading: boolean;
    openModalHandler: (type:any, data:any, itemId:any) => void;
    jobRequests?:any;
}

function renderItem(item:NotificationItem, index:number, openModalHandler: NotificationItemWithHandler['openModalHandler'], jobRequests:any) {
  const notificationTypes:any = {
    [NotificationTypeTypes.CONTRACT_ACCEPTED]: <ContractNotification
      {...item}
      key={index}
      openModalHandler={openModalHandler}
    />,
    [NotificationTypeTypes.CONTRACT_CANCELLED]: <ContractNotification
      {...item}
      key={index}
      openModalHandler={openModalHandler}
    />,
    [NotificationTypeTypes.CONTRACT_INVITATION]: <ContractNotification
      {...item}
      key={index}
      openModalHandler={openModalHandler}
    />,
    [NotificationTypeTypes.CONTRACT_REJECTED]: <ContractNotification
      {...item}
      key={index}
      openModalHandler={openModalHandler}
    />,
    [NotificationTypeTypes.CONTRACT_FINISHED]: <ContractNotification
      {...item}
      key={index}
      openModalHandler={openModalHandler}
    />,
    [NotificationTypeTypes.SERVICE_TICKET_CREATED]: <ServiceTicketNotication
      {...item}
      key={index}
      openModalHandler={openModalHandler}
    />,
    [NotificationTypeTypes.JOB_REQUEST_CREATED]: <JobRequestNotication
      {...item}
      key={index}
      openModalHandler={openModalHandler}
      jobRequests={jobRequests}
    />,
    [NotificationTypeTypes.JOB_RESCHEDULED]: <JobRescheduledNotication
      {...item}
      key={index}
      openModalHandler={openModalHandler}
    />,
    [NotificationTypeTypes.NEW_CHAT]: <NewChatJobRequestNotication
      {...item}
      key={index}
      openModalHandler={openModalHandler}
      jobRequests={jobRequests}
    />

  };


  return notificationTypes[item.notificationType];
}

const HeaderNotificationContainer = styled(MenuList)`
    padding: 5px 8px;
    padding-bottom: 0;
    max-width: 300px;
    h3 {
      margin:0 0 16px 16px;
    }
    h4 {
      margin: 20px;
      color: ${SECONDARY_DARK_GREY};
      font-size: 2rem;
    }
.MuiListItem-root {
    border-radius: 6px;
    display: flex;
    white-space: pre-wrap;
    margin-bottom: 8px;
    opacity: 0.9;
    &.unread {
        background: #f5f5f5;
        opacity: 1;
    }
    &:hover {
        background: ${SECONDARY_GREY};
    }
    .ticket-info {
        span {
            font-weight: 800;
            display: block;
            font-size: 13px;
            color: ${SECONDARY_CARD_BLUE}
        }
        span.note {
          color: ${PRIMARY_DARK}
        }
    }

    .image-container {
        flex: 0 0 50px;
        height: 50px;
        border-radius: 50%;
        overflow:hidden;
        background: #fefefe;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .ticket-info{
        margin-left: 20px;
        width: calc(100% - 40px)
    }
}
`;

export default function HeaderNotifications({ items, close, loading, openModalHandler, jobRequests }: HeaderNotification) {
  const history = useHistory();
  return <HeaderNotificationContainer role={'menu'}>
    <h3>
      {'Notifications'}
    </h3>
    <Button
      fullWidth
      style={{marginBottom: 5}}
      onClick={() => {
        close();
        history.push('/main/notifications');
      }}>
      {'View More'}
    </Button>
    {loading && <BCCircularLoader />}

    {!items.length && <h4>
      {'No notifications'}
    </h4>}
    {items && items.filter((item:NotificationItem) => {
      if(item.notificationType === 'JobRescheduled' && item.metadata && item.metadata.status !== 4){
        return false;
      }
      return true;
    }).slice(0, 5).map((item:NotificationItem, index:number) => {
      return renderItem(item, index, openModalHandler, jobRequests);
    })}
  </HeaderNotificationContainer>;
}

