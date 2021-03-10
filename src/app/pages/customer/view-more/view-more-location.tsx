import BCTableContainer from '../../../components/bc-table-container/bc-table-container';
import BCBackButtonNoLink from '../../../components/bc-back-button/bc-back-button-no-link';
import BCTabs from '../../../components/bc-tab/bc-tab';
import Fab from '@material-ui/core/Fab';
import styles from './view-more.styles';
import SwipeableViews from 'react-swipeable-views';
import { Grid, Typography, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { modalTypes } from '../../../../constants';
import { loadingJobSites, getJobSites } from 'actions/job-site/job-site.action';
import { getCustomerDetailAction, loadingSingleCustomers } from 'actions/customer/customer.action';
import '../../../../scss/index.scss';
import { useHistory } from 'react-router-dom';
import CustomerContactsPage from './contacts/contacts';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';


function ViewMoreLocationPage({ classes }: any) {
  const dispatch = useDispatch();
  const jobSites = useSelector((state: any) => state.jobSites);
  const { customerObj, loading } = useSelector((state: any) => state.customers);
  const [curTab, setCurTab] = useState(0);
  const location = useLocation<any>();
  const history = useHistory();

  const customerName = location.state && location.state.customerName;
  const locationName = location.state && location.state.name;

  const openEditJobSiteModal = (jobSite: any) => {
    let updateJobSiteObj = { ...jobSite, location: { lat: jobSite.location.coordinates[1], long: jobSite.location.coordinates[0] }, update: true }
    dispatch(setModalDataAction({
      'data': {
        'jobSiteInfo': updateJobSiteObj,
        'modalTitle': 'Edit Job Site',
        'removeFooter': false
      },
      'type': modalTypes.ADD_JOB_SITE
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
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

    let currentPage =
      baseObj["currentPage"] && baseObj["currentPage"] !== undefined
        ? baseObj["currentPage"]
        : "N/A";

    localStorage.setItem('prevNestedRouteKey', `${customerName}`);
    localStorage.setItem('nestedRouteKey', `${customerName}`);

    history.push({
      pathname: `/main/customers/${customerName}`,
      state: {
        customerName,
        customerId,
        prevPage: currentPage
      }
    });

  }
  const columns: any = [
    {
      'Header': 'Job Site',
      'accessor': 'name',
      'className': 'font-bold',
      'sortable': true,
      'width': 60
    },
    {
      'Header': 'Address',
      'accessor': 'address',
      Cell: (row: any) => {
        return (
          <div>
            <span>{`${row.value.street}` + ' '}</span>
            <span>{`${row.value.city}` + ' '}</span>
            <span>{`${row.value.state !== 'none' ? row.value.state : ''}` + ' '}</span>
            <span>{`${row.value.zipcode}` + ' '}</span>
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
            onClick={() => { openEditJobSiteModal(row.original) }}
            variant={'extended'}>
            {'View More'}
          </Fab>

        </div>;
      },
      'Header': 'Actions',
      'id': 'action',
      'sortable': false,
      'width': 60
    }
  ];


  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  useEffect(() => {
    const obj: any = location.state;

    var locationId = obj._id;
    const customerId = obj.customerId;
    dispatch(loadingJobSites());
    dispatch(getJobSites({ customerId, locationId }));
    if (customerObj._id === '') {
      const obj: any = location.state;
      const customerId = obj.customerId;
      dispatch(loadingSingleCustomers())
      dispatch(getCustomerDetailAction({ customerId }));
    }
    return () => {
      let linkKey: any = localStorage.getItem('prevNestedRouteKey');
      localStorage.setItem('nestedRouteKey', linkKey);
    }
  }, []);

  const openJobLocationModal = () => {
    const obj: any = location.state;
    const locationId = obj._id;
    dispatch(setModalDataAction({
      'data': {
        'jobSiteInfo': { locationId },
        'modalTitle': 'New Job Site',
        'removeFooter': false
      },
      'type': modalTypes.ADD_JOB_SITE
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>

          <Grid container>
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
                    'label': 'JOB LOCATION',
                    'value': 0
                  },

                  {
                    'label': 'CONTACTS',
                    'value': 1
                  },
                ]}
              />
            </div>
            <div style={{ flexGrow: 1 }}></div>

            <div className={classes.customerNameLocation}>
              <Typography><strong>Customer Name: </strong>{customerName}</Typography>
              <Typography><strong>Job Location: </strong>{locationName}</Typography>
            </div>
          </Grid>

          {loading ? <BCCircularLoader heightValue={'200px'} /> :
            <SwipeableViews index={curTab} className={'swipe_wrapper'}>
              <div
                className={`${classes.dataContainer} `}
                hidden={curTab !== 0}
                style={{
                  'marginTop': '20px'
                }}
                id={'0'}>
                <div className={classes.addButtonArea}>
                  <Fab
                    aria-label={'delete'}
                    classes={{
                      'root': classes.fabRoot
                    }}
                    color={'primary'}
                    onClick={() => openJobLocationModal()}
                    variant={'extended'}>
                    {'Add Job Site'}
                  </Fab>
                </div>

                <BCTableContainer
                  columns={columns}
                  isLoading={jobSites.loading}
                  search
                  searchPlaceholder={"Search Job Sites..."}
                  tableData={jobSites.data}
                  initialMsg="There are no job sites!"
                />
              </div>


              <div
                className={`${classes.dataContainer} `}
                hidden={curTab !== 1}
                style={{
                  'marginTop': '20px'
                }}
                id={'1'}>

                <CustomerContactsPage
                  id={location.state._id}
                  type="JobLocation"
                  customerId={location.state.customerId}
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
)(ViewMoreLocationPage);