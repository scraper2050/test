import BuildIcon from '@material-ui/icons/Build';
import { MenuItem } from '@material-ui/core';
import { NotificationItem } from '../bc-header-notification';
import React from 'react';
import { fromNow } from 'helpers/format';
import { modalTypes } from '../../../../constants';
import { useDispatch } from 'react-redux';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';


export default function JobRequestNotication(item :NotificationItem) {
  const { metadata, createdAt, readStatus, ...props } = item;
  const dispatch = useDispatch();


  const openDetailJobRequestModal = () => {
    // dispatch(
    //   setModalDataAction({
    //     data: {
    //       jobRequest: jobRequest,
    //       removeFooter: false,
    //       maxHeight: '100%',
    //       modalTitle: 'Job Request',
    //     },
    //     type: modalTypes.VIEW_JOB_REQUEST_MODAL,
    //   })
    // );
    // setTimeout(() => {
    //   dispatch(openModalAction());
    // }, 200);
  };


  return <MenuItem
    className={readStatus.isRead
      ? ''
      : 'unread'}
    onClick={openDetailJobRequestModal}>

    <BuildIcon color={'primary'} />
    <div className={'ticket-info'}>
      {`${props.message.body.split(':')[0]} `}
      <strong>
        {`${props.message.body.split(':')[1]}`}
      </strong>
      <span>
        {fromNow(new Date(createdAt))}
      </span>
    </div>
  </MenuItem>;
}


