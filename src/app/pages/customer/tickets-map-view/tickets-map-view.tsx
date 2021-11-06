import BCTabs from '../../../components/bc-tab/bc-tab';
import SwipeableViews from 'react-swipeable-views';
import styles from './ticket-map-view.style';
import {
  Dialog,
  DialogTitle,
  IconButton, List, ListItem, ListItemText,
  withStyles,
  withTheme
} from '@material-ui/core';
import { Info } from '@material-ui/icons';
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

import { ReactComponent as  IconCancelled} from 'assets/img/icons/map/icon-cancelled.svg';
import { ReactComponent as  IconCompleted} from 'assets/img/icons/map/icon-completed.svg';
import { ReactComponent as  IconPending} from 'assets/img/icons/map/icon-pending.svg';
import { ReactComponent as  IconStarted} from 'assets/img/icons/map/icon-started.svg';
import { ReactComponent as  IconIncomplete} from 'assets/img/icons/map/icon-incomplete.svg';
import { ReactComponent as IconPaused} from 'assets/img/icons/map/icon-paused.svg';
import { ReactComponent as  IconRescheduled} from 'assets/img/icons/map/icon-rescheduled.svg';
import CloseIcon from "@material-ui/icons/Close";

const STATUSES = [
  { title: 'Pending', icon: IconPending, color: '#828282' },
  { title: 'Started', icon: IconStarted, color: '#00AAFF' },
  { title: 'Paused', icon: IconPaused, color: '#FA8029'},
  { title: 'Completed', icon: IconCompleted, color: '#50AE55'},
  { title: 'Cancelled', icon: IconCancelled, color: '#A107FF'},
  { title: 'Rescheduled', icon: IconRescheduled, color: '#828282' },
  { title: 'Incomplete', icon: IconIncomplete, color: '#F50057'},
];

const StatusContainer = withTheme(styled('div')`
position: absolute;
top: 20px;
right: 30px;
display: flex;
button {
    background-color: transparent;
    border: 0;
    color: ${(props) => props.theme.palette.primary.main};
    cursor: pointer;
}
svg {
  color: ${(props) => props.theme.palette.primary.main};
}

  @media(max-width: 1200px) {
    position: relative;
    top: 0;
    margin-top: 10px;
    margin-bottom: 5px;
    right: 0;
    justify-content: flex-end;
  }
`);

function TicketsWithMapView({ classes }: any) {
  const dispatch = useDispatch();
    console.log(classes)
  const [curTab, setCurTab] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [showLegendDialog, setShowLegendDialog] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllJobsAPI());
    setIsLoading(false);
  }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const renderLegend = () => {
    return <Dialog
      classes= {{paper: classes.dialog}}
      onClose={() => setShowLegendDialog(false)}
      aria-labelledby="simple-dialog-title"
      open={showLegendDialog}>
      <DialogTitle classes={{root: classes.dialogTitle}} id="simple-dialog-title">
        Legend Information
        <IconButton classes={{root: classes.dialogClose}} onClick={() => setShowLegendDialog(false)}>
          <CloseIcon style={{color: '#828282'}}/>
        </IconButton>
      </DialogTitle>
      <List>
        {STATUSES.map((status) => {
          const StatusIcon = status.icon;
          return (
            <ListItem key={status.title}>
              <StatusIcon />
              <ListItemText style={{color: status.color, marginLeft: 15}} primary={status.title}/>
            </ListItem>
          )
        })}
      </List>
    </Dialog>
  }

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
            <StatusContainer>
              <button onClick={() => setShowLegendDialog(true)}>Legend</button>
              <Info fontSize={'small'}/>
            </StatusContainer>
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
      {renderLegend()}
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(TicketsWithMapView);
