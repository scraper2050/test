import BCTableContainer from '../../../components/bc-table-container/bc-table-container';
import BCTabs from '../../../components/bc-tab/bc-tab';
import BCBackButton from '../../../components/bc-back-button/bc-back-button';
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

function ViewMorePage({ classes }: any) {
  const dispatch = useDispatch();
  const jobLocations = useSelector((state: any) => state.jobLocations);
  const customerState = useSelector((state: any) => state.customers);
  const [curTab, setCurTab] = useState(0);
  const location = useLocation();
  const customerObj = location.state;
  const history = useHistory();

  const renderJobSiteComponent = (jobLocation: any) => {
    let locationName = jobLocation.name;
    let locationNameLink = locationName !== undefined ? locationName.replace(/ /g,'') : 'locationName';
    let linkKey:any = localStorage.getItem('nestedRouteKey');
    localStorage.setItem('prevNestedRouteKey', linkKey);
    localStorage.setItem('nestedRouteKey', `location/${locationNameLink}`);
    history.push({
      pathname: `/main/customers/location/${locationNameLink}`,
      state: jobLocation
    });
  };

  const columns: any = [
    {
      'Header': 'Job Location',
      'accessor': 'name',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Contact Name',
      'accessor': 'contact.name',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Address',
      'accessor': 'address.city',
      'className': 'font-bold',
      'sortable': true
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
            onClick={() => { renderJobSiteComponent(row.original) }}
            variant={'extended'}>
            {'View More'}
          </Fab>
          
        </div>;
      },
      'id': 'action',
      'sortable': false,
      'width': 60
    }
  ];

  useEffect(() => {
   const obj: any = location.state;
   const customerId = obj.customerId;
   dispatch(loadingJobLocations());
   dispatch(getJobLocationsAction(customerId));
  }, []);

  const handleTabChange = (newValue: number) => {
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
        <BCBackButton
              link={'/main/customers'}
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
              }
            ]}
          />
          </div>
           
         {
           customerState.loading ? <BCCircularLoader heightValue={'200px'}/> : 
           <SwipeableViews index={curTab} className={'swipe_wrapper'}>
           <div
             className={`${classes.dataContainer} `}
             hidden={curTab !== 0}
             id={'0'}>
             <PageContainer className="info_wrapper alignAddJobLocation">
              < CustomerInfoPage customerObj={customerObj}/> 
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
             id={'1'}>
             <Grid container>
               <Grid
                 item
                 xs={12}
               />
             </Grid>
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
