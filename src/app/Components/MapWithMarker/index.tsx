import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import Config from "../../../config";

interface MapWithMarkerProps {
  lat: number;
  lang: number;
}

const MapWithMarker = ({ lat, lang }: MapWithMarkerProps) => {
  const [myMap, setMyMap] = useState(null);
  const [center, setCenter] = useState({ lat: lat, lng: lang });

  return (
    <>
      <LoadScript googleMapsApiKey={Config.REACT_APP_GOOGLE_KEY}>
        <GoogleMap
          mapContainerStyle={{
            height: "100%",
            width: "100%",
          }}
          zoom={10}
          center={center}
          onLoad={(map) => setMyMap(map)}
        >
          <Marker position={{ lat: lat, lng: lang }} />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapWithMarker;
