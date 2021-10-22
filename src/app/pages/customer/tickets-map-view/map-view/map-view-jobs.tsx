import React, { useEffect, useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';
import { useDispatch, useSelector } from 'react-redux';
import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import { getSearchJobs } from 'api/job.api';
import SidebarJobs from "../sidebar/sidebar-jobs";

function MapViewJobsScreen({ classes, today }: any) {

  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>({});

  const filterScheduledJobs = (jobs: any) => {
    return jobs.filter((job: any) => job && job.status !== 2);
  };

  useEffect(() => {
    const rawData = {
      'customerNames': '',
      'jobId': ''
      // Today: false,
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
      // Today?: boolean,
    }
  ) => {
    setIsLoading(true);
    const response: any = await getSearchJobs(requestObj);

    const { data } = response;


    if (data.status) {
      setJobs(filterScheduledJobs(data.jobs));
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
        container
        item
        lg={12}
        className={'ticketsMapContainer'}
      >
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

      <SidebarJobs isLoading={isLoading} scheduledJobs={jobs} onSelectJob={setSelectedJob} />
    </Grid>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(MapViewJobsScreen);
