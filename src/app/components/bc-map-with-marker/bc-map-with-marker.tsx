import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import styles from './bc-map-with-marker.style';
import { withStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
interface BCMapWithMarkerProps {
  lat: any;
  lang: any;
  classes: any;
  reactAppGoogleKeyFromConfig: string;
}

function MakerPin({ classes }: any) {
  return <RoomIcon className={classes.marker} />;
}

function createMapOptions() {
  return {
    gestureHandling: 'greedy'
  };
}

function BCMapWithMarker({ classes, lat, lang, reactAppGoogleKeyFromConfig }: BCMapWithMarkerProps) {
  const [center, setCenter] = useState({ 'lat': lat,
    'lng': lang });

  useEffect(() => {
    setCenter({ 'lat': lat,
      'lng': lang });
  }, [lat, lang]);

 

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ 'key': reactAppGoogleKeyFromConfig }}
      center={center}
      options={createMapOptions}
      defaultZoom={10}>
      <MakerPin
        classes={classes}
        lat={lat}
        lng={lang}
      />
    </GoogleMapReact>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCMapWithMarker);
