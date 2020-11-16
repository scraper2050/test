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
import { loadingJobSites, getJobSites } from 'actions/job-site/job-site.action';

import '../../../../scss/index.scss';

function ViewMorePage({ classes }: any) {
  const dispatch = useDispatch();
  const jobSites = useSelector((state: any) => state.jobSites);
  const [curTab, setCurTab] = useState(0);
  const location = useLocation();
  const customerObj = location.state;

  const openEditJobSiteModal = (jobSite: any) => {
    let updateJobSiteObj = { ...jobSite, location: { lat: jobSite.location.coordinates[1], lon: jobSite.location.coordinates[0] }, update: true }
    dispatch(setModalDataAction({
      'data': {
        'customerObj': updateJobSiteObj,
        'modalTitle': 'Edit Job Site',
        'removeFooter': false
      },
      'type': modalTypes.ADD_JOB_SITE
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const columns: any = [
    {
      'Header': 'Job Site',
      'accessor': 'name',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Name',
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
            onClick={() => { openEditJobSiteModal(row.original) }}
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
   dispatch(loadingJobSites());
   dispatch(getJobSites(customerId));
  }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const handleRowClick = (event: any, row: any) => {
    console.log(event, row);
  };

  const openJobSiteModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'customerObj': customerObj,
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
           
          <SwipeableViews index={curTab} className={'swipe_wrapper'}>
            <div
              className={`${classes.dataContainer} `}
              hidden={curTab !== 0}
              id={'0'}>
              <PageContainer className="info_wrapper">
                < CustomerInfoPage customerObj={customerObj}/>
                <Fab
                    aria-label={'delete'}
                    classes={{
                    'root': classes.fabRoot
                    }}
                    onClick={() => openJobSiteModal()}
                    color={'primary'}
                    variant={'extended'}>
                    {'Add Job Site'}
                </Fab>
            </PageContainer>
            
              <BCTableContainer
                columns={columns}
                isLoading={jobSites.loading}
                onRowClick={handleRowClick}
                search
                searchPlaceholder={"Search Job Sites..."}
                tableData={jobSites.data}
                initialMsg="There are no job sites!"
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
