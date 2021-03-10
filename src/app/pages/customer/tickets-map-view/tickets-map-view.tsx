import BCTabs from '../../../components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import styles from './ticket-map-view.style';
import { Grid, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import '../../../../scss/index.css';
import "./ticket-map-view.scss";
import MapViewTicketsScreen from './map-view/map-view-tickets';
import MapViewTodayJobsScreen from './map-view/map-view-today-jobs';
import MapViewJobsScreen from './map-view/map-view-jobs';

function TicketsWithMapView({ classes }: any) {


  const [curTab, setCurTab] = useState(0);


  const handleTabChange = (newValue: number) => {
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
                'label': 'Open Tickets',
                'value': 0
              },
              {
                'label': 'Today\'s Jobs',
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
              <MapViewTicketsScreen />
            </div>
            <div
              className={classes.dataContainer}
              hidden={curTab !== 1}
              id={'1'}>
              <MapViewTodayJobsScreen />
            </div>
            <div
              className={classes.dataContainer}
              hidden={curTab !== 2}
              id={'2'}>
              <MapViewJobsScreen />
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