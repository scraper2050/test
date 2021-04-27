
import { Notification } from 'reducers/notifications.types';
import React, { Fragment } from 'react';
import ServiceTicketNotication from './header-notifications/bc-header-service-ticket-notification';
import { Button, MenuList } from '@material-ui/core';
import styled from 'styled-components';
import { SECONDARY_CARD_BLUE, SECONDARY_GREY } from '../../../constants';
import { useHistory } from 'react-router-dom';


export type NotificationItem = Notification

interface HeaderNotification {
    items: NotificationItem[];
    close: () => void;
}

function renderItem(item:NotificationItem, index:number) {
  const notificationTypes:any = {
    'CreateServiceTicket': <ServiceTicketNotication
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

export default function HeaderNotifications({ items, close }: HeaderNotification) {
  const history = useHistory();
  return <HeaderNotificationContainer role={'menu'}>
    <h3>
      {'Notifications'}
    </h3>
    {items && items.slice(0, 5).map((item:NotificationItem, index:number) => {
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

