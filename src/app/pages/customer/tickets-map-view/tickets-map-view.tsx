import BCTabs from '../../../components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import styles from './ticket-map-view.style';
import { Grid, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import '../../../../scss/index.css';
import "./ticket-map-view.scss";
import MapViewScreen from './map-view/map-view';
import { useDispatch, useSelector } from 'react-redux';
import {
  refreshServiceTickets,
  setOpenServiceTicket,
  setClearOpenServiceTicketObject,
  setClearOpenTicketFilterState,
  setOpenServiceTicketLoading,
} from 'actions/service-ticket/service-ticket.action';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { getOpenServiceTickets } from 'api/service-tickets.api';
import { formatDateYMD } from 'helpers/format';

function TicketsWithMapView({ classes }: any) {

  const dispatch = useDispatch();
  const [curTab, setCurTab] = useState(0);

  const getOpenTickets = (requestObj: {
    pageNo?: number,
    pageSize?: number,
    jobTypeTitle?: string,
    dueDate?: string,
    customerNames?: any,
    ticketId?: string,
    companyId?: string
  }) => {
    dispatch(setOpenServiceTicketLoading(true));
    getOpenServiceTickets(requestObj).then((response: any) => {
      dispatch(setOpenServiceTicketLoading(false));
      dispatch(setOpenServiceTicket(response));
      dispatch(refreshServiceTickets(true));
      dispatch(closeModalAction());
      setTimeout(() => {
        dispatch(setModalDataAction({
          'data': {},
          'type': ''
        }));
      }, 200);
    })
      .catch((err: any) => {
        throw err;
      });
  }

  useEffect(() => {
    const rawData = {
      jobTypeTitle: '',
      dueDate: formatDateYMD(new Date()),
      customerNames: '',
      ticketId: ''
    }
    const requestObj = { ...rawData, pageNo: 1, pageSize: 6 };
    getOpenTickets(requestObj);
    dispatch(setClearOpenServiceTicketObject());
  }, []);


  const handleTabChange = (newValue: number) => {
    dispatch(setClearOpenServiceTicketObject());

    dispatch(setClearOpenServiceTicketObject());
    dispatch(setClearOpenTicketFilterState({
      'jobTypeTitle': '',
      'dueDate': '',
      'customerNames': '',
      'ticketId': ''
    }));
    getOpenTickets({
      pageNo: 1,
      pageSize: 6,
      dueDate: newValue === 0 ? formatDateYMD(new Date()) : '',
    })
    setCurTab(newValue);

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
                'label': 'Today\'s Tickets',
                'value': 0
              },
              {
                'label': 'All Tickets',
                'value': 1
              },
              {
                'label': 'Scheduled Jobs',
                'value': 2
              }
            ]}
          />
          <SwipeableViews index={curTab}>
            <div
              className={classes.dataContainer}
              hidden={curTab !== 0}
              id={'0'}>
              <MapViewScreen today={true} />
            </div>
            <div
              className={classes.dataContainer}
              hidden={curTab !== 1}
              id={'1'}>
              <MapViewScreen />
            </div>
            <div
              hidden={curTab !== 2}
              id={'2'}>
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

export default withStyles(
  styles,
  { 'withTheme': true }
)(TicketsWithMapView);