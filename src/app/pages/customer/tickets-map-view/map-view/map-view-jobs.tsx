import Config from 'config';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';
import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import SidebarJobs from "../sidebar/sidebar-jobs";
import {FilterJobs} from "../tickets-map-view";
import {useDispatch, useSelector} from "react-redux";
import {parseISOMoment} from "../../../../../helpers/format";
import {  getAllJobsAPI } from "api/job.api";
import {
  setCurrentPageIndex,
  setCurrentPageSize,
  setKeyword,
} from "actions/job/job.action";
import {RootState} from "reducers";
import {CompanyProfileStateType} from "actions/user/user.types";
import {setTicketSelected} from "actions/map/map.actions";
import { openModalAction, setModalDataAction } from "actions/bc-modal/bc-modal.action";

interface Props {
  classes: any;
  selectedDate: Date | null;
  filter: FilterJobs;
}

function MapViewJobsScreen({ classes, selectedDate, filter: filterJobs }: Props) {
  const dispatch = useDispatch();
  const { isLoading = true, jobs, refresh = true } = useSelector(
    ({ jobState }: any) => ({
      isLoading: jobState.isLoading,
      jobs: jobState.data,
      refresh: jobState.refresh
    })
  );
  const { streaming: streamingTickets } = useSelector(({ serviceTicket }: any) => ({
    streaming: serviceTicket.stream,
  }));
  const selected = useSelector((state: RootState) => state.map.ticketSelected);
  const {coordinates}: CompanyProfileStateType = useSelector((state: any) => state.profile);

  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('0');
  const [jobIdFilter, setJobIdFilter] = useState('')
    
  const filterScheduledJobs = (jobs: any) => {
    return jobs.filter((job: any) => {
      let filter = true;
      if (filterJobs.jobStatus.indexOf(-1) === -1) {
        filter = filterJobs.jobStatus.indexOf(job.status) >= 0;
      }

      if (filterJobs.jobId) {
        filter = filter && (job.jobId.indexOf(filterJobs.jobId) >= 0);
      }

      if (filterJobs.customerNames) {
        filter = filter && (job.customer._id === filterJobs.customerNames._id);
        if (filterJobs.contact) {
          filter = filter && (job.customerContactId?._id === filterJobs.contact._id);
        }
      }

      if(selectedDate) {
        const offset = moment.parseZone().utcOffset();
        const parsedDate = moment(job.scheduleDate).subtract(offset, 'minutes').add(1, 'hours').hour(0).toString();
        const parsedSelectedDate = moment(selectedDate).subtract(offset, 'minutes').add(1, 'hours').hour(0).toString();
        filter = filter && parseISOMoment(parsedDate).isSame(parseISOMoment(parsedSelectedDate), 'day');
      }
      return filter;
    });
  };

  useEffect(() => {
    if(filterJobs.jobStatus.length === 1){
      setStatusFilter(`${filterJobs.jobStatus[0]}`)
    } else {
      setStatusFilter('-1')
    }
    if(filterJobs.jobId){
      setJobIdFilter(filterJobs.jobId)
    } else {
      setJobIdFilter('')
    }
  }, [filterJobs])

  const getJobsData = () => {
    dispatch(getAllJobsAPI(2020, undefined, undefined, statusFilter, jobIdFilter));
    dispatch(setKeyword(''));
    dispatch(setCurrentPageIndex(0));
    dispatch(setCurrentPageSize(2020));
  }
  

  useEffect(() => {
    if (refresh) {
      getJobsData();
    }
  }, [refresh]);

  useEffect(() => {
    getJobsData();
  }, [statusFilter, jobIdFilter]);

  useEffect(() => {
    getJobsData();
  }, [])
  
  useEffect(() => {
    setFilteredJobs(filterScheduledJobs(jobs));
  }, [jobs, selectedDate, filterJobs])

  const dispatchUnselectTicket = () => {
    dispatch(setTicketSelected({_id: ''}));
  }

  const openModalHandler = (modalDataAction: any) => {
    dispatch(setModalDataAction(modalDataAction));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  }

  return (
    <Grid
      container
      item
      lg={12} >
      <Grid
        container
        item
        lg={12}
        className={'ticketsMapContainer'}
      >
        {
          <MemoizedMap
            reactAppGoogleKeyFromConfig={Config.REACT_APP_GOOGLE_KEY}
            list={filteredJobs}
            streamingTickets={streamingTickets}
            selected={selected}
            coordinates={coordinates}
            dispatchUnselectTicket={dispatchUnselectTicket}
            openModalHandler={openModalHandler}
          />
        }
      </Grid>

      <SidebarJobs jobs={filteredJobs} isLoading={isLoading}/>
    </Grid>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(MapViewJobsScreen);
