import Config from '../../../config';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useState } from 'react';

interface BCMapWithMarkerProps {
  lat: number;
  lang: number;
}

function BCBCMapWithMarker({ lat, lang }: BCMapWithMarkerProps) {
  const [myMap, setMyMap] = useState(null); // eslint-disable-line
  const [center, setCenter] = useState({ 'lat': lat, // eslint-disable-line
    'lng': lang });
  return (
    <LoadScript googleMapsApiKey={Config.REACT_APP_GOOGLE_KEY}>
      <GoogleMap
        center={center}
        mapContainerStyle={{
          'height': '100%',
          'width': '100%'
        }}
        onLoad={map => setMyMap(map)}
        zoom={10}>
        <Marker position={{ 'lat': lat,
          'lng': lang }}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default BCBCMapWithMarker;
