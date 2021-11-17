import React, { useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MemoizedMap from 'app/components/bc-map-with-marker-list/bc-map-with-marker-list';
import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import SidebarJobs from "../sidebar/sidebar-jobs";

function MapViewJobsScreen({ classes, today }: any) {

  const [jobs, setJobs] = useState<any[]>([]);


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
