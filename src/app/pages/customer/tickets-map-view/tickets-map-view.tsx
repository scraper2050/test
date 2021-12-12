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
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import CloseIcon from "@material-ui/icons/Close";
import {STATUSES} from "../../../../helpers/contants";
import BCMapFilterHead from "../../../components/bc-map-filter/bc-map-filter-head";
import { getCustomers } from "../../../../actions/customer/customer.action";
import {getAllJobTypesAPI} from "../../../../api/job.api";
import {getEmployeesForJobAction} from "../../../../actions/employees-for-job/employees-for-job.action";
import {getVendors} from "../../../../actions/vendor/vendor.action";

export  interface FilterTickets {
  jobId?: string | null,
  customerNames?: any,
  contact?: any,
}

export  interface FilterJobs {
  jobId?: string | null,
  customerNames?: any,
  contact?: any,
  jobStatus: number[],
}

export  interface FilterRoutes {
  technician?: any,
  jobType?: any[],
}

const StatusContainer = withTheme(styled('div')`
  position: absolute;
  top: 8px;
  right: 30px;
  display: flex;
  align-items: center;
  .buttonLegend {
    background-color: transparent;
    border: 0;
    color: ${(props) => props.theme.palette.primary.main};
    cursor: pointer;
  }
  .infoLegend {
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
  const [allDates, setAllDates] = useState([null, new Date(), null, new Date()]);
  const [curTab, setCurTab] = useState(3);
  const [showLegendDialog, setShowLegendDialog] = useState(false);

  const [filterOpenTickets, setFilterOpenTickets] = useState<FilterTickets>({
    'customerNames': null,
    'jobId': '',
    'contact': null,
  });

  const [filterTodayJobs, setFilterTodayJobs] = useState<FilterJobs>({
    'customerNames': null,
    'jobId': '',
    'contact': null,
    'jobStatus': [-1],
  });

  const [filterJobs, setFilterJobs] = useState<FilterJobs>({
    'customerNames': null,
    'jobId': '',
    'contact': null,
    'jobStatus': [-1],
  });

  const [filterRoutes, setFilterRoutes] = useState<FilterRoutes>({
    'technician': null,
    'jobType': [],
  });

  const allFilters = [
    [filterOpenTickets, setFilterOpenTickets],
    [filterTodayJobs, setFilterTodayJobs],
    [filterJobs, setFilterJobs],
    [filterRoutes, setFilterRoutes],
  ]

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getAllJobTypesAPI());
    dispatch(getEmployeesForJobAction());
    dispatch(getVendors());
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

  const handleDateChange = (date: Date) => {
    const tempDates = [...allDates];
    tempDates[curTab] = date;
    setAllDates(tempDates);
  }

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={`${classes.pageContent} maps`}>
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
            <BCMapFilterHead
              startDate={allDates[curTab]}
              disableDate={curTab === 1}
              placeholder={curTab === 0 ? "Due Date" : 'Schedule Date'}
              onChangeDate={handleDateChange}
              filter={allFilters[curTab]}
              shouldResetDate={curTab === 0 || curTab === 2}
              filterType={curTab === 0 ? 'ticket' : curTab === 3 ? 'route' : 'job'}
            />
            <button className={'buttonLegend'} onClick={() => setShowLegendDialog(true)}>Legend</button>
            <Info className={'infoLegend'} fontSize={'small'}/>
          </StatusContainer>
          <SwipeableViews index={curTab}>
            <div
              className={`${classes.dataContainer} ${classes.dataContainer}_maps`}
              hidden={curTab !== 0}
              id={'map-swipeable-open'}>
              <MapViewTicketsScreen selectedDate={allDates[0]} filter={filterOpenTickets}/>
            </div>
            <div
              className={`${classes.dataContainer} ${classes.dataContainer}_maps`}
              hidden={curTab !== 1}
              id={'map-swipeable-today'}>
              <MapViewTodayJobsScreen filter={filterTodayJobs}/>
            </div>
            <div
              className={`${classes.dataContainer} ${classes.dataContainer}_maps`}
              hidden={curTab !== 2}
              id={'map-swipeable-schedule'}>
              <MapViewJobsScreen selectedDate={allDates[2]} filter={filterJobs}/>
            </div>
            <div
              className={`${classes.dataContainer} ${classes.dataContainer}_maps`}
              hidden={curTab !== 3}
              id={'map-swipeable-routes'}>
              <MapViewRoutesScreen selectedDate={allDates[3]} filter={filterRoutes}/>
            </div>
          </SwipeableViews>
        </div>
      </div>
      {renderLegend()}
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(TicketsWithMapView);
