import React, {useEffect, useState, useRef} from 'react';
import { io } from 'socket.io-client';
import { Grid, withStyles } from '@material-ui/core';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';
import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import SidebarJobs from "../sidebar/sidebar-jobs";
import {FilterJobs} from "../tickets-map-view";
import {useDispatch, useSelector} from "react-redux";
import {parseISOMoment} from "../../../../../helpers/format";
import { getScheduledJobsStream } from "api/job.api";
import { setScheduledJobs, streamJobs, refreshJobs } from "actions/job/job.action";
import Config from "config";
import { SocketMessage } from "helpers/contants";

interface Props {
  classes: any;
  selectedDate: Date | null;
  filter: FilterJobs;
}

function MapViewJobsScreen({ classes, selectedDate, filter: filterJobs }: Props) {
  const dispatch = useDispatch();
  const { token } = useSelector(({ auth }: any) => auth);
  const { scheduledJobs, refresh} = useSelector(
    ({ jobState }: any) => ({
      scheduledJobs: jobState.scheduledJobs,
      refresh: jobState.refresh,
    })
  );

  const tempJobs = useRef<any[]>([]);
  const totalJobs = useRef<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
    
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
          filter = filter && (job.customerContactId === filterJobs.contact._id);
        }
      }

      if(selectedDate) {
        filter = filter && parseISOMoment(job.scheduleDate).isSame(selectedDate, 'day');
      }
      return filter;
    });
  };

  useEffect(() => {
    dispatch(refreshJobs(true));
    return () => {
      dispatch(refreshJobs(false));
    }
  }, [])

  useEffect(() => {
    if(refresh){
      setIsLoading(true);
      dispatch(setScheduledJobs([]));
      tempJobs.current = [];
      const socket = io(`${Config.socketSever}`, {
        'extraHeaders': { 'Authorization': token }
      });
  
      socket.on("connect", () => {
        getScheduledJobsStream();
        dispatch(streamJobs(true));
      });
  
      socket.on(SocketMessage.ALL_SCHEDULED_JOBS, data => {
        const {count, job, total} = data;
        if (job) {
          tempJobs.current.push(job);
          if (count % 25 === 0 || count === total) {
            totalJobs.current = total;
            setIsLoading(false);
            dispatch(setScheduledJobs(tempJobs.current));
          }
          if (count === total) {
            socket.close();
            dispatch(streamJobs(false));
            dispatch(setScheduledJobs(tempJobs.current));
            dispatch(refreshJobs(false));
          }
        }
      });
  
      return () => {
        if(localStorage.getItem('prevPage') !== 'schedule' && localStorage.getItem('prevPage') !== 'customer-jobs'){
          socket.close();
          dispatch(streamJobs(false));
          dispatch(refreshJobs(false));
        }
        setIsLoading(false);
      };
    }
  }, [refresh]);

  useEffect(() => {
    setFilteredJobs(filterScheduledJobs(scheduledJobs));
  }, [scheduledJobs, selectedDate, filterJobs])

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
            list={filteredJobs}
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
