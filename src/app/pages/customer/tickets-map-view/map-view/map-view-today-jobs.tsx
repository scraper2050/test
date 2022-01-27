import React, { useEffect, useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';

import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import { Job } from '../../../../../actions/job/job.types';
import SidebarTodayJobs from '../sidebar/sidebar-today-jobs';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';
import {FilterJobs} from "../tickets-map-view";
import { useSelector} from "react-redux";
import {parseISOMoment} from "../../../../../helpers/format";

interface Props {
  classes: any;
  filter: FilterJobs;
}

function MapViewTodayJobsScreen({ classes, filter: filterJobs }: Props) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { isLoading = true, jobs: allJobs } = useSelector(
    ({ jobState }: any) => ({
      isLoading: jobState.isLoading,
      jobs: jobState.data,
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
          filter = filter && (job.customerContactId === filterJobs.contact._id);
        }
      }

      return filter;
    });
  };

  useEffect(() => {
    setJobs(filterScheduledJobs(allJobs.filter((job: Job) =>  parseISOMoment(job.scheduleDate).isSame(new Date(), 'day'))))
  }, [allJobs])

  useEffect(() => {
    setJobs(filterScheduledJobs(allJobs.filter((job: Job) =>  parseISOMoment(job.scheduleDate).isSame(new Date(), 'day'))));
  }, [filterJobs]);


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
