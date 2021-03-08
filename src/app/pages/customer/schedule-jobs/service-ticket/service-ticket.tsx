import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import Fab from '@material-ui/core/Fab';
import InfoIcon from '@material-ui/icons/Info';
import { getAllServiceTicketAPI } from 'api/service-tickets.api';
import { modalTypes } from '../../../../../constants';
import { formatDate } from 'helpers/format';
import styled from 'styled-components';
import styles from '../../customer.styles';
import { withStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { getCustomers } from 'actions/customer/customer.action';
import { useDispatch, useSelector } from 'react-redux';
import { clearJobSiteStore, getJobSites, loadingJobSites } from 'actions/job-site/job-site.action';
import { getAllJobTypesAPI } from 'api/job.api';
import { getJobLocationsAction, loadingJobLocations } from 'actions/job-location/job-location.action';
import "../../../../../scss/popup.scss";

function ServiceTicket({ classes }: any) {
  const dispatch = useDispatch();
  const { isLoading = true, tickets, refresh = true } = useSelector(({ serviceTicket }: any) => ({
    'isLoading': serviceTicket.isLoading,
    'refresh': serviceTicket.refresh,
    'tickets': serviceTicket.tickets
  }));



  const openEditTicketModal = (ticket: any) => {
    const reqObj = {
      customerId: ticket.customer._id,
      locationId: ticket.jobLocation
    }
    dispatch(loadingJobLocations());
    dispatch(getJobLocationsAction(reqObj.customerId));
    if (reqObj.locationId !== undefined && reqObj.locationId !== null) {
      dispatch(loadingJobSites());
      dispatch(getJobSites(reqObj));
    } else {
      dispatch(clearJobSiteStore());
    }
    dispatch(getAllJobTypesAPI());
    ticket.updateFlag = true;
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Edit Service Ticket',
        'removeFooter': false,
        'ticketData': ticket,
        'className': 'serviceTicketTitle',
        'maxHeight': '754px',
        'height': '100%'
      },
      'type': modalTypes.EDIT_TICKET_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const openDetailTicketModal = (ticket: any) => {

    const reqObj = {
      customerId: ticket.customer._id,
      locationId: ticket.jobLocation
    }
    dispatch(loadingJobLocations());
    dispatch(getJobLocationsAction(reqObj.customerId));
    if (reqObj.locationId !== undefined && reqObj.locationId !== null) {
      dispatch(loadingJobSites());
      dispatch(getJobSites(reqObj));
    } else {
      dispatch(clearJobSiteStore());
    }
    dispatch(getAllJobTypesAPI());
    ticket.updateFlag = true;
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Service Ticket Details',
        'removeFooter': false,
        'ticketData': ticket,
        'className': 'serviceTicketTitle',
        'maxHeight': '754px',
        'height': '100%',
        'detail': true,

      },
      'type': modalTypes.EDIT_TICKET_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };


  const openCreateJobModal = (ticket: any) => {
    const reqObj = {
      customerId: ticket.customer._id,
      locationId: ticket.jobLocation
    }
    dispatch(loadingJobLocations());
    dispatch(getJobLocationsAction(reqObj.customerId));
    if (reqObj.locationId !== undefined && reqObj.locationId !== null) {
      dispatch(loadingJobSites());
      dispatch(getJobSites(reqObj));
    } else {
      dispatch(clearJobSiteStore());
    }
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
          'scheduleDate': null,
          'scheduledEndTime': null,
          'scheduledStartTime': null,
          'technician': {
            '_id': ''
          },
          ticket,
          'type': {
            '_id': ''
          }
        },
        'modalTitle': 'Create Job',
        'removeFooter': false,

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
      'sortable': true,
      'Cell'({ row }: any) {
        let formattedDate = formatDate(row.original.createAt);
        return (
          <div>
            {formattedDate}
          </div>
        )
      }
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
        return row.original && row.original.status !== 1
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
        return <div
          onClick={() => openDetailTicketModal(row.original)}
          className={'flex items-center'}>
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
  margin-top: 10px;
  overflow: hidden;
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(ServiceTicket);
