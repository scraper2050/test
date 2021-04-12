import BCTabs from '../../../components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import styles from './ticket-map-view.style';
import { Grid, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import '../../../../scss/index.css';
import './ticket-map-view.scss';
import MapViewTicketsScreen from './map-view/map-view-tickets';
import MapViewTodayJobsScreen from './map-view/map-view-today-jobs';
import MapViewJobsScreen from './map-view/map-view-jobs';
import { getAllJobsAPI } from 'api/job.api';
import { useDispatch } from 'react-redux';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import styled from 'styled-components';
import { JobTypes } from 'actions/job/job.types';


const StatusContainer = styled.div`
position: absolute;
top: 20px;
right: 30px;
display: flex;
> div {
  position: relative;
  display: flex;
  margin-right: 20px;
  font-size: 13px;
    text-transform: capitalize;
    align-items: center;
    letter-spacing: .6px;
}
.job-status {
    height: 11px;
    width: 11px;
    border-radius: 15px;
    margin-right: 6px;
    &_0 {
      background-color: #000;
    }
    &_1 {
      background-color: rgb(77, 189, 116);
    }
    &_2 {
      background-color: #fe5500;
    }
    &_3 {
      background-color: #c00707;
    }
  }
`;

function renderLegend() {
  return <StatusContainer>
    {JobTypes.map((type, index) => <div key={index}>
      <div
        className={`job-status job-status_${index}`}
      />
      {type}
    </div>)}
  </StatusContainer>;
}

function TicketsWithMapView({ classes }: any) {
  const dispatch = useDispatch();

  const [curTab, setCurTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllJobsAPI());
    setIsLoading(false);
  }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        {isLoading
          ? <div style={{
            'display': 'flex',
            'width': '100%',
            'justifyContent': 'center'
          }}>
            <BCCircularLoader heightValue={'200px'} />
          </div>
          : <div className={classes.pageContent}>

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
            {curTab === 1 && renderLegend()}
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
        }
      </div>
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(TicketsWithMapView);
