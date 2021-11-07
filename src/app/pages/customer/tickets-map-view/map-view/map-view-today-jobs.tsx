import React, { useEffect, useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';

import '../ticket-map-view.scss';
import { getSearchJobs } from 'api/job.api';
import styles from '../ticket-map-view.style';
import { Job } from '../../../../../actions/job/job.types';
import SidebarTodayJobs from '../sidebar/sidebar-today-jobs';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';

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

  if (isLoading) {
    return <BCCircularLoader heightValue={"200px"} />;
  }

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

      <SidebarTodayJobs totalJobs={totalJobs}/>

    </Grid>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(MapViewTodayJobsScreen);
