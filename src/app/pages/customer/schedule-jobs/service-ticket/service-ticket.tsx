import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import Fab from '@material-ui/core/Fab';
import InfoIcon from '@material-ui/icons/Info';
import { getAllServiceTicketAPI } from 'api/service-tickets.api';
import { modalTypes } from '../../../../../constants';
import moment from 'moment';
import styled from 'styled-components';
import styles from '../../customer.styles';
import { withStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch, useSelector } from 'react-redux';

function ServiceTicket({ classes }: any) {
  const dispatch = useDispatch();
  const { isLoading = true, tickets, refresh = true } = useSelector(({ serviceTicket }: any) => ({
    'isLoading': serviceTicket.isLoading,
    'refresh': serviceTicket.refresh,
    'tickets': serviceTicket.tickets.map((o: any) => {
      o.createdAt = moment(o.createdAt).format('MMM DD, YYYY');
      return o;
    })
  }));
  const openEditTicketModal = (ticket: any) => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Edit Ticket',
        'removeFooter': false,
        'ticketData': ticket
      },
      'type': modalTypes.EDIT_TICKET_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };
  const openCreateJobModal = (ticket: any) => {
    dispatch(setModalDataAction({
      'data': {
        'job': {
          'customer': {
            '_id': ''
          },
          'description': '',
          'employeeType': false,
          'equipment': {
            '_id': ''
          },
          'scheduleDate': new Date(),
          'scheduledEndTime': new Date(),
          'scheduledStartTime': new Date(),
          'technician': {
            '_id': ''
          },
          'ticket': {
            '_id': ticket._id
          },
          'type': {
            '_id': ''
          }
        },
        'modalTitle': 'Create Job',
        'removeFooter': false
      },
      'type': modalTypes.EDIT_JOB_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };
  const columns: any = [
    {
      'Header': 'Ticket ID',
      'accessor': 'ticketId',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Created At',
      'accessor': 'createdAt',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Customer',
      'accessor': 'customer.profile.displayName',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          {
            !row.original.jobCreated
              ? row.original.status !== 2
                ? <Fab
                  aria-label={'create-job'}
                  classes={{
                    'root': classes.fabRoot
                  }}
                  color={'primary'}
                  onClick={() => openCreateJobModal(row.original)}
                  variant={'extended'}>
                  {'Create Job'}
                </Fab>
                : null
              : null
          }
        </div>;
      },
      'Header': 'Create Job',
      'id': 'action-create-job',
      'sortable': false,
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return row.original && row.original.status === 0
          ? <div className={'flex items-center'}>
            <Fab
              aria-label={'edit-ticket'}
              classes={{
                'root': classes.fabRoot
              }}
              color={'primary'}
              onClick={() => openEditTicketModal(row.original)}
              variant={'extended'}>
              {'Edit Ticket'}
            </Fab>
          </div>
          : '-';
      },
      'Header': 'Edit Ticket',
      'id': 'action-edit-ticket',
      'sortable': false,
      'width': 60
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          <InfoIcon />
        </div>;
      },
      'Header': 'Ticket Details',
      'id': 'action-detail',
      'sortable': false,
      'width': 60
    }
  ];

  useEffect(() => {
    if (refresh) {
      dispatch(getAllServiceTicketAPI());
    }
  }, [refresh]);

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  return (

    <DataContainer
      id={'0'}>
      <BCTableContainer
        columns={columns}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        search
        searchPlaceholder={'Search Tickets...'}
        tableData={tickets}
      />
    </DataContainer>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(ServiceTicket);
