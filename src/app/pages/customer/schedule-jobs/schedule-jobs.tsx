import BCTabs from '../../../components/bc-tab/bc-tab';
import JobPage from './job-page/job-page';
import ServiceTicket from './service-ticket/service-ticket';
import SwipeableViews from 'react-swipeable-views';
import { modalTypes } from '../../../../constants';
import styles from './schedule-jobs.styles';
import { useDispatch, useSelector } from 'react-redux';
import { Fab, useTheme, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getCustomers } from 'actions/customer/customer.action';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { info, error } from 'actions/snackbar/snackbar.action';
import { getAllJobTypesAPI } from 'api/job.api';
import "../../../../scss/popup.scss";
import { useLocation, useHistory } from 'react-router-dom';

function ScheduleJobsPage({ classes }: any) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const location = useLocation<any>();
  const history = useHistory();
  const locationState = location.state;


  const [currentPage, setCurrentPage] = useState({
    page: 0,
    pageSize: 10,
    sortBy: [],
  });


  const [curTab, setCurTab] = useState(locationState?.curTab ? locationState.curTab : 0);

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getAllJobTypesAPI());
  }, []);

  const handleTabChange = (newValue: number) => {


    let tempLocationState = { ...locationState };

    delete tempLocationState["onUpdatePage"];



    history.replace({
      ...history.location,
      state: {
        ...tempLocationState,
        curTab: newValue
      }
    });

    setCurTab(newValue);
  };

  const customers = useSelector(({ customers }: any) => customers.data);
  const jobTypes = useSelector((state: any) => state.jobTypes.data);

  const openCreateTicketModal = () => {
    if (customers.length !== 0) {
      dispatch(setModalDataAction({
        'data': {
          'modalTitle': 'New Service Ticket',
          'removeFooter': false,
          'className': 'serviceTicketTitle',
          'maxHeight': '754px',
          'height': '100%',
          'error': {
            'status': false,
            'message': ''
          }
        },
        'type': modalTypes.CREATE_TICKET_MODAL
      }));
      setTimeout(() => {
        dispatch(openModalAction());
      }, 200);
    } else {
      dispatch(setModalDataAction({
        'data': {
          'removeFooter': false,
          'error': {
            'status': true,
            'message': 'You must add customers to create a service ticket'
          }
        },
        'type': modalTypes.CREATE_TICKET_MODAL
      }));
      setTimeout(() => {
        dispatch(openModalAction());
      }, 200);
    }
  };

  const openJobModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Create Job',
        'removeFooter': false
      },
      'type': modalTypes.CREATE_JOB_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>

        <div className={classes.pageContent}>
          <BCTabs
            curTab={curTab}
            indicatorColor={'primary'}
            onChangeTab={handleTabChange}
            tabsData={[
              {
                'label': 'Jobs',
                'value': 0
              },
              {
                'label': 'Service Tickets',
                'value': 1
              }
            ]}
          />
          <div className={classes.addButtonArea}>
            {/* {
            curTab === 0
              ? <Fab
                aria-label={'new-job'}
                classes={{
                  'root': classes.fabRoot
                }}
                color={'primary'}
                onClick={() => openJobModal()}
                variant={'extended'}>
                {'Create Job'}
              </Fab>
              : null
          } */}
            <Fab
              aria-label={'new-ticket'}
              classes={{
                'root': classes.fabRoot
              }}
              color={'primary'}
              onClick={() => openCreateTicketModal()}
              variant={'extended'}>
              {'New Ticket'}
            </Fab>
          </div>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={curTab}
          >
            <div className={classes.dataContainer} id={"0"}>
              <JobPage hidden={curTab !== 0} />
            </div>
            <div className={classes.dataContainer} id={"1"}>
              <ServiceTicket hidden={curTab !== 1} />
            </div>
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(ScheduleJobsPage);
