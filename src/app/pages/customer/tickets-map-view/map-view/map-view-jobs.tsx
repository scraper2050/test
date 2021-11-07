import React, { useEffect, useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';
import { useDispatch, useSelector } from 'react-redux';
import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import { getSearchJobs } from 'api/job.api';
import SidebarJobs from "../sidebar/sidebar-jobs";

function MapViewJobsScreen({ classes, today }: any) {

  const [jobs, setJobs] = useState<any[]>([]);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>({});

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

      <SidebarJobs onFilterJobs={setJobs} />
    </Grid>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(MapViewJobsScreen);
