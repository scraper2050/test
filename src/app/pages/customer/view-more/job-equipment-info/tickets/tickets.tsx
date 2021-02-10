import BCBackButtonNoLink from '../../../../../components/bc-back-button/bc-back-button-no-link';
import BCTableContainer from '../../../../../components/bc-table-container/bc-table-container';
import Fab from '@material-ui/core/Fab';
import InfoIcon from '@material-ui/icons/Info';
import BCTabs from '../../../../../components/bc-tab/bc-tab';
import { formatDate } from 'helpers/format';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import styles from '../job-equipment-info.style';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { modalTypes } from '../../../../../../constants';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { getAllJobTypesAPI } from 'api/job.api';
import { getAllServiceTicketAPI } from 'api/service-tickets.api';
import { clearJobSiteStore, getJobSites, loadingJobSites } from 'actions/job-site/job-site.action';
import { getJobLocationsAction, loadingJobLocations } from 'actions/job-location/job-location.action';
import { getCustomerDetailAction, loadingSingleCustomers } from 'actions/customer/customer.action';

interface LocationStateTypes {
  customerName: string;
  customerId: string;
}

function CustomersJobEquipmentInfoTicketsPage({ classes }: any) {
  const dispatch = useDispatch();
  const { isLoading = true, tickets, refresh = true } = useSelector(({ serviceTicket }: any) => ({
    'isLoading': serviceTicket.isLoading,
    'refresh': serviceTicket.refresh,
    'tickets': serviceTicket.tickets.map((o: any) => {
      o.createdAt = formatDate(o.createdAt);
      return o;
    })
  }));
  const { customerObj } = useSelector((state: any) => state.customers);

  const location = useLocation<LocationStateTypes>();

  const history = useHistory();
  const [curTab, setCurTab] = useState(0);
  const [filteredTickets, setFilteredTickets] = useState<any>([]);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const renderGoBack = (location: any) => {
    const baseObj = location;
    let customerName =
      baseObj["customerName"] && baseObj["customerName"] !== undefined
        ? baseObj["customerName"]
        : "N/A";
    let customerId =
      baseObj["customerId"] && baseObj["customerId"] !== undefined
        ? baseObj["customerId"]
        : "N/A";

    let linkKey: any = localStorage.getItem('nestedRouteKey');
    localStorage.setItem('prevNestedRouteKey', linkKey);
    localStorage.setItem('nestedRouteKey', `${customerName}`);

    history.push({
      pathname: `/main/customers/${customerName}`,
      state: {
        customerName,
        customerId,
        from: 1
      }
    });
  }

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

  const openCreateJobModal = async (ticket: any) => {
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


  const handleFilterData = (jobs: any, location: LocationStateTypes) => {
    let oldJobs = jobs;
    let filteredTickets = oldJobs;

    filteredTickets = filteredTickets.filter((resticket: any) =>
      resticket.customer._id === location.customerId);

    setFilteredTickets(filteredTickets);
  }

  const columns: any = [
    {
      Header: 'Ticket ID',
      accessor: 'ticketId',
      className: 'font-bold',
      sortable: true
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      className: 'font-bold',
      sortable: true
    },
    // {
    //   Header: 'Customer',
    //   accessor: 'customer.profile.displayName',
    //   className: 'font-bold',
    //   sortable: true
    // },
    {
      Cell({ row }: any) {
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
      Header: 'Create Job',
      id: 'action-create-job',
      sortable: false,
      width: 60
    },
    {
      Cell({ row }: any) {
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
      Header: 'Edit Ticket',
      id: 'action-edit-ticket',
      sortable: false,
      width: 60
    },
    {
      Cell({ row }: any) {
        return <div
          aria-label={'detail'} className={'flex items-center'}>
          <InfoIcon />
        </div>;
      },
      Header: 'Ticket Details',
      id: 'action-detail',
      sortable: false,
      width: 60
    }
  ];

  useEffect(() => {
    if (refresh) {
      dispatch(getAllJobTypesAPI());
      dispatch(getAllServiceTicketAPI());
    }

    if (tickets) {
      handleFilterData(tickets, location.state);
    }

    if (customerObj._id === '') {
      const obj: any = location.state;
      const customerId = obj.customerId;
      dispatch(loadingSingleCustomers());
      dispatch(getCustomerDetailAction({ customerId }));
    }
  }, [refresh]);


  return (
    <>
      <div className={classes.pageMainContainer}>
        <div className={classes.pageContainer}>
          <div className={classes.pageContent}>

            <Grid
              container>
              <BCBackButtonNoLink
                func={() => renderGoBack(location.state)}
              />
              <div className="tab_wrapper">
                <BCTabs
                  curTab={curTab}
                  indicatorColor={'primary'}
                  onChangeTab={handleTabChange}
                  tabsData={[
                    {
                      'label': 'CUSTOMER TICKETS',
                      'value': 0
                    },
                  ]}
                />
              </div>
            </Grid>

            <div
              style={{
                'height': '15px'
              }}
            />

            <div
              className={`${classes.dataContainer} `}
              hidden={curTab !== 0}
              id={'0'}>
              <BCTableContainer
                // columns={DUMMY_COLUMN}
                // isLoading={isLoading}
                // search
                // searchPlaceholder={"Search...(Keyword, Datae, Tag, etc.)"}
                // tableData={DUMMY_DATA}
                // initialMsg="There are no data!"
                columns={columns}
                isLoading={isLoading}
                search
                searchPlaceholder={"Search...(Keyword, Date, Tag, etc.)"}
                tableData={filteredTickets}
                initialMsg="There are no data!"
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding: 30px;
  width: 100%;
  padding-left: 65px;
  padding-right: 65px;
  margin: 0 auto;
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(CustomersJobEquipmentInfoTicketsPage);
