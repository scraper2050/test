import BCTableContainer from '../../../components/bc-table-container/bc-table-container';
import BCBackButtonNoLink from '../../../components/bc-back-button/bc-back-button-no-link';
import BCAdminCard from '../../../components/bc-admin-card/bc-admin-card';
import BCTabs from '../../../components/bc-tab/bc-tab';
import BCBackButton from '../../../components/bc-back-button/bc-back-button';
import ReportsIcon from 'assets/img/icons/customers/Reports';
import JobsIcon from 'assets/img/icons/customers/Jobs';
import TicketsIcon from 'assets/img/icons/customers/Tickets';
import EquipmentIcon from 'assets/img/icons/customers/Equipment';
import Fab from '@material-ui/core/Fab';
import SwipeableViews from 'react-swipeable-views';
import styles from './view-more.styles';
import { Grid, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CustomerInfoPage from './customer-info';
import { useLocation } from "react-router-dom";
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { modalTypes } from '../../../../constants';
import { loadingJobLocations, getJobLocationsAction } from 'actions/job-location/job-location.action';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import '../../../../scss/index.scss';
import { useHistory } from 'react-router-dom';
import CustomerContactsPage from './contacts/contacts';

interface LocationState {
  customerName?: string;
  customerId?: string;
  from?: number;
}

function ViewMorePage({ classes }: any) {
  const dispatch = useDispatch();
  const jobLocations = useSelector((state: any) => state.jobLocations);
  const customerState = useSelector((state: any) => state.customers);
  const location = useLocation<any>();
  const [from, setFrom] = useState("");
  const customerObj = location.state;
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);

  const prevPage = customerObj && customerObj.prevPage ? customerObj.prevPage : null;

  const [currentPage, setCurrentPage] = useState({
    page: prevPage ? prevPage.page : 0,
    pageSize: prevPage ? prevPage.pageSize : 10,
    sortBy: prevPage ? prevPage.sortBy : [],
  });

  const renderJobSiteComponent = (jobLocation: any, customerState: any) => {

    let baseObj = customerState;
    let customerName =
      baseObj["profile"] && baseObj["profile"] !== undefined
        ? baseObj["profile"]["displayName"]
        : "N/A";

    customerName =
      customerName !== undefined
        ? customerName.replace(/ /g, "")
        : "customername";

    let locationName = jobLocation.name;
    let locationNameLink = locationName !== undefined ? locationName.replace(/ /g, '') : 'locationName';
    let linkKey: any = localStorage.getItem('nestedRouteKey');
    localStorage.setItem('prevNestedRouteKey', linkKey);
    localStorage.setItem('nestedRouteKey', `location/${locationNameLink}`);
    history.push({
      pathname: `/main/customers/location/${locationNameLink}`,
      state: {
        ...jobLocation,
        currentPage,
        customerName
      }
    });
  };


  const renderJobEquipmentButton = (customerState: any, link: string) => {
    let baseObj = customerState;
    let customerName =
      baseObj["profile"] && baseObj["profile"] !== undefined
        ? baseObj["profile"]["displayName"]
        : "N/A";
    let customerId =
      baseObj["_id"] && baseObj["_id"] !== undefined
        ? baseObj["_id"]
        : "N/A";
    let customerObj = {
      customerName,
      customerId,
    };
    customerName =
      customerName !== undefined
        ? customerName.replace(/ /g, "")
        : "customername";

    let linkKey: any = localStorage.getItem('nestedRouteKey');
    localStorage.setItem('prevNestedRouteKey', linkKey);
    localStorage.setItem('nestedRouteKey', `${customerName}/job-equipment-info/${link}`);
    history.push({
      pathname: `/main/customers/${customerName}/job-equipment-info/${link}`,
      state: customerObj,
    });
  };

  const columns: any = [
    {
      'Header': 'Job Location',
      'accessor': 'name',
      'className': 'font-bold',
      'sortable': true,
      'width': 50
    },
    {
      'Header': 'Address',
      'accessor': 'address',
      Cell: (row: any) => {
        return (
          <div>
            <span>{`${row.value && row.value.street ? row.value.street : ''}` + ' '}</span>
            <span>{`${row.value && row.value.city ? row.value.city : ''}` + ' '}</span>
            <span>{`${row.value && row.value.state !== 'none' ? row.value.state : ''}` + ' '}</span>
            <span>{`${row.value && row.value.zipcode ? row.value.zipcode : ''}` + ' '}</span>
          </div>
        )
      },
      'className': 'font-bold',
      'sortable': true
    },

    {
      'Header': 'Latitude',
      'accessor': 'location.coordinates[0]',
      'className': 'font-bold',
      'sortable': false,
      'width': 40
    },
    {
      'Header': 'Longitude',
      'accessor': 'location.coordinates[1]',
      'className': 'font-bold',
      'sortable': false,
      'width': 40
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          <Fab
            aria-label={'delete'}
            classes={{
              'root': classes.fabRoot
            }}
            color={'primary'}
            onClick={() => { renderJobSiteComponent(row.original, customerState.customerObj) }}
            variant={'extended'}>
            {'View More'}
          </Fab>

        </div>;
      },

      'Header': 'Actions',
      'id': 'action',
      'sortable': false,
      'width': 40
    }
  ];

  useEffect(() => {
    if (jobLocations.refresh) {

      const obj: any = location.state;
      const customerId = obj.customerId;
      dispatch(loadingJobLocations());
      dispatch(getJobLocationsAction(customerId));
    }
  }, [jobLocations.refresh]);

  useEffect(() => {

    const obj: any = location.state;
    const customerId = obj.customerId;
    dispatch(loadingJobLocations());
    dispatch(getJobLocationsAction(customerId));


  }, [location.pathname])

  useEffect(() => {
    if (customerObj.from === 1) {
      setCurTab(1);
    } else if (customerObj.from === 2) {
      setCurTab(2);
    }

  }, [customerObj])

  const handleTabChange = (newValue: number) => {
    let state = {
      ...customerObj,
      from: newValue
    };

    history.replace({ ...history.location, state })
    setCurTab(newValue);
  };



  const openJobLocationModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'locationObj': customerObj,
        'modalTitle': 'New Job Location',
        'removeFooter': false
      },
      'type': modalTypes.ADD_JOB_LOCATION
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>

          <Grid container
          >
            <BCBackButtonNoLink
              func={() => {
                history.push({
                  pathname: '/main/customers',
                  state: {
                    prevPage: location.state.currentPage
                  }
                })
              }}
            />

            <div className="tab_wrapper">
              <BCTabs
                curTab={curTab}
                indicatorColor={'primary'}
                onChangeTab={handleTabChange}
                tabsData={[
                  {
                    'label': 'CUSTOMER INFO',
                    'value': 0
                  },
                  {
                    'label': 'JOB/EQUIPMENT INFO',
                    'value': 1
                  },
                  {
                    'label': 'CONTACTS',
                    'value': 2
                  }
                ]}
              />
            </div>
          </Grid>

          {
            customerState.loading ? <BCCircularLoader heightValue={'200px'} /> :
              <SwipeableViews index={curTab} className={'swipe_wrapper'}>
                <div
                  className={`${classes.dataContainer} `}
                  hidden={curTab !== 0}
                  id={'0'}>
                  <PageContainer className="info_wrapper alignAddJobLocation">
                    < CustomerInfoPage customerObj={customerObj} />
                    <Fab
                      aria-label={'delete'}
                      classes={{
                        'root': classes.fabRoot
                      }}
                      onClick={() => openJobLocationModal()}
                      color={'primary'}
                      variant={'extended'}>
                      {'Add Job Location'}
                    </Fab>
                  </PageContainer>

                  <BCTableContainer
                    currentPage={currentPage}
                    setPage={setCurrentPage}
                    columns={columns}
                    isLoading={jobLocations.loading}
                    search
                    searchPlaceholder={"Search Job Locations..."}
                    tableData={jobLocations.data}
                    initialMsg="There are no job locations!"
                  />
                </div>

                <div
                  hidden={curTab !== 1}
                  style={{
                    'padding': '40px'
                  }}
                  id={'1'}>

                  <Grid container
                    spacing={5}>
                    <Grid
                      item>
                      <BCAdminCard
                        cardText={'Reports'}
                        color={'primary'}
                        func={() => renderJobEquipmentButton(customerState.customerObj, 'reports')}
                      >
                        <ReportsIcon />
                      </BCAdminCard>
                    </Grid>

                    <Grid
                      item>
                      <BCAdminCard
                        cardText={'Jobs'}
                        color={'secondary'}
                        func={() => renderJobEquipmentButton(customerState.customerObj, 'jobs')}
                      >
                        <JobsIcon />
                      </BCAdminCard>
                    </Grid>

                    <Grid
                      item>
                      <BCAdminCard
                        cardText={'Tickets'}
                        color={'info'}
                        func={() => renderJobEquipmentButton(customerState.customerObj, 'tickets')}
                      >
                        <TicketsIcon />
                      </BCAdminCard>
                    </Grid>

                    <Grid
                      item>
                      <BCAdminCard
                        cardText={'Equipment'}
                        color={'primary-red'}
                        func={() => renderJobEquipmentButton(customerState.customerObj, 'equipment')}
                      >
                        <EquipmentIcon />
                      </BCAdminCard>
                    </Grid>
                  </Grid>
                </div>


                <div
                  className={`${classes.dataContainer} `}
                  hidden={curTab !== 2}
                  style={{
                    'marginTop': '20px'
                  }}
                  id={'2'}>

                  <CustomerContactsPage
                    id={location.state.customerId}
                    type="Customer"
                  />
                </div>
              </SwipeableViews>
          }
        </div>
      </div>
    </div>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  padding: 30px;
  width: 100%;
  padding-left: 0px;
  padding-right: 65px;
  margin: 0 auto;
`;
export default withStyles(
  styles,
  { 'withTheme': true }
)(ViewMorePage);
