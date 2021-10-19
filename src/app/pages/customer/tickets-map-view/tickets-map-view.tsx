import BCTabs from '../../../components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import styles from './ticket-map-view.style';
import { Grid, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './ticket-map-view.scss';
import MapViewTicketsScreen from './map-view/map-view-tickets';
import MapViewTodayJobsScreen from './map-view/map-view-today-jobs';
import MapViewJobsScreen from './map-view/map-view-jobs';
import MapViewRoutesScreen from './map-view/map-view-routes';
import { getAllJobsAPI } from 'api/job.api';
import { useDispatch } from 'react-redux';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import styled from 'styled-components';
import { JobTypes } from 'actions/job/job.types';

import iconCancelled from 'assets/img/icons/map/icon-cancelled.svg';
import iconCompleted from 'assets/img/icons/map/icon-completed.svg';
import iconPending from 'assets/img/icons/map/icon-pending.svg';
import iconStarted from 'assets/img/icons/map/icon-started.svg';

const StatusContainer = styled.div`
position: absolute;
top: 20px;
right: 30px;
display: flex;
> div {
  position: relative;
  display: flex;
  margin-right: 30px;
  font-size: 12px;
  text-transform: capitalize;
  align-items: center;
  letter-spacing: .6px;
  &:last-child {
    margin-right: 0;
  }
}
.job-status {
    height: 20px;
    width: 20px;
    border-radius: 15px;
    margin-right: 10px;
    &_0 {
      background-image: url(${iconPending});

      & + span {
        color: rgba(130, 130, 130, 1);
      }

    }
    &_1 {
      background-image: url(${iconStarted});

      & + span {
        color: rgba(0, 170, 255, 1);
      }
    }
    &_2 {
      background-image: url(${iconCompleted});

      & + span {
        color: rgba(80, 174, 85, 1);
      }
    }
    &_3 {
      background-image: url(${iconCancelled});

      & + span {
        color: rgba(245, 0, 87, 1);
      }
    }
  }

  @media(max-width: 1200px) {
    position: relative;
    top: 0;
    margin-top: 10px;
    margin-bottom: 5px;
    right: 0;
    justify-content: flex-end;
  }
`;

function renderLegend() {
  return <StatusContainer>
    {JobTypes.map((type, index) => <div key={index}>
      <div
        className={`job-status job-status_${index}`}
      />
      <span>{type}</span>
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
          : <div className={`${classes.pageContent} maps`}>

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
                },
                {
                  'label': 'Routes',
                  'value': 3
                },
              ]}
            />
            { renderLegend() }
            <SwipeableViews index={curTab}>
              <div
                className={`${classes.dataContainer} ${classes.dataContainer}_maps`}
                hidden={curTab !== 0}
                id={'map-swipeable-open'}>
                <MapViewTicketsScreen />
              </div>
              <div
                className={`${classes.dataContainer} ${classes.dataContainer}_maps`}
                hidden={curTab !== 1}
                id={'map-swipeable-today'}>
                <MapViewTodayJobsScreen />
              </div>
              <div
                className={`${classes.dataContainer} ${classes.dataContainer}_maps`}
                hidden={curTab !== 2}
                id={'map-swipeable-schedule'}>
                <MapViewJobsScreen />
              </div>
              <div
                className={`${classes.dataContainer} ${classes.dataContainer}_maps`}
                hidden={curTab !== 3}
                id={'map-swipeable-routes'}>
                <MapViewRoutesScreen />
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
