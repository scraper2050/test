import { ReactComponent as AcceptedContract } from '../../../../assets/img/contract-accepted.svg';

import { MenuItem } from '@material-ui/core';
import { NotificationItem } from '../bc-header-notification';
import { ReactComponent as PolicySVG } from '../../../../assets/img/policy.svg';
import React from 'react';
import { ReactComponent as RejectedContract } from '../../../../assets/img/contract-rejected.svg';
import { Status } from 'app/models/contract';
import { fromNow } from 'helpers/format';
import { modalTypes } from '../../../../constants';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';


interface ContractNotificationProps extends NotificationItem {
    status: Status
}


const renderImage = (status:string) => {
  const images:any = {
    'accepted': <AcceptedContract />,
    'cancelled': <PolicySVG />,
    'invitation': <PolicySVG />,
    'rejected': <RejectedContract />
  };
  return images[status];
};

export default function ContractNotification({ message, metadata, createdAt, status, readStatus, _id } :ContractNotificationProps) {
  const dispatch = useDispatch();
  console.log(_id);

  const openContractModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'removeFooter': false,
        'maxHeight': '450px',
        'height': '100%',
        'message': message,
        'contractId': metadata._id,
        'status': status,
        'notificationId': _id
      },
      'type': modalTypes.CONTRACT_VIEW_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const ContractMenuItem = styled(MenuItem)`
  svg {
      height: 2em;
      width: 2em;
  }`;

  return <ContractMenuItem
    className={readStatus.isRead
      ? ''
      : 'unread'}
    onClick={openContractModal}>

    { renderImage(status) }

    <div className={'ticket-info'}>
      {message.title}
      <br />
      <strong>
        {message.body}
      </strong>
      <span>
        {fromNow(new Date(createdAt))}
      </span>
    </div>
  </ContractMenuItem>;
}


