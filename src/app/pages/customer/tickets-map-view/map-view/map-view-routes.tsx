import React, { useState } from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MemoizedMap from 'app/components/bc-map-with-routes/bc-map-with-routes';
import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import SidebarRoutes from "../sidebar/sidebar-route";
import {JobRoute} from "../../../../../actions/job-routes/job-route.types";

function MapViewRoutesScreen() {
  const [routes, setRoutes] = useState<JobRoute[]>([]);

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
            routes={routes}
          />
        }
      </Grid>

      <SidebarRoutes dispatchRoutes={setRoutes}/>

    </Grid>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(MapViewRoutesScreen);
