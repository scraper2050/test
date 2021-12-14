import Config from '../../../config';
import GoogleMapReact from 'google-map-react';
import styles from './bc-map-with-marker-list.style';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { bcMapStyle } from './bc-map-style';

import './bc-map-with-marker.scss';
import BCMapMarker from "../bc-map-marker/bc-map-marker";
import {useSelector} from "react-redux";
import {RootState} from "../../../reducers";
import {CompanyProfileStateType} from "../../../actions/user/user.types";
import {DEFAULT_COORD} from "../../../utils/constants";

interface BCMapWithMarkerListProps {
  list: any,
  classes: any,
  lat?: any,
  lng?: any,
  showPins?: boolean,
  isTicket?: boolean,
}
function createMapOptions() {
  return {
    styles: bcMapStyle,
    'gestureHandling': 'greedy'
  };
}

function BCMapWithMarkerWithList({ classes, list, isTicket = false, showPins }: BCMapWithMarkerListProps) {
  const selected = useSelector((state: RootState) => state.map.ticketSelected);
  const {coordinates}: CompanyProfileStateType = useSelector((state: any) => state.profile);

  let centerLat = coordinates?.lat || DEFAULT_COORD.lat;
  let centerLng = coordinates?.lng || DEFAULT_COORD.lng;

  if (selected._id !== '') {
    if (selected.jobSite) {
      centerLat = selected.jobSite.location && selected.jobSite.location.coordinates && selected.jobSite.location.coordinates[1] ? selected.jobSite.location.coordinates[1] : centerLat;
      centerLng = selected.jobSite.location && selected.jobSite.location.coordinates && selected.jobSite.location.coordinates[0] ? selected.jobSite.location.coordinates[0] : centerLng;
      centerLat -= 0.004;
      centerLng += 0.002;
    } else if (selected.jobLocation) {
      centerLat = selected.jobLocation.location && selected.jobLocation.location.coordinates && selected.jobLocation.location.coordinates[1] ? selected.jobLocation.location.coordinates[1] : centerLat;
      centerLng = selected.jobLocation.location && selected.jobLocation.location.coordinates && selected.jobLocation.location.coordinates[0] ? selected.jobLocation.location.coordinates[0] : centerLng;
      centerLat -= 0.004;
      centerLng += 0.002;
    } else if (selected.customer) {
      centerLat = selected.customer.location && selected.customer.location.coordinates && selected.customer.location.coordinates[1] ? selected.customer.location.coordinates[1] : centerLat;
      centerLng = selected.customer.location && selected.customer.location.coordinates && selected.customer.location?.coordinates[0] ? selected.customer.location.coordinates[0] : centerLng;
      centerLat -= 0.004;
      centerLng += 0.002;
    }
  }

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ 'key': Config.REACT_APP_GOOGLE_KEY }}
      center={{ 'lat': centerLat,
        'lng': centerLng }}
      defaultZoom={11}
      //onClick={event => console.log(event)}
      options={createMapOptions}>
      {
        list.map((ticket: any, index: number) => {
          let lat = centerLat;
          let lng = centerLng;
          if (ticket.jobSite) {
            lat = ticket.jobSite.location && ticket.jobSite.location.coordinates && ticket.jobSite.location.coordinates[1] ? ticket.jobSite.location.coordinates[1] : centerLat;
            lng = ticket.jobSite.location && ticket.jobSite.location.coordinates && ticket.jobSite.location.coordinates[0] ? ticket.jobSite.location.coordinates[0] : centerLng;
          } else if (ticket.jobLocation) {
            lat = ticket.jobLocation.location && ticket.jobLocation.location.coordinates && ticket.jobLocation.location.coordinates[1] ? ticket.jobLocation.location.coordinates[1] : centerLat;
            lng = ticket.jobLocation.location && ticket.jobLocation.location.coordinates && ticket.jobLocation.location.coordinates[0] ? ticket.jobLocation.location.coordinates[0] : centerLng;
          } else if (ticket.customer) {
            lat = ticket.customer.location && ticket.customer.location.coordinates && ticket.customer.location.coordinates[1] ? ticket.customer.location.coordinates[1] : centerLat;
            lng = ticket.customer.location && ticket.customer.location.coordinates && ticket.customer.location.coordinates[0] ? ticket.customer.location.coordinates[0] : centerLng;
          }

          return <BCMapMarker
            classes={classes}
            key={index}
            lat={lat}
            lng={lng}
            ticket={ticket}
            isTicket={isTicket}
          />;
        })
      }

    </GoogleMapReact>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCMapWithMarkerWithList);
