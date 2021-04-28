import BuildIcon from '@material-ui/icons/Build';
import { MenuItem } from '@material-ui/core';
import { NotificationItem } from '../bc-header-notification';
import React from 'react';
import { fromNow } from 'helpers/format';
import { modalTypes } from '../../../../constants';
import { useDispatch } from 'react-redux';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';


export default function ServiceTicketNotication(item :NotificationItem) {
  const { metadata, createdAt, readStatus, ...props } = item;
  const dispatch = useDispatch();


  const openDetailTicketModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Service Ticket Details',
        'removeFooter': false,
        'className': 'serviceTicketTitle',
        'maxHeight': '754px',
        'height': '100%',
        'ticketId': metadata._id,
        'notificationId': props._id
      },
      'type': modalTypes.VIEW_SERVICE_TICKET_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
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


