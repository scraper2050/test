import Config from 'config';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, withStyles } from '@material-ui/core';
import MemoizedMap from 'app/components/bc-map-with-routes/bc-map-with-routes';
import '../ticket-map-view.scss';
import styles from '../ticket-map-view.style';
import SidebarRoutes from '../sidebar/sidebar-route';
import { JobRoute } from 'actions/job-routes/job-route.types';
import moment from 'moment';
import { getAllRoutes } from 'api/job-routes.api';
import { CompanyProfileStateType } from 'actions/user/user.types';
import {
  openModalAction,
  setModalDataAction,
} from 'actions/bc-modal/bc-modal.action';

function MapViewRoutesScreen({ selectedDate, filter: routeFilter }: any) {
  const dispatch = useDispatch();

  const [allRoutes, setAllRoutes] = useState<JobRoute[]>([]);
  const [routes, setRoutes] = useState<JobRoute[]>([]);
  const [mapRoutes, setMapRoutes] = useState<JobRoute[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { coordinates }: CompanyProfileStateType = useSelector(
    (state: any) => state.profile
  );

  const filterRoutes = (routes: any) => {
    return routes.filter((route: any) => {
      let filter = true;

      if (routeFilter.technician) {
        filter = filter && route.technician._id === routeFilter.technician._id;
      }
      if (!filter) return filter;

      if (routeFilter.jobType.length > 0) {
        filter =
          filter &&
          route.routes.some((r: any) => {
            return r.job.tasks.some((task: any) => {
              return task.jobTypes.some((type: any) =>
                routeFilter.jobType.some((f: any) => f._id === type.jobType._id)
              );
            });
          });
      }

      if (routeFilter.jobAddress) {
        filter =
          filter &&
          route.routes.some((r: any) => {
            const locationName = [
              r.job?.jobSite?.name || "", 
              r.job?.jobLocation?.name || "", 
              r.job?.jobSite?.address?.city || "", 
              r.job?.jobSite?.address?.state || "", 
              r.job?.jobSite?.address?.street || "", 
              r.job?.jobSite?.address?.zipCode || "",
              r.job?.jobLocation?.address?.city || "",
              r.job?.jobLocation?.address?.state || "",
              r.job?.jobLocation?.address?.street || "",
              r.job?.jobLocation?.address?.zipCode || "",
            ];

            const filteredArray = locationName.filter(item => item?.toLowerCase()?.includes(routeFilter.jobAddress?.toLowerCase()));
            if(filteredArray.length) {
              r.job["jobAddressFlag"] = true;
              route["jobAddressFlag"] = true;
              return true;
            } else {
              delete r.job.jobAddressFlag;
              return false;
            }
          });
      } else if (route.jobAddressFlag) {
        route.routes.forEach((item: any) => {
          delete item.job.jobAddressFlag;
        });
        delete route.jobAddressFlag;
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
      const filteredRoute = filterRoutes(data.jobRoutes);
      setRoutes(filteredRoute);
      setMapRoutes(filteredRoute);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const openModalHandler = (modalDataAction: any) => {
    dispatch(setModalDataAction(modalDataAction));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  useEffect(() => {
    getRoute();
  }, [selectedDate]);

  useEffect(() => {
    const filteredRoute = filterRoutes(allRoutes);
    setRoutes(filteredRoute);
    setMapRoutes(filteredRoute);
  }, [routeFilter]);

  return (
    <Grid container item lg={12}>
      <Grid container item lg={12} className={'ticketsMapContainer'}>
        {
          <MemoizedMap
            reactAppGoogleKeyFromConfig={Config.REACT_APP_GOOGLE_KEY}
            routes={mapRoutes}
            openModalHandler={openModalHandler}
            coordinates={coordinates}
          />
        }
      </Grid>

      <SidebarRoutes
        dispatchRoutes={setMapRoutes}
        routes={routes}
        isLoading={isLoading}
      />
    </Grid>
  );
}

export default withStyles(styles, { withTheme: true })(MapViewRoutesScreen);
