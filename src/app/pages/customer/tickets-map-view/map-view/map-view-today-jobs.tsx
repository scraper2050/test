import React, { useEffect, useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';

import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import { Job } from '../../../../../actions/job/job.types';
import SidebarTodayJobs from '../sidebar/sidebar-today-jobs';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';
import {getSearchJobs} from "../../../../../api/job.api";
import {FilterJobs} from "../tickets-map-view";
import {useDispatch, useSelector} from "react-redux";
import {refreshJobs} from "../../../../../actions/job/job.action";

interface Props {
  classes: any;
  filter: FilterJobs;
}

function MapViewTodayJobsScreen({ classes, filter: filterJobs }: Props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [allJobs, setAllJobs] = useState<any[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const { refresh = false } = useSelector(
    ({ jobState }: any) => ({
      refresh: jobState.refresh,
    }));

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

      return filter;
    });
  };

  const getScheduledJobs = async (
    requestObj: {
      page?: number,
      pageSize?: number,
      customerNames?: any,
      jobId?: string,
      todaysJobs?: string
    }
  ) => {
    setIsLoading(true);
    const response: any = await getSearchJobs(requestObj);
    const { data } = response;
    if (data.status) {
      setAllJobs(data.jobs);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setJobs(filterScheduledJobs(allJobs));
  }, [filterJobs, allJobs]);

  useEffect(() => {
    const rawData = {
      customerNames: '',
      jobId:  '',
    }

    const requestObj = {
      ...rawData,
      page: 1,
      pageSize: 0,
      todaysJobs: 'true',
    };

    if (refresh) {
      getScheduledJobs(requestObj);
      dispatch(refreshJobs(false));
    }
  }, [refresh]);

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
