import BCCircularLoader from '../bc-circular-loader/bc-circular-loader';
import ContractNotification from './header-notifications/bc-header-contract-notification';
import { Notification, NotificationTypeTypes } from 'reducers/notifications.types';
import React from 'react';
import ServiceTicketNotication from './header-notifications/bc-header-service-ticket-notification';
import JobRequestNotication from './header-notifications/bc-header-job-request-notification';
import JobRescheduledNotication from './header-notifications/bc-header-job-rescheduled';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Button, MenuList } from '@material-ui/core';
import { SECONDARY_CARD_BLUE, SECONDARY_DARK_GREY, SECONDARY_GREY, PRIMARY_DARK } from '../../../constants';


export type NotificationItem = Notification

interface HeaderNotification {
    items: NotificationItem[];
    close: () => void;
    loading: boolean
}

function renderItem(item:NotificationItem, index:number) {
  const notificationTypes:any = {
    [NotificationTypeTypes.CONTRACT_ACCEPTED]: <ContractNotification
      {...item}
      key={index}
    />,
    [NotificationTypeTypes.CONTRACT_CANCELLED]: <ContractNotification
      {...item}
      key={index}
    />,
    [NotificationTypeTypes.CONTRACT_INVITATION]: <ContractNotification
      {...item}
      key={index}
    />,
    [NotificationTypeTypes.CONTRACT_REJECTED]: <ContractNotification
      {...item}
      key={index}
    />,
    [NotificationTypeTypes.CONTRACT_FINISHED]: <ContractNotification
      {...item}
      key={index}
    />,
    [NotificationTypeTypes.SERVICE_TICKET_CREATED]: <ServiceTicketNotication
      {...item}
      key={index}
    />,
    [NotificationTypeTypes.JOB_REQUEST_CREATED]: <JobRequestNotication
      {...item}
      key={index}
    />,
    [NotificationTypeTypes.JOB_RESCHEDULED]: <JobRescheduledNotication
      {...item}
      key={index}
    />

  };


  return notificationTypes[item.notificationType];
}

const HeaderNotificationContainer = styled(MenuList)`
    padding: 5px 8px;
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

export default function HeaderNotifications({ items, close, loading }: HeaderNotification) {
  const history = useHistory();
  return <HeaderNotificationContainer role={'menu'}>
    <h3>
      {'Notifications'}
    </h3>
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
      return renderItem(item, index);
    })}
    <Button
      fullWidth
      onClick={() => {
        close();
        history.push('/main/notifications');
      }}>
      {'View More'}
    </Button>
  </HeaderNotificationContainer>;
}

