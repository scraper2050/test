import React from 'react';
import BuildIcon from '@material-ui/icons/Build';
import { MenuItem } from '@material-ui/core';
import { NotificationItemWithHandler } from '../bc-header-notification';
import { fromNow } from 'helpers/format';


export default function ServiceTicketNotication(item :NotificationItemWithHandler) {
  const { metadata, createdAt, readStatus, openModalHandler, ...props } = item;

  const openDetailTicketModal = () => {
    openModalHandler('ServiceTicketCreated', props, item?._id, metadata)
  };


  return <MenuItem
    className={readStatus.isRead
      ? ''
      : 'unread'}
    onClick={openDetailTicketModal}>

    <BuildIcon color={'primary'} />
    <div className={'ticket-info'}>
      {'Service Ticket created from website - '}
      <strong>
        {metadata.ticketId}
      </strong>
      <span>
        {fromNow(new Date(createdAt))}
      </span>
    </div>
  </MenuItem>;
}


