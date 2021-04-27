import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import { PRIMARY_GREEN } from '../../../constants';
import { RootState } from 'reducers';
import { closeModalAction } from 'actions/bc-modal/bc-modal.action';
import { formatDatTimelll } from 'helpers/format';
import { getServiceTicketDetailAction } from 'actions/service-ticket/service-ticket.action';
import styled from 'styled-components';
import { Fab, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markNotificationAsRead } from 'actions/notifications/notifications.action';


const BCViewServiceTicketModalContainer = styled.div`
    padding: 50px;
    h6 {
        font-size: 1.2rem;
        color: #707070;
    }
    p {
        font-weight: 800;
        font-size: 1.2rem;
    }
    .detail {
        margin-bottom: 27px;
    }

    .image-container {
        max-height: 200px;
        overflow: hidden;
    }
    .MuiTableCell-body {
        white-space: pre-wrap;
    }

    .actions{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        button {
            width: 200px;
            color: white;
            background: ${PRIMARY_GREEN}
        }
    }
    `;


interface BCViewServiceTicketModalProps {
    ticketId: string;
    notificationId: string;
}

const columns: any = [
  {
    'Cell'({ row }: any) {
      return (
        <div>
          {row.original.user?.profile?.displayName || 'N/A'}
        </div>
      );
    },
    'Header': 'User',
    'id': 'user',
    'sortable': true,

    'width': 70
  },
  { 'Cell'({ row }: any) {
    return (
      <div>
        <i>
          {`${formatDatTimelll(row.original.date)}`}
        </i>
      </div>
    );
  },
  'Header': 'Date',
  'id': 'date',
  'sortable': true,

  'width': 80
  },
  { 'Cell'({ row }: any) {
    const splittedActions = row.original.action.split('|');
    const actions = splittedActions.filter((action: any) => action !== '');
    return actions.length === 0
      ? <div />
      : <ul>
        {actions.map((action: any, index: number) => <li key={index}>
          {action}
        </li>)}
      </ul>;
  },
  'Header': 'Actions',
  'id': 'action',
  'sortable': true

  }
];

export default function BCViewServiceTicketModal({ ticketId, notificationId }:BCViewServiceTicketModalProps) {
  const { loadingObj, openTicketObj, error } = useSelector(({ serviceTicket }:RootState) => serviceTicket);
  const dispatch = useDispatch();


  useEffect(() => {
    if (openTicketObj._id !== ticketId) {
      dispatch(getServiceTicketDetailAction(ticketId));
    }
  }, []);

  useEffect(() => {
    if (!loadingObj) {
      dispatch(markNotificationAsRead.fetch(notificationId));
    }
  }, [openTicketObj]);

  if (loadingObj || !openTicketObj.track) {
    return <BCCircularLoader />;
  }

  const {
    image, jobLocation, jobSite, jobType, contactName, note, dueDate, customer, customerPo
  } = openTicketObj;


  return <BCViewServiceTicketModalContainer>
    <Grid
      container
      spacing={4}>
      <Grid
        item
        xs={3}>
        <div className={'detail'}>
          <Typography variant={'h6'}>
            {'Customer'}
          </Typography>
          <Typography>
            {customer?.profile?.displayName || 'N/A'}
          </Typography>
        </div>
        <div className={'detail'}>
          <Typography variant={'h6'}>
            {'Job Location'}
          </Typography>
          <Typography>
            {jobLocation || 'N/A'}
          </Typography>
        </div>
        <div className={'detail'}>
          <Typography variant={'h6'}>
            {'Job Site'}
          </Typography>
          <Typography>
            {jobSite || 'N/A'}
          </Typography>
        </div>
        <div className={'detail'}>
          <Typography variant={'h6'}>
            {'Job Type'}
          </Typography>
          <Typography>
            {jobType || 'N/A'}
          </Typography>
        </div>
        <div className={'detail'}>
          <Typography variant={'h6'}>
            {'Notes/Special Instructions'}
          </Typography>
          <Typography>
            {note || 'N/A'}
          </Typography>
        </div>
        <div className={'detail'}>
          <Typography variant={'h6'}>
            {'Due Date'}
          </Typography>
          <Typography>
            {dueDate
              ? formatDatTimelll(dueDate)
              : 'N/A'}
          </Typography>
        </div>
      </Grid>
      <Grid
        item
        xs={3}>
        <div className={'detail'}>
          <Typography variant={'h6'}>
            {'Contact Associated'}
          </Typography>
          <Typography>
            {contactName || 'N/A'}
          </Typography>
        </div>
        <div className={'detail'}>
          <Typography variant={'h6'}>
            {'Customer PO'}
          </Typography>
          <Typography>
            {customerPo || 'N/A'}
          </Typography>
        </div>
        <div className={'detail'}>
          <Typography variant={'h6'}>
            {'Attached image'}
          </Typography>
          <div className={'image-container'}>
            <a
              href={image}
              rel={'noopener noreferrer'}
              target={'_blank'}>
              <img
                alt={jobType}
                src={image}
              />
            </a>
          </div>
        </div>
      </Grid>
      <Grid
        item
        xs={6}>
        <div className={'detail'}>
          <Typography variant={'h6'}>
            {'Ticket History'}
          </Typography>
          <BCTableContainer
            columns={columns}
            initialMsg={'No history yet'}
            isDefault
            isLoading={false}
            onRowClick={() => { }}
            pageSize={openTicketObj.track.length}
            pagination={false}
            stickyHeader
            tableData={openTicketObj.track}
          />
        </div>
      </Grid>
    </Grid>
    <div className={'actions'}>
      <Fab
        aria-label={'create-job'}
        color={'primary'}
        onClick={
          () => dispatch(closeModalAction())
        }
        type={'submit'}
        variant={'extended'}>
        {'Close'}
      </Fab>
    </div>

  </BCViewServiceTicketModalContainer>;
}
