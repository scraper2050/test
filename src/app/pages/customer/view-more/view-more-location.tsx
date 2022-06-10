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
import {CSButton, CSButtonSmall} from "../../../../helpers/custom";
import LocationInfoPage from "./location-info";


function ViewMoreLocationPage({ classes }: any) {
  const dispatch = useDispatch();
  const jobSites = useSelector((state: any) => state.jobSites);
  const { customerObj, loading } = useSelector((state: any) => state.customers);
  const [curTab, setCurTab] = useState(0);
  const location = useLocation<any>();
  const history = useHistory();

  const customerName = location.state && location.state.customerName;
  const locationName = location.state && location.state.name;

  const openSiteActivationModal = (row: any) => {
    dispatch(setModalDataAction({
      'data': {
        'siteObj': row,
        'modalTitle': '',
        'removeFooter': false
      },
      'type': modalTypes.ACTIVATE_JOB_SITE
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const openEditJobSiteModal = (jobSite: any) => {
    let updateJobSiteObj = { ...jobSite, location: { lat: jobSite.location.coordinates[1], long: jobSite.location.coordinates[0] }, update: true }
    dispatch(setModalDataAction({
      'data': {
        'jobSiteInfo': updateJobSiteObj,
        'modalTitle': 'Edit Job Address',
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
/*    let customerName =
      baseObj["customerName"] && baseObj["customerName"] !== undefined
        ? baseObj["customerName"]
        : "N/A";*/
    let customerName = baseObj["customerName"].replace(/[\/ ]/g, '');
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
      'Header': 'Job Address',
      'accessor': 'name',
      'className': 'font-bold',
      'sortable': true,
      'width': 60
    },
    {
      'Header': 'Street Address',
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
      'accessor': 'location.coordinates[1]',
      'className': 'font-bold',
      'sortable': false,
      'width': 40
    },
    {
      'Header': 'Longitude',
      'accessor': 'location.coordinates[0]',
      'className': 'font-bold',
      'sortable': false,
      'width': 40
    },
    {
      'Header': 'Status',
      'accessor': 'isActive',
      'Cell': function (row: any) {
        return (
          <div className={`${row.value ? '' : classes.inactiveStyle}`}>
            {`${row.value ? 'Active' : 'Inactive'}`}
          </div>
        );
      },
      'className': 'font-bold',
      'sortable': true,
      width: 40,
    },
    {
      'Cell'({ row }: any) {
        return (
          <CSButton
            color="primary"
            size="small"
            aria-label={'edit-job-location'}
            onClick={(e) => {
              e.stopPropagation();
              openSiteActivationModal(row.original);
            }}
          >
            {row?.original?.isActive ? 'Deactivate' : 'Activate'}
          </CSButton>
        );
      },
      'Header': 'Actions',
      'id': 'action-edit-job-location',
      'sortable': false,
      'width': 40,
    },
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

  const openJobSiteModal = () => {
    const obj: any = location.state;
    const locationId = obj._id;
    dispatch(setModalDataAction({
      'data': {
        'jobSiteInfo': { locationId },
        'modalTitle': 'New Job Address',
        'removeFooter': false
      },
      'type': modalTypes.ADD_JOB_SITE
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const handleRowClick = (event: any, row: any) => openEditJobSiteModal(row.original);

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
                    'label': 'SUBDIVISION',
                    'value': 0
                  },

                  {
                    'label': 'CONTACTS',
                    'value': 1
                  },
                ]}
              />
            </div>
{/*            <div style={{ flexGrow: 1 }}></div>

            <div className={classes.customerNameLocation}>
              <Typography><strong>Customer Name: </strong>{customerName}</Typography>
              <Typography><strong>Subdivision: </strong>{locationName}</Typography>
            </div>*/}
          </Grid>

          {loading ? <BCCircularLoader heightValue={'200px'} /> :
            <SwipeableViews index={curTab} className={'swipe_wrapper'}>
              <div
                className={`${classes.dataContainer} `}
                hidden={curTab !== 0}
                id={'0'}>
                <PageContainer className={'info_wrapper alignAddJobLocation'}>
                  <LocationInfoPage customerObj={customerObj} data={location.state}/>
                  <CSButton
                    aria-label={'delete'}
                    color={'primary'}
                    onClick={() => openJobSiteModal()}
                    variant={'contained'}>
                    {'Add Job Address'}
                  </CSButton>
                </PageContainer>

                <BCTableContainer
                  columns={columns}
                  isLoading={jobSites.loading}
                  onRowClick={handleRowClick}
                  search
                  searchPlaceholder={"Search Job Address..."}
                  tableData={jobSites.data}
                  initialMsg="There are no job addresses"
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
  padding: 15px;
  width: 100%;
  padding-left: 0px;
  padding-right: 65px;
  margin: 0 auto;
`;
export default withStyles(
  styles,
  { 'withTheme': true }
)(ViewMoreLocationPage);
