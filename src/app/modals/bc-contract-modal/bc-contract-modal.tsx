import { ReactComponent as AcceptedContract } from 'assets/img/contract-accepted.svg';
import { ReactComponent as RejectedContract } from 'assets/img/contract-rejected.svg';
import { ReactComponent as InvitationContract } from 'assets/img/contract-invitation.svg';
import { ReactComponent as CancelledContract } from 'assets/img/contract-cancelled.svg';
import { ReactComponent as FinishedContract } from 'assets/img/contract-finished.svg';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptOrRejectContractNotificationAction, dismissNotificationAction, markNotificationAsRead } from 'actions/notifications/notifications.action';
import { AcceptRejectContractProps } from 'api/vendor.api';
import { NotificationTypeTypes } from 'reducers/notifications.types';
import { RootState } from 'reducers';
import Alert from '@material-ui/lab/Alert/Alert';
import { closeModalAction } from 'actions/bc-modal/bc-modal.action';
import { cancelOrFinishContractActions } from 'actions/vendor/vendor.action';


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
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
    notificationId?: string;
    notificationType: any;
}

const statusToContract:any = {
  'reject': 'ContractRejected',
  'accept': 'ContractAccepted',
  'cancel': 'ContractCanceled',
  'finish': 'ContractFinished'
};

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


export default function BCContractViewModal({ message, notificationId, contractId, notificationType }:BCViewServiceTicketModalProps) {
  const [imageValue, setImageValue] = useState(notificationType);
  const [imageValueHolder, setImageValueHolder] = useState(notificationType);
  const { vendorError, vendorResponse, vendorLoading } = useSelector(({ vendors }:RootState) => ({ 'vendorError': vendors.error,
    'data': vendors.data,
    'vendorResponse': vendors.response,
    'vendorLoading': vendors.contractLoading }));
  const { error, loading, response } = useSelector(({ notifications }:RootState) => notifications.notificationObj);
  const dispatch = useDispatch();


  useEffect(() => {
    if (notificationId) {
      dispatch(markNotificationAsRead.fetch({ 'id': notificationId,
        'isRead': true }));
    }
  }, []);


  const handleClick = (status:string) => {
    setImageValueHolder(statusToContract[status]);
    if (!notificationId) {
      dispatch(cancelOrFinishContractActions.fetch({ contractId,
        'status': status }));
    } else {
      dispatch(acceptOrRejectContractNotificationAction.fetch({ contractId,
        notificationId,
        status
      }));
    }
  };
  const responseMessage = response || vendorResponse;

  useEffect(() => {
    if (response || vendorResponse) {
      setImageValue(imageValueHolder);
      setTimeout(() => {
        dispatch(cancelOrFinishContractActions.cancelled());
        if (notificationId) {
          dispatch(acceptOrRejectContractNotificationAction.cancelled());
          dispatch(dismissNotificationAction.fetch({ 'id': notificationId,
            'isDismissed': true }));
        }
        dispatch(closeModalAction());
      }, 1500);
    }
  }, [response, vendorResponse]);

  const errorMessage = error || vendorError;

  const isLoading = loading || vendorLoading;

  return <BCContractViewModalContainer>
    {errorMessage && <Alert
      elevation={6}
      severity={'error'}
      variant={'filled'}>
      <div className={'alert-text-container'}>
        {errorMessage}
      </div>
    </Alert>}
    {/* {responseMessage && <Alert
      elevation={6}
      severity={'success'}
      variant={'filled'}>
      <div className={'alert-text-container'}>
        {responseMessage}
      </div>
    </Alert>} */}
    <br />
    <div className={'header-container'}>
      { renderImage(imageValue) }
      <h2>
        {responseMessage || message.title}
      </h2>
      <p>
        {responseMessage
          ? message.body
          : ''}
      </p>
    </div>
    {/* <div className={'actions-container'} >
      {(notificationType === NotificationTypeTypes.CONTRACT_INVITATION || !notificationId) && !responseMessage && <>
        {notificationId && <Button
          color={'secondary'}
          disabled={isLoading}
          fullWidth
          onClick={() => handleClick(`reject`)}
          variant={'contained'}>
          {`Reject`}
        </Button>}
        <Button
          color={!notificationId
            ? 'secondary'
            : 'primary'}
          disabled={isLoading}
          fullWidth
          onClick={() => handleClick(`${!notificationId
            ? 'finish'
            : 'accept'}`)}
          variant={'contained'}>
          {`${!notificationId
            ? 'Remove'
            : 'Accept'}`}
        </Button>
      </>}
    </div> */}

  </BCContractViewModalContainer>;
}
