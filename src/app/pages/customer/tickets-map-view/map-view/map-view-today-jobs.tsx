import React, { useEffect, useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';

import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import { Job } from '../../../../../actions/job/job.types';
import SidebarTodayJobs from '../sidebar/sidebar-today-jobs';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';
import {FilterJobs} from "../tickets-map-view";
import { useDispatch, useSelector} from "react-redux";
import { getTodaysJobsAPI } from "api/job.api";

interface Props {
  classes: any;
  filter: FilterJobs;
}

function MapViewTodayJobsScreen({ classes, filter: filterJobs }: Props) {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [statusFilter, setStatusFilter] = useState('-1');
  const [jobIdFilter, setJobIdFilter] = useState('')
  const { isLoading = true, todaysJobs, refresh = true } = useSelector(
    ({ jobState }: any) => ({
      isLoading: jobState.isTodaysJobLoading,
      todaysJobs: jobState.todaysJobs,
      refresh: jobState.refresh,
    })
  );

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
    dispatch(getTodaysJobsAPI(statusFilter, jobIdFilter));
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
    setJobs(filterScheduledJobs(todaysJobs));
  }, [todaysJobs, filterJobs]);

  return (
    <Grid container item lg={12} >
      <Grid
        container
        item
        lg={12}
        className={'ticketsMapContainer'}
      >
        {
          <MemoizedMap
            list={jobs}
            showPins
          />
        }
      </Grid>

      <SidebarTodayJobs jobs={jobs} isLoading={isLoading} />

    </Grid>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(MapViewTodayJobsScreen);
