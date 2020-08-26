import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const defaultMapOptions = {
  fullscreenControl: false,
};

interface MapWithMarkerProps {
  lat: number;
  lang: number;
}

const MapWithMarker = ({ lat, lang }: MapWithMarkerProps): JSX.Element => {
  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyAhohptKzKOOndCrj_6R-gIzYUfMQ3Gs-c">
        <GoogleMap
          mapContainerStyle={{
            height: "100%",
            width: "100%",
          }}
          mapContainerClassName="map-with-marker"
          zoom={8}
          center={{ lat: lat, lng: lang }}
          options={defaultMapOptions}
        >
          <Marker position={{ lat: lat, lng: lang }} />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapWithMarker;
