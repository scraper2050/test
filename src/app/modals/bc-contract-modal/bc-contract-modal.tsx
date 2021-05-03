import { ReactComponent as AcceptedContract } from 'assets/img/contract-accepted.svg';
import { ReactComponent as RejectedContract } from 'assets/img/contract-rejected.svg';
import { ReactComponent as PolicySVG } from 'assets/img/policy.svg';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import { PRIMARY_GREEN } from '../../../constants';
import { closeModalAction } from 'actions/bc-modal/bc-modal.action';
import styled from 'styled-components';
import { Button, Fab, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptOrRejectContractNotificationAction, markNotificationAsRead } from 'actions/notifications/notifications.action';
import { Status } from 'app/models/contract';
import { AcceptRejectContractProps } from 'api/vendor.api';
import { NotificationState } from 'reducers/notifications.types';
import { RootState } from 'reducers';
import Alert from '@material-ui/lab/Alert/Alert';


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
    status: Status;
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


export default function BCContractViewModal({ message, notificationId, contractId, status }:BCViewServiceTicketModalProps) {
  const { error, loading, response } = useSelector(({ notifications }:RootState) => notifications.notificationObj);
  const dispatch = useDispatch();

  const acceptOrCancel = ({ status, contractId }: AcceptRejectContractProps) => {
    dispatch(acceptOrRejectContractNotificationAction.fetch({ contractId,
      status
    }));
  };


  const handleClick = (status:string) => {
    acceptOrCancel({ contractId,
      status
    });
  };


  return <BCContractViewModalContainer>
    {error && <Alert
      elevation={6}
      severity={'error'}
      variant={'filled'}>
      <div className={'alert-text-container'}>
        {'This is an error message'}
      </div>
    </Alert>}
    <br />
    <div className={'header-container'}>

      { renderImage(status) }
      <h2>
        {message.title}
      </h2>
      <p>
        {message.body}
      </p>
    </div>
    <div className={'actions-container'} >

      {status === 'invitation' && <>
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
