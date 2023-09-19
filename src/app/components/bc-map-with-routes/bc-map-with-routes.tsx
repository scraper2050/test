import GoogleMapReact from 'google-map-react';
import styles from './bc-map-with-routes.style';
import { withStyles } from '@material-ui/core/styles';
import React, { useRef, useState } from 'react';
import { bcMapStyle } from './bc-map-style';

import './bc-map-with-routes.scss';
import { JobRoute } from '../../../actions/job-routes/job-route.types';
import BCMapMarker from '../bc-map-marker/bc-map-marker';
import { DEFAULT_COORD } from '../../../utils/constants';

interface BCMapWithMarkerListProps {
  reactAppGoogleKeyFromConfig: string;
  classes: any;
  routes: JobRoute[];
  showPins?: boolean;
  coordinates: any;
  openModalHandler?: (modalDataAction: any) => void;
}

interface MarkerPosition {
  lat: number;
  lng: number;
}

function createMapOptions() {
  return {
    styles: bcMapStyle,
    gestureHandling: 'greedy',
  };
}

const getColor = (str: string) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    // Reduce the value to make the color darker
    value = Math.max(0, value - 50); // Adjust the 50 to make it darker or lighter

    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
};

function BCMapWithRoutes({
  reactAppGoogleKeyFromConfig,
  classes,
  routes = [],
  showPins = false,
  coordinates,
  openModalHandler = () => {},
}: BCMapWithMarkerListProps) {
  const [map, setMap] = useState<any>(null);
  const [maps, setMaps] = useState<any>(null);
  const lines = useRef<any[]>([]);

  const routeData = routes.map((jobRoute: JobRoute, index) => {
    const coordinates: MarkerPosition[] = [];
    jobRoute.routes.forEach(({ job }) => {
      const jobLat =
        job.jobSite?.location?.coordinates?.[1] ||
        job.jobLocation?.location?.coordinates?.[1] ||
        job.customer?.location?.coordinates?.[1] ||
        DEFAULT_COORD.lat;
      const jobLong =
        job.jobSite?.location?.coordinates?.[0] ||
        job.jobLocation?.location?.coordinates?.[0] ||
        job.customer?.location?.coordinates?.[0] ||
        DEFAULT_COORD.lng;

      coordinates.push({ lat: jobLat, lng: jobLong });
    });
    return {
      ...jobRoute,
      coordinates,
      color: getColor(jobRoute.technician.profile.displayName),
    };
  });

  //const calculateMapRegion = () => {
  let latMax = -Infinity,
    latMin = Infinity,
    longMax = -Infinity,
    longMin = Infinity;

  routeData.forEach((route) =>
    route.coordinates.forEach(({ lat: jobLat, lng: jobLong }) => {
      latMax = Math.max(latMax, jobLat);
      latMin = Math.min(latMin, jobLat);
      longMax = Math.max(longMax, jobLong);
      longMin = Math.min(longMin, jobLong);
    })
  );
  const centerLat =
    routeData.length > 0
      ? (latMax + latMin) / 2
      : coordinates?.lat || DEFAULT_COORD.lat;
  const centerLng =
    routeData.length > 0
      ? (longMax + longMin) / 2
      : coordinates?.lng || DEFAULT_COORD.lng;

  // longitudeDelta: longMax === longMin ? 0.005 : (longMax - longMin) * 1.3,
  // latitudeDelta: latMax === latMin ? 0.004 : (latMax - latMin) * 1.3,

  if (map && maps) {
    lines.current.forEach((line) => line.setMap(null));
    lines.current = [];
    const newLines: any[] = [];
    routeData.forEach((jobRoute, index) => {
      const options = {
        strokeColor: jobRoute.color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        paths: jobRoute.coordinates,
        zIndex: 1,
      };
      const route = new maps.Polyline({
        path: jobRoute.coordinates,
        options,
        icons: [
          {
            icon: {
              path: maps.SymbolPath.FORWARD_CLOSED_ARROW,
            },
            offset: '98%',
          },
        ],
        key: `P-${index}`,
      });
      route.setMap(map);
      lines.current.push(route);
    });
  }

  const handleApiLoaded = (map: any, maps: any) => {
    setMap(map);
    setMaps(maps);
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: reactAppGoogleKeyFromConfig }}
      center={{ lat: centerLat, lng: centerLng }}
      defaultZoom={11}
      onClick={(event) => console.log(event)}
      options={createMapOptions}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
    >
      {routeData.map((jobRoute) => {
        return jobRoute.coordinates.map(
          (item: MarkerPosition, index: number) => (
            <BCMapMarker
              classes={classes}
              key={index}
              lat={item.lat}
              lng={item.lng}
              ticket={jobRoute.routes[index].job}
              openModalHandler={openModalHandler}
            />
          )
        );
      })}
    </GoogleMapReact>
  );
}

export default withStyles(styles, { withTheme: true })(BCMapWithRoutes);
