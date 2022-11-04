import BCTableContainer from '../../../../components/bc-table-container/bc-table-container';
import InfoIcon from '@material-ui/icons/Info';
import {
  getAllServiceTicketAPI,
  getServiceTicketDetail
} from 'api/service-tickets.api';
import { modalTypes } from '../../../../../constants';
import { formatDate } from 'helpers/format';
import styled from 'styled-components';
import styles from '../../customer.styles';
import {Checkbox, FormControlLabel, withStyles} from "@material-ui/core";
import React, {useEffect, useState} from 'react';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch, useSelector } from 'react-redux';
import { clearJobSiteStore, getJobSites, loadingJobSites } from 'actions/job-site/job-site.action';
import { getAllJobTypesAPI } from 'api/job.api';
import "../../../../../scss/popup.scss";
import EditIcon from '@material-ui/icons/Edit';
import {
  CSButtonSmall,
  CSIconButton,
  useCustomStyles
} from "../../../../../helpers/custom";
import {error} from "../../../../../actions/snackbar/snackbar.action";
import BCDateRangePicker, {Range}
  from "../../../../components/bc-date-range-picker/bc-date-range-picker";
import moment from "moment";

function ServiceTicket({ classes }: any) {
  // console.log({classes})
  const dispatch = useDispatch();
  const [showAllTickets, toggleShowAllTickets] = useState(false);
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);
  const customStyles = useCustomStyles();
  const { isLoading = true, tickets, refresh = true } = useSelector(({ serviceTicket }: any) => ({
    'isLoading': serviceTicket.isLoading,
    'refresh': serviceTicket.refresh,
    'tickets': serviceTicket.tickets
  }));
  const filteredTickets = tickets.filter((ticket: any) => {
    let cond = true

    if (!showAllTickets) cond = cond && ticket.status !== 2 && !ticket.jobCreated;
    if (selectionRange) {
      const offset = moment.parseZone().utcOffset();
      const parsedDate = moment(ticket.dueDate).subtract(offset, 'minutes').add(1, 'hours').hour(0).toDate();
      cond = cond &&
        moment(parsedDate).isBetween(selectionRange.startDate, selectionRange.endDate, 'day', '[]');
    }
    return cond;
  })

  const openEditTicketModal = (ticket: any) => {
    const reqObj = {
      customerId: ticket.customer?._id,
      locationId: ticket.jobLocation
    }
    //dispatch(loadingJobLocations());
    //dispatch(getJobLocationsAction({customerId: reqObj.customerId}));
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
      },
      'type': modalTypes.EDIT_TICKET_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  function Toolbar() {
    return <>
      <FormControlLabel
        classes={{root: classes.noMarginRight}}
        control={
          <Checkbox
            checked={showAllTickets}
            onChange={() => toggleShowAllTickets(!showAllTickets)}
            name="checkedB"
            color="primary"
          />
        }
        label="Display All Tickets"
      />
      <BCDateRangePicker
        range={selectionRange}
        onChange={setSelectionRange}
        showClearButton={true}
        title={'Filter by Due Date...'}
      />
    </>
  }

  const openDetailTicketModal = async (ticket: any) => {
    const {serviceTicket, status, message} = await getServiceTicketDetail(ticket._id);
    if (status === 1) {
      dispatch(setModalDataAction({
        'data': {
          'modalTitle': 'Service Ticket Details',
          'removeFooter': false,
          'job': serviceTicket,
          'className': 'serviceTicketTitle',
        },
        'type': modalTypes.VIEW_SERVICE_TICKET_MODAL
      }));
      setTimeout(() => {
        dispatch(openModalAction());
      }, 200);
    } else {
      dispatch(error(message));
    }
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
      'Header': 'Due Date',
      'accessor': 'dueDate',
      'className': 'font-bold',
      'sortable': true,
      'Cell'({ row }: any) {
        let formattedDate = row.original.dueDate ? formatDate(row.original.dueDate) : '-';
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
          <CSIconButton
            //variant="contained"
            color="primary"
            size="small"
            onClick={() => openDetailTicketModal(row.original)}
          >
            <InfoIcon className={customStyles.iconBtn}/>
          </CSIconButton>
          {row.original && row.original.status !== 1
            ? <CSIconButton
            //variant="contained"
            color="primary"
            size="small"
            aria-label={'edit-ticket'}
            onClick={(e) => {
              e.stopPropagation();
              openEditTicketModal(row.original);
            }}
          >
            <EditIcon className={customStyles.iconBtn}/>
          </CSIconButton>
            : null
          }
          {
            !row.original.jobCreated && row.original.status !== 2 && row.original.customer?._id
              ? <CSButtonSmall
                variant="outlined"
                color="primary"
                size="small"
                aria-label={'edit-ticket'}
                onClick={() => openCreateJobModal(row.original)}
              >
                Create Job
              </CSButtonSmall>
              : null
          }
        </div>;
      },
      'Header': 'Actions',
      'id': 'action-create-job',
      'sortable': false,
      'width': 60
    },
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
        tableData={filteredTickets}
        toolbarPositionLeft={true}
        toolbar={Toolbar()}
      />
    </DataContainer>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(ServiceTicket);
