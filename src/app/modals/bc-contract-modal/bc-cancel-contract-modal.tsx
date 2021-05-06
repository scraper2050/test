import { ReactComponent as AcceptedContract } from 'assets/img/contract-accepted.svg';
import { ReactComponent as RejectedContract } from 'assets/img/contract-rejected.svg';
import { ReactComponent as InvitationContract } from 'assets/img/contract-invitation.svg';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptOrRejectContractNotificationAction, dismissNotificationAction, markNotificationAsRead } from 'actions/notifications/notifications.action';
import { AcceptRejectContractProps } from 'api/vendor.api';
import { NotificationTypeTypes } from 'reducers/notifications.types';
import { RootState } from 'reducers';
import Alert from '@material-ui/lab/Alert/Alert';
import { closeModalAction } from 'actions/bc-modal/bc-modal.action';


const BCContractViewModalContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px;
    h2 {
        text-transform: uppercase;
    }
   
     .header-container {
        text-align: center;
        svg {
        width: 120px;
        height: 120px;
    }
    }
    .MuiAlert-filledSuccess {
      color: #4caf50;
    }
    .actions-container {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        .MuiButton-containedPrimary {
            color: #fff
        }
        button:first-of-type {
            margin-right: 15px;
        }
    }
    `;


interface BCViewServiceTicketModalProps {
    contractId: string;
    message: {body: string; title: string};
    notificationId: string;
    notificationType: any;
}


const renderImage = (notificationType:string) => {
  const images:any = {
    [NotificationTypeTypes.CONTRACT_ACCEPTED]: <AcceptedContract />,
    [NotificationTypeTypes.CONTRACT_INVITATION]: <InvitationContract />,
    [NotificationTypeTypes.CONTRACT_CANCELLED]: <RejectedContract />,
    [NotificationTypeTypes.CONTRACT_REJECTED]: <RejectedContract />
  };
  return images[notificationType];
};


export default function BCContractViewModal({ message, notificationId, contractId, notificationType }:BCViewServiceTicketModalProps) {
  const { error, loading, response } = useSelector(({ notifications }:RootState) => notifications.notificationObj);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(acceptOrRejectContractNotificationAction.cancelled());
    dispatch(markNotificationAsRead.fetch({ 'id': notificationId,
      'isRead': true }));
  }, []);

  const handleClick = (status:string) => {
    dispatch(markNotificationAsRead.fetch({ 'id': notificationId,
      'isRead': true }));
    dispatch(acceptOrRejectContractNotificationAction.fetch({ contractId,
      notificationId,
      status
    }));
  };


  useEffect(() => {
    if (response) {
      dispatch(dismissNotificationAction.fetch({ 'id': notificationId,
        'isDismissed': true }));
      setTimeout(() => {
        dispatch(closeModalAction());
      }, 1500);
    }
  }, [response]);


  return <BCContractViewModalContainer>
    {error && <Alert
      elevation={6}
      severity={'error'}
      variant={'filled'}>
      <div className={'alert-text-container'}>
        {error}
      </div>
    </Alert>}
    {response && <Alert
      elevation={6}
      severity={'success'}
      variant={'filled'}>
      <div className={'alert-text-container'}>
        {response}
      </div>
    </Alert>}
    <br />
    <div className={'header-container'}>
      { renderImage(notificationType) }
      <h2>
        {message.title}
      </h2>
      <p>
        {message.body}
      </p>
    </div>
    <div className={'actions-container'} >
      {notificationType === NotificationTypeTypes.CONTRACT_INVITATION && <>
        <Button
          color={'secondary'}
          disabled={loading}
          fullWidth
          onClick={() => handleClick('reject')}
          variant={'contained'}>
          {'Reject'}
        </Button>
        <Button
          color={'primary'}
          disabled={loading}
          fullWidth
          onClick={() => handleClick('accept')}
          variant={'contained'}>
          {'Accept'}
        </Button>
      </>}
    </div>

  </BCContractViewModalContainer>;
}
