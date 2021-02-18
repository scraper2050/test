import BCTabs from '../../../components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import styles from './ticket-map-view.style';
import { Grid, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import '../../../../scss/index.css';
import "./ticket-map-view.scss";
import MapViewTicketsScreen from './map-view/map-view-tickets';
import MapViewJobsScreen from './map-view/map-view-jobs';
import { getAllJobsAPI } from "api/job.api";
import { useDispatch, useSelector } from "react-redux";
import { formatDateYMD } from 'helpers/format';

function TicketsWithMapView({ classes }: any) {
  const dispatch = useDispatch();
  const { isLoading = true, jobs, refresh = true } = useSelector(
    ({ jobState }: any) => ({
      isLoading: jobState.isLoading,
      jobs: jobState.data,
      refresh: jobState.refresh,
    })
  );


  const [curTab, setCurTab] = useState(0);


  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);

  };

  useEffect(() => {
    if (refresh) {
      dispatch(getAllJobsAPI());
    }
  }, [refresh]);

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
                'label': 'Today\s Jobs',
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
              <MapViewTicketsScreen today={true} />
            </div>
            <div
              className={classes.dataContainer}
              hidden={curTab !== 1}
              id={'1'}>
              <MapViewJobsScreen
                today={true}
                isLoading={isLoading}
                jobs={jobs.filter((job: any) => formatDateYMD(job.scheduleDate) === formatDateYMD(new Date()))} />
            </div>
            <div
              className={classes.dataContainer}
              hidden={curTab !== 2}
              id={'2'}>
              <MapViewJobsScreen
                isLoading={isLoading}
                jobs={jobs.filter((job: any) => formatDateYMD(job.scheduleDate) !== formatDateYMD(new Date()))} />
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