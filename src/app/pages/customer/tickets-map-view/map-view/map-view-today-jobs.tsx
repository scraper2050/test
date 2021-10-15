import React, { useEffect, useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';
import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import { getSearchJobs } from 'api/job.api';
import SidebarTodayJobs from '../sidebar/today-jobs';
import { Job } from '../../../../../actions/job/job.types';

function MapViewTodayJobsScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>({});

  useEffect(() => {
    const rawData = {
      'customerNames': '',
      'jobId': '',
      'schedule_date': '',
      'todaysJobs': 'true'
    };
    const requestObj = { ...rawData,
      'page': 1,
      'pageSize': 0 };
    getScheduledJobs(requestObj);
  }, []);

  const getScheduledJobs = async (
    requestObj: {
      page?: number,
      pageSize?: number,
      customerNames?: any,
      jobId?: string,
      schedule_date?: string
    }
  ) => {
    setIsLoading(true);
    const response: any = await getSearchJobs(requestObj);
    const { data } = response;
    if (data.status) {
      setJobs(data.jobs);
      setTotalJobs(data.total);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Grid
      container
      item
      lg={12} >
      <Grid
        className={'ticketsMapContainer'}
        container
        item
        lg={12}>
        {
          <MemoizedMap
            hasPhoto={hasPhoto}
            list={jobs}
            onJob
            selected={selectedJob}
            showPins
          />
        }
      </Grid>

      <SidebarTodayJobs totalJobs={totalJobs} onSelectJob={setSelectedJob} />

    </Grid>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(MapViewTodayJobsScreen);
