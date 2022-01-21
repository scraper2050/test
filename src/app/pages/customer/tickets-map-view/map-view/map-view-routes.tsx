import React, {useEffect, useState} from 'react';
import { Grid, withStyles } from '@material-ui/core';
import MemoizedMap from 'app/components/bc-map-with-routes/bc-map-with-routes';
import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import SidebarRoutes from "../sidebar/sidebar-route";
import {JobRoute} from "../../../../../actions/job-routes/job-route.types";
import moment from "moment";
import {getAllRoutes} from "../../../../../api/job-routes.api";

function MapViewRoutesScreen({selectedDate, filter: routeFilter}: any) {
  const [allRoutes, setAllRoutes] = useState<JobRoute[]>([]);
  const [routes, setRoutes] = useState<JobRoute[]>([]);
  const [mapRoutes, setMapRoutes] = useState<JobRoute[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filterRoutes = (routes: any) => {
    return routes.filter((route: any) => {
      let filter = true;

      if (routeFilter.technician) {
        filter = filter && (route.technician._id === routeFilter.technician._id);
      }
      if (!filter) return filter

      if (routeFilter.jobType.length > 0) {
        filter = filter && route.routes.some((r: any) => {
          return r.job.tasks.some((task: any) => {
            return task.jobTypes.some((type: any) => routeFilter.jobType.some((f: any) => f._id === type.jobType._id))
          })
        });
      }
      return filter;
    });
  };

  const getRoute = async () => {
    setIsLoading(true);
    const dateString = moment(selectedDate).format('YYYY-MM-DD');
    const response: any = await getAllRoutes(dateString);

    const { data } = response;
    if (data.status) {
      setAllRoutes(data.jobRoutes);
      const filteredRoute = filterRoutes(data.jobRoutes)
      setRoutes(filteredRoute);
      setMapRoutes(filteredRoute);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getRoute();
  }, [selectedDate])

  useEffect(() => {
    const filteredRoute = filterRoutes(allRoutes)
    setRoutes(filteredRoute);
    setMapRoutes(filteredRoute);
  }, [routeFilter])

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
            routes={mapRoutes}
          />
        }
      </Grid>

      <SidebarRoutes dispatchRoutes={setMapRoutes} routes={routes} isLoading={isLoading}/>

    </Grid>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(MapViewRoutesScreen);
