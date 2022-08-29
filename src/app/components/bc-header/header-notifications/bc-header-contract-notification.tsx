import React from 'react';
import { ReactComponent as AcceptedContract } from 'assets/img/contract-accepted.svg';
import { ReactComponent as RejectedContract } from 'assets/img/contract-rejected.svg';
import { ReactComponent as InvitationContract } from 'assets/img/contract-invitation.svg';
import { ReactComponent as CancelledContract } from 'assets/img/contract-cancelled.svg';
import { ReactComponent as FinishedContract } from 'assets/img/contract-finished.svg';

import { MenuItem } from '@material-ui/core';
import { NotificationItemWithHandler, NotificationTypeTypes } from '../bc-header-notification';
import { fromNow } from 'helpers/format';
import styled from 'styled-components';


const renderImage = (notificationType:string) => {
  const images:any = {
    [NotificationTypeTypes.CONTRACT_ACCEPTED]: <AcceptedContract />,
    [NotificationTypeTypes.CONTRACT_INVITATION]: <InvitationContract />,
    [NotificationTypeTypes.CONTRACT_CANCELLED]: <CancelledContract />,
    [NotificationTypeTypes.CONTRACT_REJECTED]: <RejectedContract />,
    [NotificationTypeTypes.CONTRACT_FINISHED]: <FinishedContract />
  };
  return images[notificationType];
};

export default function ContractNotification({ message, metadata, createdAt, readStatus, _id, notificationType, openModalHandler } :NotificationItemWithHandler) {
  const openContractModal = () => {
    openModalHandler('ContractNotification', {message, notificationType}, _id, metadata)
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

    { renderImage(notificationType) }

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


