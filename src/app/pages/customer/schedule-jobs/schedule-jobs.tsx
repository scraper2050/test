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

function ScheduleJobsPage({ classes }: any) {
  const dispatch = useDispatch();
  const [curTab, setCurTab] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getAllJobTypesAPI());
  }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const customers = useSelector(({ customers }: any) => customers.data);
  const jobTypes = useSelector((state: any) => state.jobTypes.data);

  const openCreateTicketModal = () => {
    if (customers.length !== 0){
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
          {
            curTab === 1
              ? <Fab
                aria-label={'new-ticket'}
                classes={{
                  'root': classes.fabRoot
                }}
                color={'primary'}
                onClick={() => openCreateTicketModal()}
                variant={'extended'}>
                {'New Ticket'}
              </Fab>
              : null
          }
        </div>
          <SwipeableViews
            axis={theme.direction === 'rtl'
              ? 'x-reverse'
              : 'x'}
            index={curTab}>
            <JobPage hidden={curTab !== 0} />
            <ServiceTicket hidden={curTab !== 1} />
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
