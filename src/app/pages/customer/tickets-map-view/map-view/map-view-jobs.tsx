import React, {useEffect, useState} from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';
import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import SidebarJobs from "../sidebar/sidebar-jobs";
import {FilterJobs} from "../tickets-map-view";
import {useDispatch, useSelector} from "react-redux";
import {parseISOMoment} from "../../../../../helpers/format";

interface Props {
  classes: any;
  selectedDate: Date | null;
  filter: FilterJobs;
}

function MapViewJobsScreen({ classes, selectedDate, filter: filterJobs }: Props) {
  const [jobs, setJobs] = useState<any[]>([]);
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

      if(selectedDate) {
        filter = filter && parseISOMoment(job.scheduleDate).isSame(selectedDate, 'day');
      }
      return filter;
    });
  };

  useEffect(() => setJobs(filterScheduledJobs(allJobs)), [allJobs])

  useEffect(() => {
    setJobs(filterScheduledJobs(allJobs));
  }, [selectedDate])

  useEffect(() => {
    setJobs(filterScheduledJobs(allJobs));
  }, [filterJobs])

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
            list={jobs}
          />
        }
      </Grid>

      <SidebarJobs jobs={jobs} isLoading={isLoading}/>
    </Grid>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(MapViewJobsScreen);
